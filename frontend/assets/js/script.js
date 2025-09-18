document.addEventListener("DOMContentLoaded", () => {
  // Selecciono tanto .view-more-btn como cualquier .card-btn que tenga data-name
  const buttons = document.querySelectorAll(".view-more-btn, .card-btn[data-name]");
  const infoSection = document.getElementById("restaurant-info");

  // Elementos dentro de la sección dinámica
  const nameEl = document.getElementById("restaurant-name");
  const videoEl = document.getElementById("restaurant-video");
  const descEl = document.getElementById("restaurant-description");
  const locEl = document.getElementById("restaurant-location");
  const hoursEl = document.getElementById("restaurant-hours");
  const priceEl = document.getElementById("restaurant-price");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Recoger info desde los data-attributes (soporta varias variantes)
      const name = button.dataset.name || button.dataset.id || button.datasetId || "";
      const video = button.dataset.video || "";
      const description = button.dataset.description || "";
      const location = button.dataset.location || "";
      const hours = button.dataset.hours || "";
      const price = button.dataset.price || "";

      // Si falta lo mínimo, avisamos en consola (útil para debug)
      if (!name) console.warn("Botón sin data-name en:", button);

      // Poner contenido
      nameEl.textContent = name;
      descEl.textContent = description;
      locEl.textContent = location;
      hoursEl.textContent = hours;
      priceEl.textContent = price;

      // Reemplazar la fuente del video de forma fiable
      try {
        videoEl.pause();
      } catch (err) {}

      if (video) {
        videoEl.innerHTML = `<source src="${video}" type="video/mp4">Your browser does not support the video tag.`;
        videoEl.load();
      } else {
        videoEl.innerHTML = ""; // limpio si no hay video
      }

      // Mostrar la sección (añadir 'active' y quitar 'hidden' por compatibilidad)
      infoSection.classList.remove("hidden");
      infoSection.classList.add("active");

      // Scroll suave hacia la sección
      infoSection.scrollIntoView({ behavior: "smooth" });
    });
  });
}); // 👈 Cierre de DOMContentLoaded

// ✅ Función para enviar formulario al backend
async function generarExperiencia() {
  const seleccionadas = [
    document.getElementById("exp1").value,
    document.getElementById("exp2").value,
    document.getElementById("exp3").value,
    document.getElementById("exp4").value,
  ];

  const nombre = document.getElementById("nombre").value;
  const contacto = document.getElementById("contacto") ? document.getElementById("contacto").value : "";
  const fecha = document.getElementById("fecha").value;

  const payload = { nombre, contacto, fecha, seleccionadas };

  try {
    const response = await fetch("http://localhost:3001/api/experiencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const resultado = document.getElementById("resultado");

    if (response.ok) {
      resultado.innerHTML = `<p style="color:green">${data.message}</p>`;
    } else {
      resultado.innerHTML = `<p style="color:red">❌ Error: ${data.error || "No se pudo guardar la experiencia"}</p>`;
    }
  } catch (err) {
    console.error("Error al enviar:", err);
    document.getElementById("resultado").innerHTML =
      `<p style="color:red">❌ Error de conexión con el servidor</p>`;
  }
}
