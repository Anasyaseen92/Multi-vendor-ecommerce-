const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const router = express.Router();
const upload = require("../multer");

// ✅ Create new message
router.post(
  "/create-new-message",
  upload.single("image"), // 👈 MUST match frontend FormData key
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = {
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text,
      };

      // ✅ If an image is uploaded
      if (req.file) {
        messageData.images = {
          public_id: req.file.filename,
          url: `/uploads/${req.file.filename}`,
        };
      }

      const message = await Messages.create(messageData);

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ✅ Get all messages by conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
