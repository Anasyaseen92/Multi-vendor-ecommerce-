const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const router = express.Router();
const upload = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// ========== Create User Route ==========
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
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

    const user = {
      name,
      email,
      password,
      avatar: fileUrl,
    };

    // Create activation token
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    // Send activation email
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name},\n\nPlease click the link below to activate your account:\n${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return next(new ErrorHandler("Email sending failed", 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

// ========== Create Activation Token ==========
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m", // 5 minutes for testing
  });
};

// ========== Activate User Route ==========
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    console.log("Received token:", req.body.activation_token);
    const { activation_token } = req.body;

    let newUser;
    try {
      newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (err) {
      console.error("JWT Verification Failed:", err);
      return next(new ErrorHandler("Activation token expired or invalid", 400));
    }

    const { name, email, password, avatar } = newUser;
    console.log("Decoded User:", newUser); // <-- Confirm data here

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists in DB");
      return next(new ErrorHandler("User already exists", 400));
    }

    try {
      const user = await User.create({ name, email, avatar, password });
      console.log("User created:", user);
      sendToken(user, 201, res);
      
    } catch (createErr) {
      console.error("User creation error:", createErr);
      return next(new ErrorHandler("Failed to create user", 500));
    }
  })
);

//login API

router.post("/login-user", catchAsyncErrors(async(req, res, next)=>{
  try {
    const {email,password} = req.body;
if(!email || !password){
  return next(new ErrorHandler("Please provide the all fields!", 400));
}

const user = await User.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("User does not exist", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct information", 400));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))

//load user
router.get("/getuser" , isAuthenticated, catchAsyncErrors(async(req, res,next)=>{
  try {
    const user = await User.findById(req.user.id);

    if(!user){
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success:true,
      user,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
}))

module.exports = router;
