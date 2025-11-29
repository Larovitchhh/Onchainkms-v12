import express from "express";
import { webhookGet, webhookPost } from "../controllers/webhook.controller.js";

const router = express.Router();

router.get("/", webhookGet);
router.post("/", webhookPost);

export default router;

