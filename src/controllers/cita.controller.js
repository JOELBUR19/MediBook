import prisma from "../prismaClient.js";

export const crearCita = async (req, res) => {
  const { fecha, pacienteId, doctorId, consultorioId } = req.body;

  try {
    const cita = await prisma.cita.create({
      data: {
        fecha: new Date(fecha),
        pacienteId,
        doctorId,
        consultorioId,
      },
    });

    res.json(cita);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la cita" });
  }
};

export const getCitas = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        paciente: true,
        doctor: true,
        consultorio: true,
      },
    });

    res.json(citas);
  } catch (err) {
    res.status(400).json({ message: "Error al obtener las citas" });
  }
};
