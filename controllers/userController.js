import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const loginUser = async (req, res, next) => {
  try {
    const user = await User.authenticate({
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secretKey",
      { expiresIn: "5h" }
    );
    return res.json({ status: "OK", result: { access_token: token } });
  } catch (error) {
    res.json({ msg: "credential mismatch", status: 401 });
  }
};

// get all user
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "OK", result: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const encrypt = (password) => {
  return bcrypt.hashSync(password, 10);
};

// save a user
export const saveUser = async (req, res) => {
  const user = new User({ ...req.body, password: encrypt(req.body.password) });
  try {
    const users = await user.save();
    res.status(200).json({ status: "OK", result: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get a user
export const getUserById = async (req, res) => {
  const cekId = await User.findById(req.params.id);

  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const users = await User.findOne({ _id: req.params.id });
    res.status(200).json({ status: "OK", result: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  const cekId = await User.findById(req.params.id);

  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const users = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    ).then((data) => data);

    res.status(200).json({ status: "OK", result: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const cekId = await User.findById(req.params.id);
  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const users = await user.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ status: "OK", result: { message: `${req.params.id} deleted` } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
