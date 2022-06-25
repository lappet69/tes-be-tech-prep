import express from "express";
import {
  getUsers,
  saveUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/auth", loginUser);
router.post("/", saveUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// ======================== //

router.use("/user", router);

export default router;
