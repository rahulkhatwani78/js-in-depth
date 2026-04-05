import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);

router
  .get("/:id", getUserById)
  .put("/:id", updateUserById)
  .delete("/:id", deleteUserById);

export default router;
