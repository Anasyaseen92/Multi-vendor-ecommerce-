const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

const Shop = require("../model/shop");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      // Delete uploaded file if user already exists
      const filename = req.file?.filename;
      const filePath = `uploads/${filename}`;
      if (filename && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file?.filename || "";
    const fileUrl = filename ? path.join("uploads", filename) : "";

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

     try {
          await sendMail({
            email: user.email,
            subject: "Activate Your Shop",
            message: `Hello ${user.name},\n\nPlease click the link below to activate your shop:\n${activationUrl}`,
          });
    
          return res.status(201).json({
            success: true,
            message: `Please check your email (${user.email}) to activate your shop!`,
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
          return next(new ErrorHandler("Email sending failed", 500));
        }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
