import prisma from "../prismaClient.js";

export const crearDoctor = async (req, res) => {
  const { nombre, especialidad } = req.body;

  try {
    const doctor = await prisma.doctor.create({
      data: { nombre, especialidad },
    });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el doctor" });
  }
};

export const getDoctores = async (req, res) => {
  try {
    const { especialidad } = req.query;

    const doctores = await prisma.doctor.findMany({
      where: especialidad
        ? {
            especialidad: {
              equals: especialidad,
              mode: "insensitive" 
            }
          }
        : {}
    });
    res.json(doctores);
  } catch (err) {
    res.status(400).json({ message: "Error al obtener los doctores" });
  }
};
