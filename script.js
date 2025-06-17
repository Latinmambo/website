// Funcion para cargar un archivo HTML en un elemento
function includeHTML(file, elementId) {
    fetch(file)
        .then(response => response.text()) // convertir la respuesta en texto
        .then(data => {
            document.getElementById(elementId).innerHTML = data; // inserta el contenido del elemnto
        })
        .catch(error => console.error("Error cargando" + file, error));
}

// Cargar header y footer automaticamente
document.addEventListener("DOMContentLoaded", function() {
    includeHTML("header.html", "header-container");
    includeHTML("menu.html", "menu-container");
    includeHTML("footer.html", "footer-container");
});

function openModal(imgElement) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

function closeModal() {
    document.getElementById('image-modal').style.display = "none";
}
