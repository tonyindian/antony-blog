/**
 * Design System Tokens
 *
 * Validated color contrasts (WCAG):
 * - accent.DEFAULT + paper.white: 10.40 (AAA ✓)
 * - accent.DEFAULT + paper.DEFAULT: 9.44 (AAA ✓)
 * - warm.DEFAULT: Only for decorative use (borders, backgrounds)
 */

export const COLORS = {
  ink: {
    DEFAULT: '#1A1A1A',
    black: '#111111',
    secondary: '#444444',
    muted: '#666666',
  },
  paper: {
    DEFAULT: '#F3F2EE',
    white: '#FEFDFB',
  },
  accent: {
    DEFAULT: '#2C4435',    // Sage green - primary brand color
    hover: '#1F3327',      // Darker sage green for hover states
    light: '#4E6E5A',      // Lighter sage for subtle accents
  },
  warm: {
    DEFAULT: '#8B7355',    // Warm brown - DECORATIVE ONLY (borders, backgrounds)
  },
  hairline: {
    DEFAULT: '#CCCCCC',
  },
} as const;

/**
 * Modern Color Spaces (2025 Best Practice)
 *
 * Oklch provides:
 * - Perceptually uniform colors
 * - Better gradients and color mixing
 * - Wider color gamut support (Display P3)
 * - Consistent lightness across hues
 *
 * Browser support: Excellent in 2025 (Chrome 111+, Firefox 113+, Safari 16.4+)
 * Fallback: Hex colors above serve as fallback for older browsers
 *
 * Reference: https://www.frontendtools.tech/blog/modern-web-typography-techniques-2025-readability-guide
 */
export const COLORS_OKLCH = {
  ink: {
    DEFAULT: 'oklch(0.153 0.005 270)',       // #1A1A1A in Oklch
    black: 'oklch(0.113 0.005 270)',         // #111111 in Oklch
    secondary: 'oklch(0.307 0.005 270)',     // #444444 in Oklch
    muted: 'oklch(0.461 0.005 270)',         // #666666 in Oklch
  },
  paper: {
    DEFAULT: 'oklch(0.956 0.008 85)',        // #F3F2EE in Oklch
    white: 'oklch(0.993 0.004 85)',          // #FEFDFB in Oklch
  },
  accent: {
    DEFAULT: 'oklch(0.312 0.052 160)',       // #2C4435 sage green in Oklch
    hover: 'oklch(0.245 0.052 160)',         // #1F3327 darker sage in Oklch
    light: 'oklch(0.482 0.052 160)',         // #4E6E5A lighter sage in Oklch
  },
  warm: {
    DEFAULT: 'oklch(0.552 0.040 55)',        // #8B7355 warm brown in Oklch
  },
  hairline: {
    DEFAULT: 'oklch(0.839 0 0)',             // #CCCCCC in Oklch
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    serif: ['Literata', 'Charter', 'Georgia', 'Times New Roman', 'serif'],
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '15px',
    md: '17px',
    lg: '18px',
    xl: '21px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  lineHeight: {
    xs: '18px',
    sm: '21px',
    base: '24px',
    md: '28px',
    lg: '28px',
    xl: '32px',
    body: 1.647,
    tight: 1.1,
    relaxed: 1.7,
  },
  letterSpacing: {
    xs: '0.08em',
    sm: '0.02em',
    base: '0.01em',
    md: '-0.01em',
    lg: '-0.011em',
    xl: '-0.022em',
    wide: '0.05em',
    wider: '0.12em',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontFeatures: {
    kern: "'kern' 1",
    ligatures: "'liga' 1",
    contextual: "'calt' 1",
  },
} as const;

export const SPACING = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const SIZES = {
  MAX_CONTENT_WIDTH: 1200,
  MAX_ARTICLE_WIDTH: 840,
  MAX_TEXT_WIDTH: 720,
  HEADER_HEIGHT: 60,
} as const;

export const BORDER_RADIUS = {
  none: '0px',
  sm: '4px',
  DEFAULT: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

export const TRANSITIONS = {
  duration: {
    fast: '120ms',
    normal: '200ms',
    slow: '250ms',
    slower: '300ms',
  },
  timing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export const ANIMATIONS = {
  slideUp: {
    name: 'slide-up',
    duration: '250ms',
    timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    keyframes: {
      '0%': { transform: 'translateY(100%)' },
      '100%': { transform: 'translateY(0)' },
    },
  },
  slideDown: {
    name: 'slide-down',
    duration: '120ms',
    timing: 'ease-in',
    keyframes: {
      '0%': { opacity: '1', transform: 'translate(-50%, 0)' },
      '100%': { opacity: '0', transform: 'translate(-50%, 10px)' },
    },
  },
  fadeIn: {
    name: 'fade-in',
    duration: '120ms',
    timing: 'ease-out',
    keyframes: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
  },
  scaleIn: {
    name: 'scale-in',
    duration: '150ms',
    timing: 'ease-out',
    keyframes: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
  },
} as const;

export const BREAKPOINTS = {
  xs: '400px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  header: 100,
  overlay: 200,
} as const;

export const OPACITY = {
  disabled: 0.4,
  hover: 0.7,
  muted: 0.5,
  subtle: 0.02,
  subtleBorder: 0.05,
  placeholder: 0.4,
  overlay: 0.1,
  semiTransparent: 0.95,
} as const;

export const LAYOUT = {
  header: {
    height: 60,
    padding: {
      mobile: '1rem',
      tablet: '1.2rem 2.4rem',
      desktop: '1.4rem 3rem',
    },
  },
  section: {
    paddingY: {
      mobile: 'clamp(40px, 8vh, 80px)',
      desktop: 'clamp(60px, 12vh, 120px)',
    },
    paddingX: 'clamp(20px, 5vw, 80px)',
  },
  container: {
    maxWidth: SIZES.MAX_CONTENT_WIDTH,
    padding: 'clamp(20px, 5vw, 80px)',
  },
} as const;

// Alpha (transparency) variants for colors
// Standardized naming: all use numeric keys for consistency (2025 best practice)
export const ALPHA = {
  accent: {
    98: 'rgba(44, 68, 53, 0.98)',    // #2C4435 sage green at 98% opacity
    95: 'rgba(44, 68, 53, 0.95)',    // #2C4435 sage green at 95% opacity
    60: 'rgba(44, 68, 53, 0.6)',     // #2C4435 sage green at 60% opacity
    50: 'rgba(44, 68, 53, 0.5)',     // #2C4435 sage green at 50% opacity
    35: 'rgba(44, 68, 53, 0.35)',    // #2C4435 sage green at 35% opacity
    30: 'rgba(44, 68, 53, 0.3)',     // #2C4435 sage green at 30% opacity
    14: 'rgba(44, 68, 53, 0.14)',    // #2C4435 sage green at 14% opacity
    10: 'rgba(44, 68, 53, 0.1)',     // #2C4435 sage green at 10% opacity
    8: 'rgba(44, 68, 53, 0.08)',     // #2C4435 sage green at 8% opacity
    6: 'rgba(44, 68, 53, 0.06)',     // #2C4435 sage green at 6% opacity
    5: 'rgba(44, 68, 53, 0.05)',     // #2C4435 sage green at 5% opacity
  },
  warm: {
    30: 'rgba(139, 115, 85, 0.3)',   // #8B7355 at 30% opacity
    20: 'rgba(139, 115, 85, 0.2)',   // #8B7355 at 20% opacity
    8: 'rgba(139, 115, 85, 0.08)',   // #8B7355 at 8% opacity
    3: 'rgba(139, 115, 85, 0.03)',   // #8B7355 at 3% opacity
  },
  paper: {
    white: {
      100: 'rgba(254, 253, 251, 1)',      // #FEFDFB at 100%
      80: 'rgba(254, 253, 251, 0.8)',   // #FEFDFB at 80% opacity
      60: 'rgba(254, 253, 251, 0.6)',   // #FEFDFB at 60% opacity
      10: 'rgba(254, 253, 251, 0.1)',   // #FEFDFB at 10% opacity
    },
    default: {
      98: 'rgba(243, 242, 238, 0.98)', // #F3F2EE at 98% opacity
    },
  },
  white: {
    100: 'rgba(255, 255, 255, 1)',    // Pure white at 100%
    80: 'rgba(255, 255, 255, 0.8)',   // Pure white at 80% opacity
    60: 'rgba(255, 255, 255, 0.6)',   // Pure white at 60% opacity
    40: 'rgba(255, 255, 255, 0.4)',   // Pure white at 40% opacity
  },
} as const;

export const COMPONENT_STYLES = {
  button: {
    primary: {
      bg: COLORS.accent.DEFAULT,
      bgHover: COLORS.accent.hover,
      bgDisabled: `${COLORS.accent.DEFAULT}66`,
      text: COLORS.paper.white,
      padding: '1rem 2.5rem',
      borderRadius: BORDER_RADIUS.DEFAULT,
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.timing.easeInOut}`,
    },
    secondary: {
      bg: 'transparent',
      bgHover: COLORS.paper.DEFAULT,
      border: COLORS.hairline.DEFAULT,
      text: COLORS.ink.secondary,
      padding: '0.75rem 1.75rem',
      borderRadius: BORDER_RADIUS.full,
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.timing.easeInOut}`,
    },
  },
  input: {
    text: {
      bg: ALPHA.white[80],
      border: `1px solid ${ALPHA.warm[20]}`,
      borderFocus: COLORS.accent.DEFAULT,
      text: COLORS.ink.DEFAULT,
      placeholder: `${COLORS.ink.muted}66`,
      padding: '0.875rem 1rem',
      fontSize: TYPOGRAPHY.fontSize.base,
      lineHeight: TYPOGRAPHY.lineHeight.base,
      borderRadius: BORDER_RADIUS.DEFAULT,
      transition: `all ${TRANSITIONS.duration.normal} ${TRANSITIONS.timing.easeInOut}`,
    },
  },
  card: {
    bg: ALPHA.white[60],
    border: `1px solid ${ALPHA.warm[30]}`,
    borderRadius: BORDER_RADIUS.lg,
    padding: '2rem',
    shadow: SHADOWS.md,
    transition: `all ${TRANSITIONS.duration.slower} ${TRANSITIONS.timing.easeInOut}`,
    hover: {
      transform: 'translateY(-4px)',
      shadow: SHADOWS.xl,
      borderColor: COLORS.accent.DEFAULT,
    },
  },
  header: {
    bg: COLORS.accent.DEFAULT,
    bgBlur: ALPHA.accent[95],
    border: `1px solid ${ALPHA.accent[14]}`,
    text: COLORS.paper.white,
    shadow: 'none',
    backdropFilter: 'blur(10px)',
    zIndex: Z_INDEX.header,
  },
} as const;

export const ACCESSIBILITY = {
  touchTarget: {
    min: 44,
    mobile: 48,
  },
  focusRing: {
    width: '2px',
    color: COLORS.accent.DEFAULT,
    offset: '2px',
    style: `2px solid ${COLORS.accent.DEFAULT}`,
  },
  contrast: {
    minAA: 4.5,
    minAAA: 7,
  },
} as const;

export const MOTION = {
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  hover: '@media (hover: hover) and (pointer: fine)',
  touch: '@media (hover: none) and (pointer: coarse)',
} as const;

/**
 * Theme Support (2025 Best Practice)
 *
 * Provides light and dark theme configurations using semantic tokens.
 * Themes override base colors while maintaining the design system structure.
 *
 * Usage:
 * <html data-theme="light"> or <html data-theme="dark">
 * Or use: @media (prefers-color-scheme: dark)
 */
export const THEMES = {
  light: {
    text: {
      primary: COLORS.ink.DEFAULT,
      secondary: COLORS.ink.secondary,
      muted: COLORS.ink.muted,
      inverse: COLORS.paper.white,
    },
    bg: {
      primary: COLORS.paper.DEFAULT,
      secondary: COLORS.paper.white,
      inverse: COLORS.ink.DEFAULT,
    },
    accent: {
      primary: COLORS.accent.DEFAULT,
      hover: COLORS.accent.hover,
      light: COLORS.accent.light,
    },
    border: {
      subtle: ALPHA.warm[20],
      default: ALPHA.warm[30],
      emphasis: COLORS.accent.DEFAULT,
    },
  },
  dark: {
    text: {
      primary: COLORS.paper.white,
      secondary: ALPHA.paper.white[80],
      muted: ALPHA.paper.white[60],
      inverse: COLORS.ink.DEFAULT,
    },
    bg: {
      primary: COLORS.ink.DEFAULT,
      secondary: COLORS.ink.secondary,
      inverse: COLORS.paper.white,
    },
    accent: {
      primary: COLORS.accent.light,      // Lighter sage works better on dark bg
      hover: COLORS.accent.DEFAULT,
      light: COLORS.accent.light,
    },
    border: {
      subtle: ALPHA.white[10],
      default: ALPHA.white[20],
      emphasis: COLORS.accent.light,
    },
  },
} as const;

/**
 * Semantic Tokens (2025 Best Practice)
 *
 * Component-level semantic tokens provide an abstraction layer between
 * design tokens and components. This makes theming significantly easier
 * and reduces cognitive load when building UI.
 *
 * Reference: https://levelup.gitconnected.com/the-css-custom-properties-secret-that-professional-designers-never-share-45da0aa56224
 */
export const SEMANTIC_TOKENS = {
  // Text Colors (Semantic Layer)
  text: {
    primary: COLORS.ink.DEFAULT,
    secondary: COLORS.ink.secondary,
    muted: COLORS.ink.muted,
    inverse: COLORS.paper.white,
    accent: COLORS.accent.DEFAULT,
  },

  // Background Colors (Semantic Layer)
  bg: {
    primary: COLORS.paper.DEFAULT,
    secondary: COLORS.paper.white,
    accent: COLORS.accent.DEFAULT,
    inverse: COLORS.ink.DEFAULT,
  },

  // Button Component Tokens
  button: {
    primary: {
      bg: COLORS.accent.DEFAULT,
      bgHover: COLORS.accent.hover,
      bgActive: COLORS.accent.hover,
      bgDisabled: ALPHA.accent[50],
      text: COLORS.paper.white,
      textDisabled: ALPHA.paper.white[60],
      border: 'transparent',
      shadow: ALPHA.accent[30],
      shadowHover: ALPHA.accent[30],
    },
    secondary: {
      bg: 'transparent',
      bgHover: ALPHA.warm[8],
      bgActive: ALPHA.warm[20],
      bgDisabled: 'transparent',
      text: COLORS.ink.secondary,
      textDisabled: COLORS.ink.muted,
      border: COLORS.hairline.DEFAULT,
      borderHover: COLORS.accent.DEFAULT,
      shadow: 'none',
    },
  },

  // Card Component Tokens
  card: {
    bg: ALPHA.white[60],
    bgHover: ALPHA.white[80],
    border: ALPHA.warm[20],
    borderHover: COLORS.accent.DEFAULT,
    borderAccent: COLORS.accent.DEFAULT,
    shadow: ALPHA.accent[8],
    shadowHover: ALPHA.accent[30],
    text: COLORS.ink.DEFAULT,
    textSecondary: COLORS.ink.secondary,
  },

  // Form/Input Component Tokens
  input: {
    bg: ALPHA.white[80],
    bgFocus: ALPHA.white[100],
    bgDisabled: ALPHA.warm[8],
    border: ALPHA.warm[30],
    borderHover: ALPHA.warm[30],
    borderFocus: COLORS.accent.DEFAULT,
    borderError: '#DC2626', // Red for errors
    text: COLORS.ink.DEFAULT,
    textPlaceholder: COLORS.ink.muted,
    textDisabled: COLORS.ink.muted,
    shadow: 'none',
    shadowFocus: ALPHA.accent[10],
  },

  // Header Component Tokens
  header: {
    bg: COLORS.accent.DEFAULT,
    bgBlur: ALPHA.accent[95],
    text: COLORS.paper.white,
    textHover: COLORS.paper.white,
    textActive: COLORS.paper.white,
    border: ALPHA.accent[14],
    shadow: 'none',
  },

  // Link Component Tokens
  link: {
    text: COLORS.accent.light,
    textHover: COLORS.accent.DEFAULT,
    textVisited: COLORS.accent.DEFAULT,
    textActive: COLORS.accent.hover,
    underline: 'none',
    underlineHover: 'none',
  },

  // Overlay/Modal Component Tokens
  overlay: {
    bg: ALPHA.accent[60],
    backdrop: 'blur(20px)',
  },

  // Focus Ring (Accessibility)
  focus: {
    ring: COLORS.accent.DEFAULT,
    ringWidth: '2px',
    ringOffset: '2px',
    ringStyle: 'solid',
  },
} as const;

// Helper function to create CSS custom properties
export function createCSSVariables() {
  return `
    /* Colors */
    --color-ink: ${COLORS.ink.DEFAULT};
    --color-ink-black: ${COLORS.ink.black};
    --color-ink-secondary: ${COLORS.ink.secondary};
    --color-ink-muted: ${COLORS.ink.muted};

    --color-paper: ${COLORS.paper.DEFAULT};
    --color-paper-white: ${COLORS.paper.white};

    --color-accent: ${COLORS.accent.DEFAULT};
    --color-accent-hover: ${COLORS.accent.hover};
    --color-accent-light: ${COLORS.accent.light};

    --color-warm: ${COLORS.warm.DEFAULT};
    --color-hairline: ${COLORS.hairline.DEFAULT};

    /* Alpha (Transparency) Variants */
    --alpha-accent-95: ${ALPHA.accent[95]};
    --alpha-accent-98: ${ALPHA.accent[98]};
    --alpha-accent-60: ${ALPHA.accent[60]};
    --alpha-accent-50: ${ALPHA.accent[50]};
    --alpha-accent-35: ${ALPHA.accent[35]};
    --alpha-accent-30: ${ALPHA.accent[30]};
    --alpha-accent-14: ${ALPHA.accent[14]};
    --alpha-accent-10: ${ALPHA.accent[10]};
    --alpha-accent-08: ${ALPHA.accent[8]};
    --alpha-accent-06: ${ALPHA.accent[6]};
    --alpha-accent-05: ${ALPHA.accent[5]};

    --alpha-warm-30: ${ALPHA.warm[30]};
    --alpha-warm-20: ${ALPHA.warm[20]};
    --alpha-warm-08: ${ALPHA.warm[8]};
    --alpha-warm-03: ${ALPHA.warm[3]};

    --alpha-paper-white: ${ALPHA.paper.white};
    --alpha-paper-white-80: ${ALPHA.paper.white80};
    --alpha-paper-white-60: ${ALPHA.paper.white60};
    --alpha-paper-white-10: ${ALPHA.paper.white10};
    --alpha-paper-default-98: ${ALPHA.paper.default98};

    --alpha-white-100: ${ALPHA.white[100]};
    --alpha-white-80: ${ALPHA.white[80]};
    --alpha-white-60: ${ALPHA.white[60]};
    --alpha-white-40: ${ALPHA.white[40]};

    /* Typography */
    --font-sans: ${TYPOGRAPHY.fontFamily.sans.join(', ')};
    --font-serif: ${TYPOGRAPHY.fontFamily.serif.join(', ')};

    /* Spacing */
    --max-content-width: ${SIZES.MAX_CONTENT_WIDTH}px;
    --max-article-width: ${SIZES.MAX_ARTICLE_WIDTH}px;
    --header-height: ${SIZES.HEADER_HEIGHT}px;

    /* Layout */
    --container-padding: ${LAYOUT.container.padding};
  `.trim();
}
