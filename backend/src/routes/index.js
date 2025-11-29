import express from "express";
import authRoutes from "./auth/auth.routes.js";
import stravaRoutes from "./strava/strava.routes.js";
import userRoutes from "./users/users.routes.js";
import rankingRoutes from "./ranking/ranking.routes.js";
import * as farcasterController from "../controllers/farcaster.controller.js";
import webhookRoutes from "./webhook.routes.js";
import { handleFrame } from "../controllers/frame.controller.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/strava", stravaRoutes);
router.use("/user", userRoutes);
router.use("/ranking", rankingRoutes);
router.use("/webhook", webhookRoutes);

router.post("/fc/frame", handleFrame);
router.get("/fc/profile", farcasterController.getProfile);

export default router;
