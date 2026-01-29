// Kozan Emre – Website ist live.
console.log("Kozan Emre – Website ist live. ✅");

// Hamburger Menu Funktion
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Hamburger Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Mark active page in navigation
  function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
      const linkPage = link.getAttribute('href');
      
      // Remove active class from all links
      link.classList.remove('active');
      
      // Set active class for current page
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
      
      // Special case for index.html
      if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
        link.classList.add('active');
      }
    });
  }
  
  // Initialize active nav item
  setActiveNavItem();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle anchor links, not external links
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          // Close mobile menu if open
          if (menuToggle && navLinks && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
          }
          
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Add animation classes on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.animated)');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('animated');
      }
    });
  }
  
  // Initial animation check
  animateOnScroll();
  
  // Check animations on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .pricing-card, .nav-links a');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
      });
    });
  });
});