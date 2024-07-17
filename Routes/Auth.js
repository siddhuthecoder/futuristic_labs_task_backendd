import express from "express";
import { getUser, signIn, singUp } from "../definitions/Auth.js";
import tokenCheck from "../Middleware/tokenCheck.js";

const router = express.Router();

router.get("/", tokenCheck, getUser);
router.post("/signup", singUp);
router.post("/signin", signIn);

export default router;
