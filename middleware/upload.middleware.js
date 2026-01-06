import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/models",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
