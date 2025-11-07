// Slide navigation state
let currentSlideIndex = 1;
const totalSlides = 5;

// Initialize presentation
function initPresentation() {
  // Ensure first slide is active
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  updateSlideCounter();
  updateNavigationButtons();
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyPress);
  
  console.log('Presentation initialized: ' + totalSlides + ' slides (condensed version)');
}

// Navigate between slides
function navigateSlide(direction) {
  const slides = document.querySelectorAll('.slide');
  
  // Remove active class from current slide
  slides[currentSlideIndex - 1].classList.remove('active');
  
  // Update index
  currentSlideIndex += direction;
  
  // Ensure we stay within bounds
  if (currentSlideIndex < 1) currentSlideIndex = 1;
  if (currentSlideIndex > totalSlides) currentSlideIndex = totalSlides;
  
  // Add active class to new slide
  slides[currentSlideIndex - 1].classList.add('active');
  
  // Update UI
  updateSlideCounter();
  updateNavigationButtons();
  
  // Scroll to top of slide
  slides[currentSlideIndex - 1].scrollTop = 0;
}

// Update slide counter display
function updateSlideCounter() {
  document.getElementById('currentSlide').textContent = currentSlideIndex;
  document.getElementById('totalSlides').textContent = totalSlides;
}

// Update navigation button states
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Disable previous button on first slide
  prevBtn.disabled = currentSlideIndex === 1;
  
  // Disable next button on last slide
  nextBtn.disabled = currentSlideIndex === totalSlides;
}

// Handle keyboard navigation
function handleKeyPress(event) {
  switch(event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      if (currentSlideIndex > 1) {
        navigateSlide(-1);
      }
      break;
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
      if (currentSlideIndex < totalSlides) {
        navigateSlide(1);
      }
      break;
    case 'Home':
      if (currentSlideIndex !== 1) {
        const slides = document.querySelectorAll('.slide');
        slides[currentSlideIndex - 1].classList.remove('active');
        currentSlideIndex = 1;
        slides[0].classList.add('active');
        updateSlideCounter();
        updateNavigationButtons();
      }
      break;
    case 'End':
      if (currentSlideIndex !== totalSlides) {
        const slides = document.querySelectorAll('.slide');
        slides[currentSlideIndex - 1].classList.remove('active');
        currentSlideIndex = totalSlides;
        slides[totalSlides - 1].classList.add('active');
        updateSlideCounter();
        updateNavigationButtons();
      }
      break;
  }
}

// Print functionality
function printPresentation() {
  window.print();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPresentation);
} else {
  initPresentation();
}