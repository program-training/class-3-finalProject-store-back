import express from "express";
import { getTimeTrigger, userReportsRouter } from "./triggersController";

const router = express.Router();

router.get("/", getTimeTrigger);
router.get("/triggersPostgres", userReportsRouter);

export default router;
