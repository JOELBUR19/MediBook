import prisma from "../prismaClient.js";

export const crearConsultorio = async (req, res) => {
  const { nombre } = req.body;

  try {
    const consultorio = await prisma.consultorio.create({
      data: { nombre },
    });
    res.json(consultorio);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el consultorio" });
  }
};

export const getConsultorios = async (req, res) => {
  try {
    const lista = await prisma.consultorio.findMany();
    res.json(lista);
  } catch (err) {
    res.status(400).json({ message: "Error al obtener los consultorios" });
  }
};
