let currentIndex = 0;
let autoSlideInterval;
const slideWidth = 100 / document.querySelectorAll('.carousel-images img').length; // Ancho dinámico de cada imagen en porcentaje
const carouselImages = document.querySelector('.carousel-images');
const dots = document.querySelectorAll('.carousel-dots .dot');

function moveToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * slideWidth;
    carouselImages.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoSlide();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        moveToSlide(currentIndex);
    }, 6000); // cada n segundos
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function toggleMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.menu-btn');
    navContainer.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function initCarousel() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    startAutoSlide();
}

initCarousel();
