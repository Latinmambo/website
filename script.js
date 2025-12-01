/* ============================================================
   Cargar componentes HTML (header, menu, footer)
   ============================================================ */
function includeHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;

      if (elementId === "menu-container") {
        setupMenu();
        setupLanguageSwitcher();
      }

      if (elementId === "footer-container") {
        setupScrollToTop();
      }
    })
    .catch(error => console.error("Error cargando " + file, error));
}

/* ============================================================
   Inicialización: cargar header, menú y footer
   ============================================================ */
document.addEventListener("DOMContentLoaded", function() {
  includeHTML("/components/header.html", "header-container");
  includeHTML("/components/menu.html", "menu-container");
  includeHTML("/components/footer.html", "footer-container");
});

/* ============================================================
   Menú hamburguesa
   ============================================================ */
function setupMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

/* ============================================================
   Selector de idioma para 3 carpetas: /en/ /es/ /de/
   ============================================================ */
function setupLanguageSwitcher() {
  const flags = document.querySelectorAll(".lang-flag");

  flags.forEach(flag => {
    flag.addEventListener("click", event => {
      event.preventDefault();

      const selectedLang = flag.getAttribute("data-lang");
      let path = window.location.pathname;

      // Detectar idioma actual
      const currentLang = path.split("/")[1];

      // Si ya estás en un idioma, eliminar ese prefijo
      if (["en", "es", "de"].includes(currentLang)) {
        path = path.replace(`/${currentLang}/`, "");
      }

      // Evitar rutas vacías
      if (path === "" || path === "/") {
        path = "index.html";
      }

      // Nueva ruta final
      window.location.href = `/${selectedLang}/${path}`;
    });
  });
}

/* ============================================================
   Botón "Top"
   ============================================================ */
function setupScrollToTop() {
  const btnTop = document.getElementById("btnTop");

  if (!btnTop) return;

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
}

/* ============================================================
   Modal de imágenes (galería)
   ============================================================ */
let currentSlideIndex = 0;
let galleryImages = [];

// Abrir modal
function openModal(img) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");

  galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  currentSlideIndex = galleryImages.indexOf(img);

  modal.style.display = "block";
  modalImg.src = img.src;
}

// Cerrar modal
function closeModal() {
  const modal = document.getElementById("image-modal");
  modal.style.display = "none";
}

// Cambiar imagen (prev/next)
function changeSlide(step) {
  currentSlideIndex += step;

  if (currentSlideIndex < 0) currentSlideIndex = galleryImages.length - 1;
  if (currentSlideIndex >= galleryImages.length) currentSlideIndex = 0;

  const modalImg = document.getElementById("modal-image");
  modalImg.src = galleryImages[currentSlideIndex].src;
}

/* ============================================================
   Configuración adicional del modal
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.querySelector("#image-modal .close");

  if (modalImg) {
    modalImg.addEventListener("click", e => e.stopPropagation());
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
});
