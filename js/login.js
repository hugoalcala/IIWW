document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('loginForm');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const usuarioInput = document.getElementById('usuario').value;
            const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
            //validar de contraseña
            if (datosUsuario && usuarioInput === datosUsuario.usuario) {
                window.location.href = 'index.html';
            } else {
                alert('Usuario incorrecto o no registrado.');
            }
        });
    }
});