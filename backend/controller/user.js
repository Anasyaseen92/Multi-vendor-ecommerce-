const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const upload = require("../multer"); 
const ErrorHandler = require("../utils/ErrorHandler");
const fs  = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")



router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
  const filename = req.file?.filename;
  const filePath = `uploads/${filename}`;
  if (filename && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return next(new ErrorHandler("User already exists", 400));
}

    const filename = req.file.filename;
    const fileUrl = path.join("uploads", filename);

    const user = await User.create({
      name,
      email,
      password,
      avatar: fileUrl,
    });
const activationToken = createActivationToken(user);

const activationUrl = `http://localhost:5173/activation/${activationToken}`;

try {
  await sendMail({
    email: user.email,
    subject:"Activate Your Account",
    message: `Hello ${user.name}, please click on the Link to activate your account ${activationUrl}`
  })

  res.status(201).json({
    success: true,
    message: `please check your email:- ${user.email} to activate your account!`
  })
} catch (error) {
   console.log("Email sending failed:", error);
  return next(new ErrorHandler("Email sending failed", 500));
}
  }
   catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//create activation token 
const createActivationToken = (user) =>{
  return jwt.sign(user.toObject(),process.env.ACTIVATION_SECRET) ,{
    expiresIn: "5m",
  }
}

router.post("/activation", catchAsyncErrors(async(req, res, next) =>{
  try {
    const {activation_token} = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if(!newUser){
      return next(new ErrorHandler("Invalid token" , 400));

      const {name, email, password, avatar} = newUser;

      User.create({
        name,
        email,
        avatar,
        password, 
      });

      sendToken(newUser,201,res);
    }
  } catch (error) {
    
  }
}))


module.exports=router;