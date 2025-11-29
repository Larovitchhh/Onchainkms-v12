import express from "express";
import {
  authRedirect,
  callback,
  refreshToken,
  activities
} from "../../controllers/strava/strava.controller.js";

const router = express.Router();

// Middleware: exige FID en auth y callback
function requireFID(req, res, next) {
  const fid = req.headers["x-farcaster-user"];
  if (!fid) {
    return res.status(400).json({
      error: "Missing x-farcaster-user header (FID required)"
    });
  }
  next();
}

// Strava OAuth start (REQUIERE FID)
router.get("/auth", requireFID, authRedirect);

// Strava OAuth callback (REQUIERE FID)
router.get("/callback", requireFID, callback);

// Refresh token (no requiere FID)
router.post("/refresh", refreshToken);

// Activities (same)
router.get("/activities", activities);

export default router;
