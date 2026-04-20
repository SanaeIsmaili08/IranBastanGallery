/* =============================================
   Iran Bastan Gallery — Script
   ============================================= */

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mainNav.classList.toggle('open');
    });

    // Close menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mainNav.classList.remove('open');
        });
    });

    // Close menu on click outside nav
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
            hamburger.classList.remove('open');
            mainNav.classList.remove('open');
        }
    });
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
}

// ---- LIKE BUTTONS ----
let liked = JSON.parse(localStorage.getItem('liked')) || [];

const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
    const id  = btn.dataset.id;
    const img = btn.dataset.img;

    // Load saved status
    if (liked.find(item => item.id === id)) {
        btn.textContent = '♥';
        btn.style.color = '#e53935';
        btn.classList.add('liked');
    }

    btn.addEventListener('click', () => {
        const exists = liked.find(item => item.id === id);

        if (exists) {
            liked = liked.filter(item => item.id !== id);
            btn.textContent = '♡';
            btn.style.color = '';
            btn.classList.remove('liked');
        } else {
            liked.push({ id, img });
            btn.textContent = '♥';
            btn.style.color = '#e53935';
            btn.classList.add('liked');
        }

        localStorage.setItem('liked', JSON.stringify(liked));
    });
});

// ---- LIKED ITEMS PAGE (heart.html) ----
const likedContainer = document.getElementById('liked-items');

if (likedContainer) {
    if (liked.length === 0) {
        likedContainer.innerHTML = `
            <div class="liked-empty" style="grid-column:1/-1">
                <span>💔</span>
                <p>You haven't saved any favorites yet.</p>
                <a href="gallary.html" class="btn" style="margin-top:20px;display:inline-block">View the gallery</a>
            </div>`;
    } else {
        liked.forEach((item, i) => {
            likedContainer.innerHTML += `
                <div class="gallery-item" style="animation-delay:${i * 0.07}s">
                    <div class="card-header">
                        <span class="photo-title">Favorite item</span>
                        <span class="like-btn liked" data-id="${item.id}" data-img="${item.img}" style="color:#e53935">♥</span>
                    </div>
                    <img src="${item.img}" alt="Favorite item" loading="lazy">
                </div>`;
        });

        // Reload like-buttons after dynamic rendering
        document.querySelectorAll('#liked-items .like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                liked = liked.filter(item => item.id !== id);
                localStorage.setItem('liked', JSON.stringify(liked));
                btn.closest('.gallery-item').style.transition = 'opacity 0.3s, transform 0.3s';
                btn.closest('.gallery-item').style.opacity = '0';
                btn.closest('.gallery-item').style.transform = 'scale(0.9)';
                setTimeout(() => {
                    btn.closest('.gallery-item').remove();
                    if (document.querySelectorAll('#liked-items .gallery-item').length === 0) {
                        likedContainer.innerHTML = `
                            <div class="liked-empty" style="grid-column:1/-1">
                                <span>💔</span>
                                <p>You have no more favorites.</p>
                                <a href="gallary.html" class="btn" style="margin-top:20px;display:inline-block">Back to gallery</a>
                            </div>`;
                    }
                }, 300);
            });
        });
    }
}

// ---- LIGHTBOX: close on click outside image ----
document.querySelectorAll('.lightbox').forEach(lb => {
    lb.addEventListener('click', (e) => {
        if (e.target === lb) {
            window.location.hash = '#';
        }
    });
});
