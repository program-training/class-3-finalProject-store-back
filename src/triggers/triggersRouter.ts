import express from "express";
import { getTimeTrigger } from "./triggersController";

const router = express.Router();

router.get("/", getTimeTrigger);

export default router;
