import express from "express";
import { editDesign, getDesign, postDesign } from "../definitions/Designs.js";

const router = express.Router();

router.get("/:id", getDesign);
router.post("/new", postDesign);
router.put("/edit/:id", editDesign);

export default router;
