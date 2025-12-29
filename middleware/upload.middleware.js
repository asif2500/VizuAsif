import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/models",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadGLTF = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.originalname.endsWith(".gltf") ||
      file.originalname.endsWith(".glb")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only GLTF/GLB allowed"));
    }
  },
});
