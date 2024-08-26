import express from "express";
import { registerUser, loginUser, editUser, getUser, deleteUser } from "../controllers/userController";

const router = express.Router();

router.post("/", registerUser);
router.patch("/", loginUser);
router.post("/login", editUser);
router.get("/profile", getUser);
router.delete("/", deleteUser);

export default router;