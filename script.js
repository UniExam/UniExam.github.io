document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll para enlaces de ancla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Animar tarjetas (feature y course) al hacer scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const courseCards = document.querySelectorAll('.course-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [...featureCards, ...courseCards].forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
  });

  // Menú hamburguesa
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  const contenedor = document.getElementById("contenedor-comentarios");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");

let posicion = 0;
const tarjetasVisibles = 4;

btnSiguiente.addEventListener("click", () => {
  const totalTarjetas = contenedor.children.length;
  if (posicion < totalTarjetas - tarjetasVisibles) {
    posicion++;
    actualizarCarrusel();
  }
});

btnAnterior.addEventListener("click", () => {
  if (posicion > 0) {
    posicion--;
    actualizarCarrusel();
  }
});

function actualizarCarrusel() {
  const desplazamiento = posicion * (100 / tarjetasVisibles);
  contenedor.style.transform = `translateX(-${desplazamiento}%)`;
}

    const URL = "https://uniexam-github-io.onrender.com/comentarios";

// Folios válidos
const foliosValidos = ["UNX123", "UNX456", "UNI2025", "EXAM001", "ABC999"];

const modal = document.getElementById("modal-valoracion");
const btnAbrir = document.getElementById("btn-nueva-valoracion");
const btnCerrar = document.getElementById("cerrar-modal");
const form = document.getElementById("form-valoracion");
const estrellas = document.querySelectorAll("#rating-stars span");
const contenedorComentarios = document.getElementById("carousel-container");

let ratingSeleccionado = 0;

// 🔸 Al cargar la página, obtener comentarios desde el servidor
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(URL);
    const comentarios = await res.json();
    comentarios.forEach(c => crearTarjeta(c));
  } catch (err) {
    console.error("Error al cargar comentarios:", err);
  }
});

// 🔸 Abrir modal
btnAbrir.addEventListener("click", () => {
  modal.style.display = "flex";
});

// 🔸 Cerrar modal
btnCerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// 🔸 Cerrar si clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 🔸 Efecto de estrellas
estrellas.forEach((estrella, index) => {
  estrella.addEventListener("mouseover", () => {
    estrellas.forEach((e, i) => e.classList.toggle("hovered", i <= index));
  });

  estrella.addEventListener("mouseout", () => {
    estrellas.forEach((e, i) => e.classList.toggle("hovered", i < ratingSeleccionado));
  });

  estrella.addEventListener("click", () => {
    ratingSeleccionado = index + 1;
    estrellas.forEach((e, i) => e.classList.toggle("selected", i < ratingSeleccionado));
  });
});

// 🔸 Enviar formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const curso = document.getElementById("curso").value.trim();
  const folio = document.getElementById("folio").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  // Validar folio
  if (!foliosValidos.includes(folio)) {
    alert("❌ Folio inválido.");
    return;
  }

  // Validar estrellas
  if (ratingSeleccionado === 0) {
    alert("⭐ Por favor selecciona una calificación.");
    return;
  }

  const data = {
  nombre,
  apellido,
  curso,
  folio,
  comentario,
  estrellas: ratingSeleccionado
};

// Enviar al servidor
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      crearTarjeta(data);
      alert("✅ Comentario enviado correctamente");
    } else {
      alert("❌ Error al guardar el comentario");
    }
  } catch (err) {
    console.error("Error al enviar comentario:", err);
  }

  // Resetear formulario
  form.reset();
  estrellas.forEach((e) => e.classList.remove("selected", "hovered"));
  ratingSeleccionado = 0;
  modal.style.display = "none";
});

  // Crear tarjeta de comentario
  function crearTarjeta(data) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-comentario");
  tarjeta.style.cssText = `
    background: #fff;
  border: 2px solid #ffe0b2;
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
  width: 250px;           /* Ancho fijo */
  height: 280px;          /* Alto igual al ancho = cuadrado */
  text-align: center; /* Centra todo */
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  `;

  const estrellasHTML = "⭐".repeat(data.estrellas) + "☆".repeat(5 - data.estrellas);

  tarjeta.innerHTML = `
  <p class="nombre-usuario">${data.nombre} ${data.apellido}</p>
  <p class="curso-usuario"><strong>Curso:</strong> ${data.curso}</p>
  <p class="estrellas-valoracion">${estrellasHTML}</p>
  <p class="comentario-usuario">${data.comentario}</p>
`;

contenedorComentarios.prepend(tarjeta);
}

});
