import express from "express";
import { register, login, profile } from "../../controllers/auth/auth.controller.js";
import { authMiddleware } from "../../utils/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);

export default router;
