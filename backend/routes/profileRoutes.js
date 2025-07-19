import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import {
  getProfile,
  setupProfile,
  updateProfile,
  updateProfilePicture,
} from "../controllers/profileController.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("Wrong file type");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
    }
    cb(null, true);
  },
});

router.get("/me", verifyToken, getProfile);
router.post("/setup", verifyToken, upload.array("photos", 6), setupProfile);
router.put("/update", verifyToken, upload.array("photos", 6), updateProfile);
router.put(
  "/picture",
  verifyToken,
  upload.single("profilePicture"),
  updateProfilePicture
);

export default router;
