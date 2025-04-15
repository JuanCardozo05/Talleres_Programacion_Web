// Importar módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";


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
const db = getFirestore(app);
const auth = getAuth(app);

// Referencias a los elementos del DOM
const header = document.getElementById("header");
const cursoSelect = document.getElementById("curso");
const salonSelect = document.getElementById("salon");
const materiaSelect = document.getElementById("materia");
const verTareasBtn = document.getElementById("verTareas");
const tareasLista = document.getElementById("tareasLista");


// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = document.getElementById("welcomeText");
    const logoutBtn = document.getElementById("logoutBtn");

    // Verificar usuario autenticado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            welcomeText.textContent = `Bienvenido estudiante (${user.email})`;
        } else {
            console.warn("⚠ No hay usuario autenticado, redirigiendo...");
            alert("⚠ No hay usuario autenticado, redirigiendo...");
            window.location.href = "/index.html";
        }
    });

    // Función para cerrar sesión
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "/index.html";
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
            alert("Error al cerrar sesión");
        }
    });
});


// Deshabilitar selecciones hasta que se complete la anterior
salonSelect.disabled = true;
materiaSelect.disabled = true;
verTareasBtn.disabled = true;

// Habilitar salón cuando se selecciona curso
cursoSelect.addEventListener("change", () => {
    if (cursoSelect.value) {
        salonSelect.disabled = false;
    } else {
        salonSelect.disabled = true;
        materiaSelect.disabled = true;
        verTareasBtn.disabled = true;
    }
});

// Habilitar materia cuando se selecciona salón
salonSelect.addEventListener("change", () => {
    if (salonSelect.value) {
        materiaSelect.disabled = false;
    } else {
        materiaSelect.disabled = true;
        verTareasBtn.disabled = true;
    }
});

// Habilitar botón cuando se selecciona materia
materiaSelect.addEventListener("change", () => {
    verTareasBtn.disabled = !materiaSelect.value;
});

// Obtener y mostrar tareas desde Firebase
verTareasBtn.addEventListener("click", async () => {
    const curso = cursoSelect.value;
    const salon = salonSelect.value;
    const materia = materiaSelect.value;

    if (!curso || !salon || !materia) {
        alert("Por favor, seleccione todas las opciones antes de continuar.");
        return;
    }

    // Limpiar lista de tareas
    tareasLista.innerHTML = "<p>Cargando tareas...</p>";

    // Escuchar cambios en la colección de tareas
    onSnapshot(collection(db, "tareas"), (snapshot) => {
        tareasLista.innerHTML = ""; 
    
        let tareas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        console.log("Todas las tareas obtenidas:", tareas); // 👀 Revisa los datos en la consola
    
        let tareasFiltradas = tareas.filter(tarea => 
            tarea.course.trim().toLowerCase() === curso.trim().toLowerCase() &&
            tarea.room.trim().toLowerCase() === salon.trim().toLowerCase() &&
            tarea.subject.trim().toLowerCase() === materia.trim().toLowerCase()
        );
    
        console.log("Tareas filtradas:", tareasFiltradas); // 👀 Verifica que el filtro está funcionando
    
        if (tareasFiltradas.length === 0) {
            tareasLista.innerHTML = "<p>No hay tareas disponibles para esta selección.</p>";
            return;
        }
    
        tareasFiltradas.forEach(tarea => {
            const tareaDiv = document.createElement("div");
            tareaDiv.classList.add("tarea");
            tareaDiv.innerHTML = `
                <h4>${tarea.title}</h4>
                <p>${tarea.desc}</p>
                <p><strong>Fecha:</strong> ${tarea.date}</p>
            `;
            tareasLista.appendChild(tareaDiv);
        });
    });    
});


