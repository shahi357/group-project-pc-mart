import { User } from "../model/user.model.js";
import multer from "multer";
import jwt from "jsonwebtoken";
import { appConstants } from "../config/constant.js";
import path from "path";

export const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    callback(null, "userProfile" + "-" + Date.now() + ext);
  },
});

export const profileImageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|svg|jpeg|png|gif)$/)) {
    return cb("Only image files accepted!!"), false;
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: profileImageFileFilter,
  limits: { fileSize: 20000000 },
});

export const userRegistration = async (req, res) => {
  try {
    const userImage = req.file?.filename;
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const city = req.body.city;
    const postal = req.body.postal;
    const userAddress1 = req.body.userAddress1;
    const userAddress2 = req.body.userAddress2;
    const userPhone = req.body.userPhone;

    const userExist = await User.findOne({ userEmail: userEmail });
    if (userExist) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    const user = new User({
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
      userImage: userImage,
      city: city,
      postal: postal,
      userAddress1: userAddress1,
      userAddress2: userAddress2,
      userPhone: userPhone,
    });
    const response = await user.save();
    res.status(201).json({
      message: "User saved successfully",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: "Error in Registration",
    });
  }
};

export const login = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  try {
    const user = await User.checkCredentialsDb(username, password);
    if (!user) {
      throw new Error(`Invalid credentials`);
    }
    const token = jwt.sign(
      { _id: user._id.toString() },
      appConstants.jwtSecret
    );

    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    user.tokens = undefined;
    res.status(200).json({
      message: "Login successful",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};
