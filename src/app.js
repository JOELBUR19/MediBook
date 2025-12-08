import express from "express";
import cors from "cors";

import pacientes from "./routes/paciente.js";
import doctores from "./routes/doctor.js";
import consultorios from "./routes/consultorio.js";
import citas from "./routes/cita.js";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/pacientes", pacientes);
app.use("/doctores", doctores);
app.use("/consultorios", consultorios);
app.use("/citas", citas);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
