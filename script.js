// Slider Variables
let sliderContainer = document.querySelector('.slider-container');
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

let autoSlide = true;

let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');

let dots = document.querySelectorAll('.dot');


// Function to show the current slide
function showSlide(index) {
    sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
}

// Automatic slide transition
let sliding;
function startAutoSlide() {
    sliding = setInterval(() => {
        nextSlide();
    }, 3000);
}
// Next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function stopAutoSlide() {
    clearInterval(sliding);
}
// Add event listeners for buttons
prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    if (autoSlide) startAutoSlide();
});

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    if (autoSlide) startAutoSlide();
});

// Add event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        stopAutoSlide();
        let slideDots = parseInt(e.target.dataset.slide);
        showSlide(slideDots);
        if (autoSlide) startAutoSlide();
    });
});

// Stop automatic sliding on hover
let slider = document.querySelector('.slider')
slider.addEventListener('mouseover', stopAutoSlide);
slider.addEventListener('mouseout', () => {
    if (autoSlide) startAutoSlide();
});


showSlide(0);
startAutoSlide();

// Swipping for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        prevSlide();
    }
}
