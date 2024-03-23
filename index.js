import express from "express";
import multer from "multer";
import cors from "cors";
import { ENV } from "./env.js";
import { sendEmailWithAttachment } from "./emailUtility.js";

const app = express();

// CORS configuration
app.use(cors({ origin: ENV.CORS_ORIGINS }));

// Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Route for sending invoice email
app.post("/send-invoice", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    await sendEmailWithAttachment(
      req.file.buffer,
      req.body.email,
      req.body.subject,
      req.file.originalname,
      req.body.htmlText
    );
    res.status(200).json("Email sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
    res.json(error);
  }
});

// Start the server
app.listen(ENV.SERVER_PORT, () => {
  console.log(`Listening on port ${ENV.SERVER_PORT}`);
});
