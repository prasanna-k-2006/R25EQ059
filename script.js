document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when window resized above 768px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
