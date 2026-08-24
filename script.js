// Force page to start at top on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu Logic
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('nav a');

  const toggleMenu = () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update Accessibility state
    hamburger.setAttribute('aria-expanded', isActive);

    // Lock background page scroll when drawer is active
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Auto-close overlay drawer on option select
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Automatic Image Carousel Loop
  const slides = document.querySelectorAll('.typing-slide-img');
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000);
  }
});
// Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const headingElement = document.querySelector(".typing-heading");
  const cursorElement = document.querySelector(".typing-cursor");

  // You can add multiple phrases to loop through, or keep just one
  const phrases = ["डिजिटल क्राफ्ट", "डिजिटल अनुभव"]; 
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Timing configurations (in milliseconds)
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseEnd = 1800;   // Pause when phrase completes
  const pauseStart = 400;   // Pause before typing next phrase

  function loopTyping() {
    const currentPhrase = Array.from(phrases[phraseIndex]);

    // Build the current string slice
    const visibleText = currentPhrase.slice(0, charIndex).join("");

    // Render text while preserving the cursor element
    headingElement.textContent = visibleText;
    headingElement.appendChild(cursorElement);

    let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Finished typing: pause at the end, then start deleting
      nextDelay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting: pause briefly, then move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      nextDelay = pauseStart;
    } else {
      // Increment or decrement character index
      charIndex += isDeleting ? -1 : 1;
    }

    setTimeout(loopTyping, nextDelay);
  }

  loopTyping();
});
// Active Card Switching on Hover
const serviceCards = document.querySelectorAll('.service-card');
const defaultCard = document.querySelector('.service-card[data-default="true"]');

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Remove active class from all cards
    serviceCards.forEach(c => c.classList.remove('active'));
    // Set hovered card as active
    card.classList.add('active');
  });
});

// Optional: Reset active class back to default card when leaving grid container
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid && defaultCard) {
  servicesGrid.addEventListener('mouseleave', () => {
    serviceCards.forEach(c => c.classList.remove('active'));
    defaultCard.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    // Triggers when the top of the element is 15% above the bottom edge of the screen
    rootMargin: '0px 0px -15% 0px',
    threshold: 0
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
});

// FAQ Accordion Script
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const button = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
