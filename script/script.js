// Lightbox elementen
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const closeBtn = document.getElementById("closeBtn");

// Klik op foto/video → open lightbox
document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const media = item.querySelector("img, video").cloneNode(true);

        if (media.tagName === "VIDEO") {
            media.controls = true;
            media.autoplay = true;
        }

        lightboxContent.innerHTML = "";
        lightboxContent.appendChild(media);
        lightbox.style.display = "flex";
    });
});

// Sluiten
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxContent.innerHTML = "";
});

// Sluiten bij klik buiten media
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
        lightboxContent.innerHTML = "";
    }
});
