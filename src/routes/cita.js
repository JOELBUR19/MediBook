import express from "express";
import { crearCita, getCitas } from "../controllers/cita.controller.js";

const router = express.Router();

router.post("/", crearCita);
router.get("/", getCitas);

export default router;
