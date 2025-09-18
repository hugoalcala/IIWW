document.addEventListener('DOMContentLoaded', function() {
    // Guardar datos al crear cuenta
    const formCrearCuenta = document.getElementById('crearCuentaForm');
    if (formCrearCuenta) {
        formCrearCuenta.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const email = document.getElementById('email').value;
            const datosUsuario = {
                usuario: usuario,
                email: email
            };
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            window.location.href = 'login.html';
        });
    }

    const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    const contenedor = document.getElementById('datos-usuario');
    if (datosUsuario) {
        contenedor.innerHTML = `
            <div class="usuario-index">
                <p><strong>Bienvenido, ${datosUsuario.usuario}!</strong></p>
                <p>Email: ${datosUsuario.email}</p>
            </div>
        `;
    } else {
        contenedor.innerHTML = `
            <div class="usuario-index">
                <p>No has iniciado sesión.</p>
            </div>
        `;
    }
});