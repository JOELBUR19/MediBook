import prisma from "../prismaClient.js";

export const crearPaciente = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const paciente = await prisma.paciente.create({
      data: { nombre, email },
    });
    res.json(paciente);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el paciente" });
  }
};

export const getPacientes = async (req, res) => {
  const pacientes = await prisma.paciente.findMany({
    include: {
      citas: true
    }
  });
  res.json(pacientes);
};
