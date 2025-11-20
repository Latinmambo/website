// Función para cargar componentes HTML (header, menu, footer)
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

// 🟢 Cargar los componentes
document.addEventListener("DOMContentLoaded", function() {
  includeHTML("/components/header.html", "header-container");
  includeHTML("/components/menu.html", "menu-container");
  includeHTML("/components/footer.html", "footer-container");
});

// 🟣 Función para menú hamburguesa
function setupMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

// 🟡 Función para cambiar idioma (soporta raíz para español)
function setupLanguageSwitcher() {
  const flags = document.querySelectorAll(".lang-flag");
  flags.forEach(flag => {
    flag.addEventListener("click", event => {
      event.preventDefault();

      const selectedLang = flag.getAttribute("data-lang");
      let path = window.location.pathname;

      // Normaliza rutas para evitar errores
      path = path.replace(/^\/(en|de)\//, ""); // elimina prefijo /en/ o /de/

      // Si estamos en la raíz y path está vacío, ir a index.html
      if (path === "/" || path === "") {
        path = "index.html";
      }

      // Redirigir según idioma
      switch (selectedLang) {
        case "en":
          window.location.href = `/en/${path}`;
          break;
        case "de":
          window.location.href = `/de/${path}`;
          break;
        default:
          window.location.href = `/${path}`;
          break;
      }
    });
  });
}

// 🔵 Función para botón "Top"
function setupScrollToTop() {
  const btnTop = document.getElementById("btnTop");
  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      btnTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
  }
}

// 🟠 Funciones para galería modal
let currentSlideIndex = 0;
let galleryImages = [];

// Abrir modal y mostrar imagen clickeada
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

// Cambiar imagen dentro del modal
function changeSlide(step) {
  currentSlideIndex += step;
  if (currentSlideIndex < 0) currentSlideIndex = galleryImages.length - 1;
  if (currentSlideIndex >= galleryImages.length) currentSlideIndex = 0;

  const modalImg = document.getElementById("modal-image");
  modalImg.src = galleryImages[currentSlideIndex].src;
}

// Evitar que clic en la imagen cierre el modal y configurar botón de cerrar
document.addEventListener("DOMContentLoaded", () => {
  const modalImg = document.getElementById("modal-image");
  if (modalImg) {
    modalImg.addEventListener("click", function(event){
      event.stopPropagation();
    });
  }

  const closeBtn = document.querySelector("#image-modal .close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
});
