// Función para cargar un archivo HTML en un elemento
function includeHTML(file, elementId) {
    fetch(file)
        .then(response => response.text()) // convertir la respuesta en texto
        .then(data => {
            document.getElementById(elementId).innerHTML = data; // inserta el contenido del elemento

            /* Agregar funcionalidad del menú hamburguesa después de cargar menu.html */
            if (elementId === "menu-container") {
                const menuToggle = document.querySelector(".menu-toggle");
                const navLinks = document.querySelector(".nav-links");

                if (menuToggle && navLinks) {
                    menuToggle.addEventListener("click", () => {
                        navLinks.classList.toggle("active");
                    });
                }
            }

            /* Agregar funcionalidad del botón "TOP" después de cargar el footer */
            if (elementId === "footer-container") {
                const btnTop = document.getElementById("btnTop");

                if (btnTop) {
                    // Al hacer click, volver al inicio suavemente
                    btnTop.addEventListener("click", () => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    });

                    // Mostrar/ocultar el botón según el scroll
                    window.addEventListener("scroll", () => {
                        if (window.scrollY > 300) {
                            btnTop.style.display = "block";
                        } else {
                            btnTop.style.display = "none";
                        }
                    });
                }
            }
        })
        .catch(error => console.error("Error cargando " + file, error));
}

// Cargar header, menú y footer automáticamente
document.addEventListener("DOMContentLoaded", function() {
    includeHTML("header.html", "header-container");
    includeHTML("menu.html", "menu-container");
    includeHTML("footer.html", "footer-container");
});

// Modal de imágenes
function openModal(imgElement) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

function closeModal() {
    document.getElementById("image-modal").style.display = "none";
}
