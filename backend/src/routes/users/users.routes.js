import express from "express";
import { getUser, getUserActivities } from "../../services/data.service.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  const user = getUser(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.get("/:id/activities", (req, res) => {
  const activities = getUserActivities(req.params.id);
  res.json(activities);
});

router.get("/", (req, res) => {
  res.status(400).json({ error: "Missing user id" });
});

export default router;
