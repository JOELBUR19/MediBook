import express from "express";
import { crearConsultorio, getConsultorios } from "../controllers/consultorio.controller.js";

const router = express.Router();

router.post("/", crearConsultorio);
router.get("/", getConsultorios);

export default router;
