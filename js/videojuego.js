// ==============================
// 🧩 Funciones generales
// ==============================

// Guardar datos de formulario en localStorage
function guardarDatos(formId, key) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData.entries());
    localStorage.setItem(key, JSON.stringify(datos));
    alert("✅ Datos guardados correctamente.");
  });
}

// Obtener datos guardados de localStorage
function obtenerDatos(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

// Combinar todos los datos guardados
function obtenerDatosCompletos() {
  return {
    ...obtenerDatos("registro"),
    ...obtenerDatos("preferencias"),
    ...obtenerDatos("perfil"),
  };
}

// Mostrar datos combinados en el perfil
function mostrarDatos() {
  const contenedor = document.getElementById("datosUsuario");
  const lista = document.getElementById("listaDatos");
  const datos = obtenerDatosCompletos();

  lista.innerHTML = "";

  if (Object.keys(datos).length === 0) {
    lista.innerHTML = "<li>No hay datos guardados todavía.</li>";
  } else {
    for (const [campo, valor] of Object.entries(datos)) {
      lista.innerHTML += `<li><strong>${campo}:</strong> ${valor}</li>`;
    }
  }

  contenedor.style.display = "block";
}

// ==============================
// ⚙️ Inicialización por página
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Registro
  if (path.includes("registro.html")) {
    const form = document.querySelector("form");
    if (form) form.setAttribute("id", "registroForm");
    guardarDatos("registroForm", "registro");
  }

  // Index (preferencias gamer)
  if (path.includes("index.html")) {
    const form = document.querySelector("form");
    if (form) form.setAttribute("id", "indexForm");
    guardarDatos("indexForm", "preferencias");
  }

  // Perfil
  if (path.includes("perfil.html")) {
    const form = document.querySelector("form");
    if (form) form.setAttribute("id", "perfilForm");
    guardarDatos("perfilForm", "perfil");

    const botonMostrar = document.querySelector(".btn");
    if (botonMostrar) {
      botonMostrar.addEventListener("click", mostrarDatos);
    }
  }
});
// --- GUARDAR DATOS DEL PERFIL ---
document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btnGuardar");
  const btnVer = document.getElementById("btnVer");
  const lista = document.getElementById("listaDatos");
  const datosUsuario = document.getElementById("datosUsuario");

  if (btnGuardar) {
    btnGuardar.addEventListener("click", () => {
      const perfil = {
        fechaNacimiento: document.getElementById("fecha-nacimiento").value,
        genero: document.querySelector('input[name="genero"]:checked')?.value || "No especificado",
        juegosFavoritos: Array.from(document.getElementById("juegos").selectedOptions).map(opt => opt.text),
        colorFavorito: document.getElementById("color").value,
        nivel: document.getElementById("nivel").value,
        canal: document.getElementById("canal").value,
        horaJuego: document.getElementById("hora-juego").value,
        bio: document.getElementById("bio").value
      };

      localStorage.setItem("perfil", JSON.stringify(perfil));
      alert("✅ Datos del perfil guardados correctamente");
    });
  }

  // --- MOSTRAR TODOS LOS DATOS ---
  if (btnVer) {
    btnVer.addEventListener("click", () => {
      const registro = JSON.parse(localStorage.getItem("registro")) || {};
      const index = JSON.parse(localStorage.getItem("preferencias")) || {};
      const perfil = JSON.parse(localStorage.getItem("perfil")) || {};

      const todos = { ...registro, ...index, ...perfil };
      lista.innerHTML = "";

      if (Object.keys(todos).length === 0) {
        lista.innerHTML = "<li>No hay datos guardados.</li>";
      } else {
        for (const [clave, valor] of Object.entries(todos)) {
          lista.innerHTML += `<li><strong>${clave}:</strong> ${Array.isArray(valor) ? valor.join(", ") : valor}</li>`;
        }
      }

      datosUsuario.style.display = "block";
    });
  }
});
