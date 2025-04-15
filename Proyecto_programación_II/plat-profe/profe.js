// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
const db = getFirestore(app);
console.log("🔥 Firebase inicializado correctamente:", db);

// Esperar a que el DOM cargue completamente
document.addEventListener("DOMContentLoaded", () => {
    const welcomeText = document.getElementById("welcomeText");
    const logoutBtn = document.getElementById("logoutBtn");

    // Verificar usuario autenticado
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (welcomeText) {
                welcomeText.textContent = `Bienvenido profesor (${user.email})`;
            }
        } else {
            console.warn("⚠ No hay usuario autenticado, redirigiendo...");
            alert("⚠ No hay usuario autenticado, redirigiendo...");
            window.location.href = "/index.html";
        }
    });

    // Función para cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            try {
                await signOut(auth);
                window.location.href = "/index.html";
            } catch (error) {
                console.error("❌ Error al cerrar sesión:", error);
                alert("Error al cerrar sesión");
            }
        });
    }
});

// Referencia a la colección de tareas en Firestore
const tasksCollection = collection(db, "tareas");

// Escuchar el evento de envío del formulario
const taskForm = document.getElementById("task-form");

// Variables de los campos del formulario
const courseSelect = document.getElementById("task-course");
const roomSelect = document.getElementById("task-room");
const subjectSelect = document.getElementById("task-subject");

// Habilitar todos los campos desde el inicio (verificando que existan)
if (roomSelect) roomSelect.disabled = false;
if (subjectSelect) subjectSelect.disabled = false;

const taskList = document.getElementById("task-list");

// Evento de envío del formulario
if (taskForm) {
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const title = document.getElementById("task-title")?.value;
        const desc = document.getElementById("task-desc")?.value;
        const date = document.getElementById("task-date")?.value;
        const course = courseSelect?.value;
        const room = roomSelect?.value;
        const subject = subjectSelect?.value;

        // Validar que todos los campos estén completos
        if (!title || !desc || !date || !course || !room || !subject) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const docRef = await addDoc(tasksCollection, {
                title,
                desc,
                date,
                course,
                room,
                subject,
                timestamp: new Date()
            });
            console.log("✅ Tarea agregada correctamente con ID:", docRef.id);
            alert("Tarea agregada correctamente.");
            taskForm.reset();
        } catch (error) {
            console.error("❌ Error al agregar tarea: ", error);
            alert("Hubo un error al agregar la tarea.");
        }
    });
}

// Escuchar cambios en la base de datos en tiempo real
onSnapshot(tasksCollection, (snapshot) => {
    if (!taskList) return;

    taskList.innerHTML = "<h2>Tareas agregadas</h2>";
    snapshot.docs.forEach((doc) => {
        const task = doc.data();
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.desc}</p>
            <p><strong>Fecha:</strong> ${task.date}</p>
            <p><strong>Curso:</strong> ${task.course}</p>
            <p><strong>Salón:</strong> ${task.room}</p>
            <p><strong>Materia:</strong> ${task.subject}</p>
            <button onclick="deleteTask('${doc.id}')">Eliminar</button>
        `;
        taskList.appendChild(taskItem);
    });
});

// Función para eliminar una tarea
globalThis.deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, "tareas", taskId));
        console.log("✅ Tarea eliminada correctamente.");
        alert("Tarea eliminada correctamente.");
    } catch (error) {
        console.error("❌ Error al eliminar la tarea: ", error);
        alert("Error al eliminar la tarea.");
    }
};
