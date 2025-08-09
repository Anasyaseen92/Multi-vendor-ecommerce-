const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const Shop = require("../model/shop");
const upload = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const router = express.Router();

// ===== Create Shop - Send Activation Email =====
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if email exists
    const existingSeller = await Shop.findOne({ email });
    if (existingSeller) {
      if (req.file?.filename) {
        const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      return next(new ErrorHandler("User already exists", 400));
    }

    // Prepare file URL
    const filename = req.file?.filename || "";
    const fileUrl = filename ? path.join("uploads", filename) : "";

    const sellerData = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    // Create activation token
    const activationToken = createActivationToken(sellerData);

    // Activation URL (token passed as path param)
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    // Send activation email
    await sendMail({
      email: sellerData.email,
      subject: "Activate Your Shop",
      message: `Hello ${sellerData.name},\n\nPlease click the link below to activate your shop:\n${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email (${sellerData.email}) to activate your shop!`,
    });
  } catch (error) {
    console.error("Create shop error:", error);
    return next(new ErrorHandler(error.message || "Internal Server Error", 500));
  }
});

// Create Activation Token
const createActivationToken = (seller) => {
  if (!process.env.ACTIVATION_SECRET) {
    throw new Error("ACTIVATION_SECRET is missing in .env");
  }
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "15m" });
};

// ===== Activate Shop - Save to DB =====
// Notice the route is `/activation` only (no /shop prefix)
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    const { activation_token } = req.body;

    let sellerData;
    try {
      sellerData = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (err) {
      console.error("JWT Verification Failed:", err);
      return next(new ErrorHandler("Activation token expired or invalid", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } = sellerData;

    // Check if user exists
    const existingUser = await Shop.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Save seller in DB
    const seller = await Shop.create({
      name,
      email,
      password,
      avatar,
      zipCode,
      address,
      phoneNumber,
    });

    // Send token & login
    sendToken(seller, 201, res);
  })
);

module.exports = router;
