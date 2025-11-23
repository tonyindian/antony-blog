/**
 * Mobile Menu Toggle
 * Modern implementation with Accessibility & UX Best Practices (November 2025)
 *
 * Features:
 * - ARIA attributes for screen readers
 * - Keyboard navigation (Escape to close, Tab for focus trap)
 * - Focus management
 * - Scroll lock when menu is open
 * - Click outside to close
 */

(function() {
  'use strict';

  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('#mobile-nav');
  const navLinks = nav?.querySelectorAll('a');

  if (!menuToggle || !nav) return;

  let isOpen = false;
  let focusedElementBeforeOpen = null;

  /**
   * Toggle menu open/closed
   */
  function toggleMenu() {
    isOpen = !isOpen;

    // Update ARIA attributes
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

    if (isOpen) {
      // Store currently focused element
      focusedElementBeforeOpen = document.activeElement;

      // Focus first nav link after animation
      setTimeout(() => {
        navLinks[0]?.focus();
      }, 100);
    } else {
      // Return focus to toggle button
      focusedElementBeforeOpen?.focus();
    }
  }

  /**
   * Close menu
   */
  function closeMenu() {
    if (!isOpen) return;
    toggleMenu();
  }

  /**
   * Handle keyboard navigation
   */
  function handleKeydown(e) {
    if (!isOpen) return;

    // Close on Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    // Focus trap: Keep focus within menu
    if (e.key === 'Tab') {
      const firstLink = navLinks[0];
      const lastLink = navLinks[navLinks.length - 1];

      if (e.shiftKey && document.activeElement === firstLink) {
        e.preventDefault();
        menuToggle.focus();
      } else if (!e.shiftKey && document.activeElement === menuToggle) {
        e.preventDefault();
        firstLink.focus();
      } else if (!e.shiftKey && document.activeElement === lastLink) {
        e.preventDefault();
        menuToggle.focus();
      }
    }
  }

  /**
   * Close menu when clicking outside
   */
  function handleClickOutside(e) {
    if (!isOpen) return;

    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  }

  /**
   * Close menu when clicking a navigation link
   */
  function handleNavLinkClick() {
    // Small delay to allow navigation to start
    setTimeout(closeMenu, 100);
  }

  /**
   * Close menu on window resize to desktop
   */
  function handleResize() {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  }

  // Event Listeners
  menuToggle.addEventListener('click', toggleMenu);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
  });

  // Prevent iOS Safari from bouncing when menu is open
  if ('ontouchstart' in window) {
    nav.addEventListener('touchmove', (e) => {
      if (isOpen) {
        e.preventDefault();
      }
    }, { passive: false });
  }

})();
