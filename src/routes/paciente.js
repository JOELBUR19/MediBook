import express from "express";
import { crearPaciente, getPacientes } from "../controllers/paciente.controller.js";

const router = express.Router();

router.post("/", crearPaciente);
router.get("/", getPacientes);

export default router;
