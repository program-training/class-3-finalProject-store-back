import express from "express";
import { userRegister, userLogin, userReportsRouter } from "./usersController";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/triggersPostgres", userReportsRouter);

export default router;
