 function mostrarDatos() {
      const form = document.getElementById("perfilForm");
      const datosDiv = document.getElementById("datosUsuario");
      const lista = document.getElementById("listaDatos");
      lista.innerHTML = "";

      const datos = new FormData(form);

      datos.forEach((valor, clave) => {
        lista.innerHTML += `<li><strong>${clave}:</strong> ${valor}</li>`;
      });

      datosDiv.style.display = "block";
    }