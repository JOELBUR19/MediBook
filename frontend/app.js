// URL del backend
const API = "http://localhost:3000";

// ==============================
//    REGISTRAR PACIENTE
// ==============================
async function registrarPaciente() {
  const nombre = document.getElementById("regNombre").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const box = document.getElementById("regRespuesta");

  if (!nombre || !email) {
    box.innerText = "⚠️ Todos los campos son obligatorios.";
    return;
  }

  try {
    const res = await fetch(`${API}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    });

    const data = await res.json();

    if (res.ok) {
      box.innerText = `✅ Paciente registrado con ID: ${data.id}`;
    } else {
      box.innerText = "❌ Error al registrar paciente.";
    }
  } catch (error) {
    box.innerText = "❌ Error de conexión con el servidor.";
  }
}

// ==============================
//    LOGIN PACIENTE
// ==============================
async function loginPaciente() {
  const email = document.getElementById("loginEmail").value.trim();
  const box = document.getElementById("loginRespuesta");

  if (!email) {
    box.innerText = "⚠️ Ingresa un correo.";
    return;
  }

  try {
    const res = await fetch(`${API}/pacientes`);
    const pacientes = await res.json();

    const encontrado = pacientes.find((p) => p.email === email);

    if (encontrado) {
      box.innerText = `✅ Bienvenido, ${encontrado.nombre}`;
      localStorage.setItem("pacienteId", encontrado.id);
    } else {
      box.innerText = "❌ Correo no encontrado.";
    }
  } catch (error) {
    box.innerText = "❌ Error conectando al servidor.";
  }
}

// ==============================
//    CARGAR ESPECIALIDADES
// ==============================
async function cargarEspecialidades() {
  const sel = document.getElementById("selEspecialidad");

  try {
    const res = await fetch(`${API}/doctores`);
    const doctores = await res.json();

    const especialidades = [...new Set(doctores.map((d) => d.especialidad))];

    sel.innerHTML = "<option value=''>Seleccione especialidad</option>";

    especialidades.forEach((e) => {
      sel.innerHTML += `<option value="${e}">${e}</option>`;
    });
  } catch (error) {
    sel.innerHTML = "<option>Error cargando datos</option>";
  }
}

// ==============================
//    CARGAR DOCTORES POR ESPECIALIDAD
// ==============================
async function cargarDoctores() {
  const esp = document.getElementById("selEspecialidad").value;
  const sel = document.getElementById("selDoctor");

  if (!esp) {
    sel.innerHTML = "<option value=''>Seleccione un doctor</option>";
    return;
  }

  try {
    const res = await fetch(`${API}/doctores?especialidad=${esp}`);
    const data = await res.json();

    sel.innerHTML = "<option value=''>Seleccione doctor</option>";

    data.forEach((doc) => {
      sel.innerHTML += `<option value="${doc.id}">${doc.nombre}</option>`;
    });
  } catch (error) {
    sel.innerHTML = "<option>Error cargando doctores</option>";
  }
}

// Escuchar cambios
document.getElementById("selEspecialidad")
  .addEventListener("change", cargarDoctores);

// ==============================
//    RESERVAR CITA
// ==============================
async function reservarCita() {
  const doctorId = document.getElementById("selDoctor").value;
  const fecha = document.getElementById("selFecha").value;
  const pacienteId = localStorage.getItem("pacienteId");
  const box = document.getElementById("reservaRespuesta");

  if (!pacienteId) return box.innerText = " Debes iniciar sesión primero.";
  if (!doctorId || !fecha) return box.innerText = " Todos los campos son obligatorios.";

  try {
    const res = await fetch(`${API}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha,
        pacienteId: Number(pacienteId),
        doctorId: Number(doctorId),
        consultorioId: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      box.innerText = ` Cita registrada para el ${new Date(data.fecha).toLocaleString()}`;
    } else {
      box.innerText = " Error al reservar la cita.";
    }
  } catch (error) {
    box.innerText = " Error conectando al servidor.";
  }
}

// ==============================
//    MENSAJE MEDICAMENTOS
// ==============================
async function Medicamentos() {
  Swal.fire({
    icon: "error",
    title: "No hay medicamentos disponibles",
    text: "Vaya a la farmacia, yo le aviso cuando haya más.",
  });
}

// ==============================
//    CARGAR TODAS LAS CITAS (GENERAL)
// ==============================
async function cargarCitas() {
  const box = document.getElementById("listaCitas");

  try {
    const res = await fetch(`${API}/citas`);
    const citas = await res.json();

    if (!Array.isArray(citas) || citas.length === 0) {
      box.innerHTML = "<p>No hay citas registradas.</p>";
      return;
    }

    box.innerHTML = citas
      .map(
        (c) => `
          <div>
            <p><strong>Paciente:</strong> ${c.paciente?.nombre ?? "Desconocido"}</p>
            <p><strong>Fecha / Hora:</strong> ${new Date(c.fecha).toLocaleString()}</p>
            <p><strong>Doctor:</strong> ${c.doctor?.nombre ?? "No asignado"}</p>
            <p><strong>Especialidad:</strong> ${c.doctor?.especialidad ?? "Sin especialidad"}</p>
            <hr>
          </div>
        `
      )
      .join("");
  } catch (error) {
    box.innerHTML = "<p>Error al cargar las citas.</p>";
  }
}

window.cargarCitas = cargarCitas;


// ==============================
//    EJECUTAR AL CARGAR
// ==============================
cargarEspecialidades();
