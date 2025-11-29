import express from "express";
import { getRanking } from "../../services/data.service.js";

const router = express.Router();

router.get("/", (req, res) => {
  const ranking = getRanking();
  res.json(ranking);
});

export default router;
