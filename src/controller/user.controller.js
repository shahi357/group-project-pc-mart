import { User } from "../model/user.model.js";

export const getMe = (req, res) => {
  try {
    const user = req.user;
    user.tokens = undefined;
    user.userPassword = undefined;

    res.status(200).json({
      message: "Success",
      data: req.user,
    });
  } catch (error) {
    console.log(error, "GET_ME_CONTROLLER_ERROR");
    res.status(400).json({
      message: "Error while fetching user",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    user.tokens = undefined;
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.log(error, "GET_USER_BY_ID");
    res.status(400).json({ message: "Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating user" });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error, "ERROR_LOGOUT");
    res.status(400).json({ message: "Error logging out" });
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error, "ERROR_LOGOUT_ALL");
    res.status(400).json({ message: "Error logging out" });
  }
};
