// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfr-8nn4g8znJJeUldAu5nelnUPIPGVnI",
  authDomain: "proyecto-plataforma-15980.firebaseapp.com",
  projectId: "proyecto-plataforma-15980",
  storageBucket: "proyecto-plataforma-15980.appspot.com",
  messagingSenderId: "1048726369624",
  appId: "1:1048726369624:web:a259b31e28245e8d4e212d",
  measurementId: "G-2GDWDGBK90"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formProfesor").addEventListener("submit", function (e) {
        e.preventDefault();
        iniciarSesion("profesor");
    });

    document.getElementById("formEstudiante").addEventListener("submit", function (e) {
        e.preventDefault();
        iniciarSesion("estudiante");
    });

    function iniciarSesion(tipo) {
        let email, password;

        if (tipo === "profesor") {
            email = document.getElementById("profesorEmail").value;
            password = document.getElementById("profesorPassword").value;
        } else {
            email = document.getElementById("estudianteEmail").value;
            password = document.getElementById("estudiantePassword").value;
        }

        console.log(`Intentando iniciar sesión como ${tipo} con email: ${email}`);

        if (email === "" || password === "") {
            alert("Por favor ingresa email y contraseña.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Inicio de sesión exitoso:", userCredential.user);
                if (tipo === "profesor") {
                    window.location.href = "plat-profe/plataforma-profesor.html"; 
                } else {
                    window.location.href = "plat-estudiante/plataforma-estudiante.html";
                }
            })
            .catch((error) => {
                console.error("Error en el inicio de sesión:", error);
                alert("Error: " + error.message);
            });
    }
});

