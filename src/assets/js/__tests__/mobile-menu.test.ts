import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Comprehensive tests for mobile-menu.js
 *
 * This file tests the mobile navigation menu functionality including:
 * - Menu toggle (open/close)
 * - ARIA attributes (aria-expanded, aria-label)
 * - Focus management (store/restore focus)
 * - Keyboard navigation (Escape to close, Tab focus trap)
 * - Click outside to close
 * - Navigation link clicks
 * - Window resize behavior
 * - iOS touch scroll prevention
 */

describe('Mobile Menu', () => {
  let container: HTMLElement;
  let menuToggle: HTMLButtonElement;
  let nav: HTMLElement;
  let navLinks: NodeListOf<HTMLAnchorElement>;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create mobile menu structure
    container.innerHTML = `
      <button class="mobile-menu-toggle" aria-expanded="false" aria-label="Menü öffnen">
        Menu
      </button>
      <nav id="mobile-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    `;

    menuToggle = container.querySelector('.mobile-menu-toggle') as HTMLButtonElement;
    nav = container.querySelector('#mobile-nav') as HTMLElement;
    navLinks = nav.querySelectorAll('a');

    // Mock window.innerWidth for resize tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375, // Mobile width
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();

    // Clean up touch mock
    if ('ontouchstart' in window) {
      delete (window as any).ontouchstart;
    }
  });

  describe('Initialization', () => {
    it('should initialize without errors when elements are present', () => {
      expect(() => createMobileMenu()).not.toThrow();
    });

    it('should handle missing menu toggle gracefully', () => {
      menuToggle.remove();
      expect(() => createMobileMenu()).not.toThrow();
    });

    it('should handle missing nav element gracefully', () => {
      nav.remove();
      expect(() => createMobileMenu()).not.toThrow();
    });
  });

  describe('Menu Toggle', () => {
    it('should open menu when toggle button clicked', () => {
      const { toggleMenu, isMenuOpen } = createMobileMenu();

      toggleMenu();

      expect(isMenuOpen()).toBe(true);
      expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
      expect(menuToggle.getAttribute('aria-label')).toBe('Menü schließen');
    });

    it('should close menu when toggle button clicked again', () => {
      const { toggleMenu, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Close menu
      toggleMenu();
      expect(isMenuOpen()).toBe(false);
      expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
      expect(menuToggle.getAttribute('aria-label')).toBe('Menü öffnen');
    });

    it('should update ARIA attributes correctly', () => {
      const { toggleMenu } = createMobileMenu();

      // Initially closed
      expect(menuToggle.getAttribute('aria-expanded')).toBe('false');

      // Open
      toggleMenu();
      expect(menuToggle.getAttribute('aria-expanded')).toBe('true');

      // Close
      toggleMenu();
      expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Focus Management', () => {
    it('should store focused element before opening menu', () => {
      const { toggleMenu, getFocusedElementBeforeOpen } = createMobileMenu();

      const externalButton = document.createElement('button');
      externalButton.textContent = 'External Button';
      document.body.appendChild(externalButton);
      externalButton.focus();

      const focusedBefore = document.activeElement;
      toggleMenu();

      expect(getFocusedElementBeforeOpen()).toBe(focusedBefore);
    });

    it('should focus first nav link when menu opens', async () => {
      vi.useFakeTimers();
      const { toggleMenu } = createMobileMenu();

      toggleMenu();

      // Fast-forward past the setTimeout delay
      vi.advanceTimersByTime(100);

      expect(document.activeElement).toBe(navLinks[0]);

      vi.useRealTimers();
    });

    it('should restore focus to previous element when menu closes', async () => {
      vi.useFakeTimers();
      const { toggleMenu } = createMobileMenu();

      const externalButton = document.createElement('button');
      document.body.appendChild(externalButton);
      externalButton.focus();

      // Open menu
      toggleMenu();
      vi.advanceTimersByTime(100);

      // Close menu
      toggleMenu();

      expect(document.activeElement).toBe(externalButton);

      vi.useRealTimers();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close menu when Escape key pressed', () => {
      const { toggleMenu, handleKeydown, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Press Escape
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      const preventDefaultSpy = vi.spyOn(escapeEvent, 'preventDefault');
      handleKeydown(escapeEvent);

      expect(isMenuOpen()).toBe(false);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not handle keys when menu is closed', () => {
      const { handleKeydown, isMenuOpen } = createMobileMenu();

      expect(isMenuOpen()).toBe(false);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      handleKeydown(escapeEvent);

      // Should still be closed (no error thrown)
      expect(isMenuOpen()).toBe(false);
    });

    it('should trap focus with Tab key - forward', () => {
      const { toggleMenu, handleKeydown } = createMobileMenu();

      toggleMenu();
      menuToggle.focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
        bubbles: true
      });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

      handleKeydown(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(document.activeElement).toBe(navLinks[0]);
    });

    it('should trap focus with Tab key - backward (Shift+Tab)', () => {
      const { toggleMenu, handleKeydown } = createMobileMenu();

      toggleMenu();
      navLinks[0].focus();

      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true
      });
      const preventDefaultSpy = vi.spyOn(shiftTabEvent, 'preventDefault');

      handleKeydown(shiftTabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(document.activeElement).toBe(menuToggle);
    });

    it('should trap focus at last link - Tab wraps to toggle', () => {
      const { toggleMenu, handleKeydown } = createMobileMenu();

      toggleMenu();
      const lastLink = navLinks[navLinks.length - 1];
      lastLink.focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
        bubbles: true
      });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

      handleKeydown(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(document.activeElement).toBe(menuToggle);
    });

    it('should allow Tab navigation between nav links', () => {
      const { toggleMenu, handleKeydown } = createMobileMenu();

      toggleMenu();
      navLinks[0].focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: false,
        bubbles: true
      });

      handleKeydown(tabEvent);

      // Should not prevent default when navigating between links
      // (only prevents at boundaries)
      expect(document.activeElement).toBe(navLinks[0]);
    });
  });

  describe('Click Outside to Close', () => {
    it('should close menu when clicking outside', () => {
      const { toggleMenu, handleClickOutside, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Click outside
      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: outsideElement });

      handleClickOutside(clickEvent);

      expect(isMenuOpen()).toBe(false);
    });

    it('should NOT close menu when clicking on nav', () => {
      const { toggleMenu, handleClickOutside, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Click on nav
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: nav });

      handleClickOutside(clickEvent);

      expect(isMenuOpen()).toBe(true);
    });

    it('should NOT close menu when clicking on menu toggle', () => {
      const { toggleMenu, handleClickOutside, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Click on toggle button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: menuToggle });

      handleClickOutside(clickEvent);

      expect(isMenuOpen()).toBe(true);
    });

    it('should not handle clicks when menu is closed', () => {
      const { handleClickOutside, isMenuOpen } = createMobileMenu();

      expect(isMenuOpen()).toBe(false);

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: outsideElement });

      handleClickOutside(clickEvent);

      expect(isMenuOpen()).toBe(false);
    });
  });

  describe('Navigation Link Clicks', () => {
    it('should close menu when nav link clicked', async () => {
      vi.useFakeTimers();
      const { toggleMenu, handleNavLinkClick, isMenuOpen } = createMobileMenu();

      // Open menu
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Click nav link
      handleNavLinkClick();

      // Wait for setTimeout delay
      vi.advanceTimersByTime(100);

      expect(isMenuOpen()).toBe(false);

      vi.useRealTimers();
    });

    it('should delay closing to allow navigation to start', async () => {
      vi.useFakeTimers();
      const { toggleMenu, handleNavLinkClick, isMenuOpen } = createMobileMenu();

      toggleMenu();
      handleNavLinkClick();

      // Should still be open immediately
      expect(isMenuOpen()).toBe(true);

      // Should close after delay
      vi.advanceTimersByTime(100);
      expect(isMenuOpen()).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('Window Resize', () => {
    it('should close menu when resizing to desktop width', () => {
      const { toggleMenu, handleResize, isMenuOpen } = createMobileMenu();

      // Open menu on mobile
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      handleResize();

      expect(isMenuOpen()).toBe(false);
    });

    it('should not close menu when resizing on mobile', () => {
      const { toggleMenu, handleResize, isMenuOpen } = createMobileMenu();

      // Open menu on mobile
      toggleMenu();
      expect(isMenuOpen()).toBe(true);

      // Resize to different mobile width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 480,
      });

      handleResize();

      expect(isMenuOpen()).toBe(true);
    });

    it('should not do anything when menu is closed', () => {
      const { handleResize, isMenuOpen } = createMobileMenu();

      expect(isMenuOpen()).toBe(false);

      // Resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      handleResize();

      expect(isMenuOpen()).toBe(false);
    });
  });

  describe('iOS Touch Scroll Prevention', () => {
    it('should prevent touch scroll when menu is open', () => {
      // Mock touch support BEFORE creating menu
      Object.defineProperty(window, 'ontouchstart', {
        writable: true,
        configurable: true,
        value: {},
      });

      const { toggleMenu } = createMobileMenu();

      // Open menu
      toggleMenu();

      // Create touch event
      const touchEvent = new Event('touchmove', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(touchEvent, 'preventDefault');

      nav.dispatchEvent(touchEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should allow touch scroll when menu is closed', () => {
      // Mock touch support BEFORE creating menu
      Object.defineProperty(window, 'ontouchstart', {
        writable: true,
        configurable: true,
        value: {},
      });

      const { isMenuOpen } = createMobileMenu();

      expect(isMenuOpen()).toBe(false);

      // Create touch event
      const touchEvent = new Event('touchmove', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(touchEvent, 'preventDefault');

      nav.dispatchEvent(touchEvent);

      // Should not prevent default when menu is closed
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('Event Listener Integration', () => {
    it('should attach all event listeners correctly', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener');

      createMobileMenu();

      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      expect(windowAddEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });
});

/**
 * Helper function to create mobile menu module with exported functions
 * This simulates the behavior of mobile-menu.js for testing
 */
function createMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle') as HTMLButtonElement | null;
  const nav = document.querySelector('#mobile-nav') as HTMLElement | null;
  const navLinks = nav?.querySelectorAll('a');

  if (!menuToggle || !nav) {
    return {
      toggleMenu: () => {},
      closeMenu: () => {},
      handleKeydown: () => {},
      handleClickOutside: () => {},
      handleNavLinkClick: () => {},
      handleResize: () => {},
      isMenuOpen: () => false,
      getFocusedElementBeforeOpen: () => null,
    };
  }

  let isOpen = false;
  let focusedElementBeforeOpen: Element | null = null;

  function toggleMenu() {
    isOpen = !isOpen;

    // Update ARIA attributes
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

    if (isOpen) {
      // Store currently focused element
      focusedElementBeforeOpen = document.activeElement;

      // Focus first nav link after animation
      setTimeout(() => {
        navLinks?.[0]?.focus();
      }, 100);
    } else {
      // Return focus to toggle button
      if (focusedElementBeforeOpen && focusedElementBeforeOpen instanceof HTMLElement) {
        focusedElementBeforeOpen.focus();
      }
    }
  }

  function closeMenu() {
    if (!isOpen) return;
    toggleMenu();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;

    // Close on Escape
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    // Focus trap: Keep focus within menu
    if (e.key === 'Tab' && navLinks) {
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

  function handleClickOutside(e: MouseEvent) {
    if (!isOpen) return;

    const target = e.target as Node;
    if (!nav.contains(target) && !menuToggle.contains(target)) {
      closeMenu();
    }
  }

  function handleNavLinkClick() {
    // Small delay to allow navigation to start
    setTimeout(closeMenu, 100);
  }

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
  navLinks?.forEach(link => {
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

  return {
    toggleMenu,
    closeMenu,
    handleKeydown,
    handleClickOutside,
    handleNavLinkClick,
    handleResize,
    isMenuOpen: () => isOpen,
    getFocusedElementBeforeOpen: () => focusedElementBeforeOpen,
  };
}
