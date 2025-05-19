// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    htmlRoot.classList.add('dark-theme');
    htmlRoot.classList.remove('system-theme');
  } else if (savedTheme === 'light') {
    htmlRoot.classList.remove('dark-theme', 'system-theme');
  } else {
    // If no saved preference, use system preference
    htmlRoot.classList.add('system-theme');
    
    // Check if system preference is dark
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // System prefers dark mode
      themeToggle.querySelector('.fa-sun').style.display = 'block';
      themeToggle.querySelector('.fa-moon').style.display = 'none';
    }
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    if (htmlRoot.classList.contains('dark-theme') || 
        (htmlRoot.classList.contains('system-theme') && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      // Switch to light theme
      htmlRoot.classList.remove('dark-theme', 'system-theme');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark theme
      htmlRoot.classList.add('dark-theme');
      htmlRoot.classList.remove('system-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      // Only update if user hasn't set a preference
      htmlRoot.classList.add('system-theme');
    }
  });
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For demonstration, we'll just show an alert
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      
      // Reset the form
      contactForm.reset();
    });
  }
  
  // Add active class to nav links on scroll
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});