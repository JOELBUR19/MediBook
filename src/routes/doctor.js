import express from "express";
import { crearDoctor,
    getDoctores
 } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/", crearDoctor);
router.get("/", getDoctores);

export default router;
