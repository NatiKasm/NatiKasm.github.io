// SPA navigation: Show one section at a time
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a, .nav-btn');
  const sections = document.querySelectorAll('.page-section');

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
    // Set nav active
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('data-page') === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + id);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const id = link.getAttribute('data-page');
      if (id) {
        e.preventDefault();
        showSection(id);
        // If mobile nav open, close it
        document.querySelector('.nav-links').classList.remove('open');
      }
    });
  });

  // Mobile nav toggle
  document.getElementById('navToggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // On page load: check hash
  const urlHash = window.location.hash.replace('#', '');
  if (urlHash && document.getElementById(urlHash)) {
    showSection(urlHash);
  } else {
    showSection('hero');
  }
});
