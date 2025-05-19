import express from "express";
import subscribeController from "../controllers/subscribe.js";

const router = express.Router();

router.post("/", subscribeController.subscribeUser);

export default router;
