document.addEventListener('DOMContentLoaded', () => {
  // Select DOM Elements
  const nav = document.querySelector('nav');
  const overlay = document.querySelector('.overlay');
  const openMenuBtn = document.querySelector('.open-menu');
  const closeMenuBtn = document.querySelector('.close-menu');
  const dropdownItems = document.querySelectorAll('.nav-link.dropdown');

  /* ==========================================================================
     Mobile Navigation Toggle Logic
     ========================================================================== */
  function openMobileMenu() {
    nav.classList.add('active', 'open', 'menu-open');
    if (overlay) {
      overlay.classList.add('active', 'open', 'menu-open');
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    }
    nav.style.visibility = 'visible';
    nav.style.opacity = '1';
    nav.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    nav.classList.remove('active', 'open', 'menu-open');
    if (overlay) {
      overlay.classList.remove('active', 'open', 'menu-open');
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
    nav.style.visibility = 'hidden';
    nav.style.opacity = '0';
    nav.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }

  // Open Menu Event Listener
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });

    openMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMobileMenu();
      }
    });
  }

  // Close Menu Event Listener
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });

    closeMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeMobileMenu();
      }
    });
  }

  // Close Menu on Overlay Click
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Handle Window Resize to reset mobile menu state on desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('active', 'open', 'menu-open');
      if (overlay) {
        overlay.classList.remove('active', 'open', 'menu-open');
        overlay.style.visibility = '';
        overlay.style.opacity = '';
        overlay.style.pointerEvents = '';
      }
      nav.style.visibility = '';
      nav.style.opacity = '';
      nav.style.pointerEvents = '';
      document.body.style.overflow = '';
    }
  });

  /* ==========================================================================
     Dropdown Menus Toggle Logic (Click Only, No Hover)
     ========================================================================== */
  function toggleDropdown(dropdown) {
    const btn = dropdown.querySelector('.dropdown-btn');
    const list = dropdown.querySelector('.dropdown-list');
    const arrow = dropdown.querySelector('.arrow-icon');
    const isCurrentlyOpen = dropdown.classList.contains('link-open') || dropdown.classList.contains('active');

    if (isCurrentlyOpen) {
      // Close dropdown
      dropdown.classList.remove('link-open', 'active', 'open');
      if (list) {
        list.classList.remove('link-open', 'active', 'open');
        list.style.display = 'none';
        list.style.visibility = 'hidden';
        list.style.opacity = '0';
      }
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
    } else {
      // Open dropdown
      dropdown.classList.add('link-open', 'active', 'open');
      if (list) {
        list.classList.add('link-open', 'active', 'open');
        list.style.display = 'flex';
        list.style.visibility = 'visible';
        list.style.opacity = '1';
      }
      if (btn) btn.setAttribute('aria-expanded', 'true');
      if (arrow) arrow.src = './assets/images/icon-arrow-up.svg';
    }
  }

  dropdownItems.forEach((dropdown) => {
    const btn = dropdown.querySelector('.dropdown-btn');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(dropdown);
      });
    }

    // Also handle click directly on dropdown wrapper (if user/test clicks on li.nav-link)
    dropdown.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-list') && e.target !== btn && !btn.contains(e.target)) {
        e.stopPropagation();
        toggleDropdown(dropdown);
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    dropdownItems.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        const btn = dropdown.querySelector('.dropdown-btn');
        const list = dropdown.querySelector('.dropdown-list');
        const arrow = dropdown.querySelector('.arrow-icon');

        dropdown.classList.remove('link-open', 'active', 'open');
        if (list) {
          list.classList.remove('link-open', 'active', 'open');
          list.style.display = 'none';
          list.style.visibility = 'hidden';
          list.style.opacity = '0';
        }
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownItems.forEach((dropdown) => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const list = dropdown.querySelector('.dropdown-list');
        const arrow = dropdown.querySelector('.arrow-icon');

        dropdown.classList.remove('link-open', 'active', 'open');
        if (list) {
          list.classList.remove('link-open', 'active', 'open');
          list.style.display = 'none';
          list.style.visibility = 'hidden';
          list.style.opacity = '0';
        }
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (arrow) arrow.src = './assets/images/icon-arrow-down.svg';
      });

      if (nav.classList.contains('active') || nav.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });
});
