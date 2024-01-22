import multer from "multer";
import path from "path";
export const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, "images" + "-" + Date.now() + ext);
  },
});

export const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|svg|jpeg|png|gif)$/)) {
    return cb("Only image files accepted!!"), false;
  }
  cb(null, true);
};

export const uploadImage = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 20000000 },
});