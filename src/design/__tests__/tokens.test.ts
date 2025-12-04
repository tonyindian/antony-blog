/**
 * Tests for Design System Tokens (tokens.ts)
 * Validates design token structure, values, accessibility compliance, and consistency
 */

import { describe, it, expect } from 'vitest';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SIZES,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  ANIMATIONS,
  BREAKPOINTS,
  Z_INDEX,
  OPACITY,
  LAYOUT,
  COMPONENT_STYLES,
  ACCESSIBILITY,
  MOTION,
  createCSSVariables,
} from '../tokens';

describe('Design Tokens', () => {
  describe('COLORS', () => {
    it('should have all color categories', () => {
      expect(COLORS).toHaveProperty('ink');
      expect(COLORS).toHaveProperty('paper');
      expect(COLORS).toHaveProperty('accent');
      expect(COLORS).toHaveProperty('warm');
      expect(COLORS).toHaveProperty('hairline');
    });

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

      expect(COLORS.ink.DEFAULT).toMatch(hexColorRegex);
      expect(COLORS.ink.black).toMatch(hexColorRegex);
      expect(COLORS.ink.secondary).toMatch(hexColorRegex);
      expect(COLORS.ink.muted).toMatch(hexColorRegex);

      expect(COLORS.paper.DEFAULT).toMatch(hexColorRegex);
      expect(COLORS.paper.white).toMatch(hexColorRegex);

      expect(COLORS.accent.DEFAULT).toMatch(hexColorRegex);
      expect(COLORS.accent.hover).toMatch(hexColorRegex);
      expect(COLORS.accent.light).toMatch(hexColorRegex);

      expect(COLORS.warm.DEFAULT).toMatch(hexColorRegex);
      expect(COLORS.hairline.DEFAULT).toMatch(hexColorRegex);
    });

    it('should have ink color hierarchy (black < DEFAULT < secondary < muted)', () => {
      // Convert hex to brightness for comparison
      const getBrightness = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return (r * 299 + g * 587 + b * 114) / 1000;
      };

      const blackBrightness = getBrightness(COLORS.ink.black);
      const defaultBrightness = getBrightness(COLORS.ink.DEFAULT);
      const secondaryBrightness = getBrightness(COLORS.ink.secondary);
      const mutedBrightness = getBrightness(COLORS.ink.muted);

      expect(blackBrightness).toBeLessThan(defaultBrightness);
      expect(defaultBrightness).toBeLessThan(secondaryBrightness);
      expect(secondaryBrightness).toBeLessThan(mutedBrightness);
    });

    it('should have accent.hover darker than accent.DEFAULT', () => {
      const getBrightness = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return (r * 299 + g * 587 + b * 114) / 1000;
      };

      const defaultBrightness = getBrightness(COLORS.accent.DEFAULT);
      const hoverBrightness = getBrightness(COLORS.accent.hover);

      expect(hoverBrightness).toBeLessThan(defaultBrightness);
    });

    it('should have accent.light lighter than accent.DEFAULT', () => {
      const getBrightness = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        return (r * 299 + g * 587 + b * 114) / 1000;
      };

      const defaultBrightness = getBrightness(COLORS.accent.DEFAULT);
      const lightBrightness = getBrightness(COLORS.accent.light);

      expect(lightBrightness).toBeGreaterThan(defaultBrightness);
    });
  });

  describe('TYPOGRAPHY', () => {
    it('should have font families', () => {
      expect(TYPOGRAPHY.fontFamily.sans).toBeInstanceOf(Array);
      expect(TYPOGRAPHY.fontFamily.serif).toBeInstanceOf(Array);
      expect(TYPOGRAPHY.fontFamily.sans.length).toBeGreaterThan(0);
      expect(TYPOGRAPHY.fontFamily.serif.length).toBeGreaterThan(0);
    });

    it('should have consistent font size units', () => {
      Object.values(TYPOGRAPHY.fontSize).forEach(size => {
        expect(size).toMatch(/^\d+px$/);
      });
    });

    it('should have ascending font size scale', () => {
      const sizes = {
        xs: parseInt(TYPOGRAPHY.fontSize.xs),
        sm: parseInt(TYPOGRAPHY.fontSize.sm),
        base: parseInt(TYPOGRAPHY.fontSize.base),
        md: parseInt(TYPOGRAPHY.fontSize.md),
        lg: parseInt(TYPOGRAPHY.fontSize.lg),
        xl: parseInt(TYPOGRAPHY.fontSize.xl),
        '2xl': parseInt(TYPOGRAPHY.fontSize['2xl']),
        '3xl': parseInt(TYPOGRAPHY.fontSize['3xl']),
        '4xl': parseInt(TYPOGRAPHY.fontSize['4xl']),
        '5xl': parseInt(TYPOGRAPHY.fontSize['5xl']),
      };

      expect(sizes.xs).toBeLessThan(sizes.sm);
      expect(sizes.sm).toBeLessThan(sizes.base);
      expect(sizes.base).toBeLessThan(sizes.md);
      expect(sizes.md).toBeLessThan(sizes.lg);
      expect(sizes.lg).toBeLessThan(sizes.xl);
      expect(sizes.xl).toBeLessThan(sizes['2xl']);
      expect(sizes['2xl']).toBeLessThan(sizes['3xl']);
      expect(sizes['3xl']).toBeLessThan(sizes['4xl']);
      expect(sizes['4xl']).toBeLessThan(sizes['5xl']);
    });

    it('should have valid line height values', () => {
      expect(TYPOGRAPHY.lineHeight.xs).toMatch(/^\d+px$/);
      expect(TYPOGRAPHY.lineHeight.sm).toMatch(/^\d+px$/);
      expect(TYPOGRAPHY.lineHeight.base).toMatch(/^\d+px$/);
      expect(TYPOGRAPHY.lineHeight.md).toMatch(/^\d+px$/);
      expect(TYPOGRAPHY.lineHeight.lg).toMatch(/^\d+px$/);
      expect(TYPOGRAPHY.lineHeight.xl).toMatch(/^\d+px$/);
      expect(typeof TYPOGRAPHY.lineHeight.body).toBe('number');
      expect(typeof TYPOGRAPHY.lineHeight.tight).toBe('number');
      expect(typeof TYPOGRAPHY.lineHeight.relaxed).toBe('number');
    });

    it('should have valid letter spacing values', () => {
      Object.values(TYPOGRAPHY.letterSpacing).forEach(spacing => {
        expect(spacing).toMatch(/^-?\d+(\.\d+)?em$/);
      });
    });

    it('should have numeric font weights', () => {
      expect(typeof TYPOGRAPHY.fontWeight.normal).toBe('number');
      expect(typeof TYPOGRAPHY.fontWeight.medium).toBe('number');
      expect(typeof TYPOGRAPHY.fontWeight.semibold).toBe('number');
      expect(typeof TYPOGRAPHY.fontWeight.bold).toBe('number');
    });

    it('should have ascending font weight scale', () => {
      expect(TYPOGRAPHY.fontWeight.normal).toBeLessThan(TYPOGRAPHY.fontWeight.medium);
      expect(TYPOGRAPHY.fontWeight.medium).toBeLessThan(TYPOGRAPHY.fontWeight.semibold);
      expect(TYPOGRAPHY.fontWeight.semibold).toBeLessThan(TYPOGRAPHY.fontWeight.bold);
    });

    it('should have font feature settings', () => {
      expect(TYPOGRAPHY.fontFeatures.kern).toBeDefined();
      expect(TYPOGRAPHY.fontFeatures.ligatures).toBeDefined();
      expect(TYPOGRAPHY.fontFeatures.contextual).toBeDefined();
    });
  });

  describe('SPACING', () => {
    it('should have consistent spacing units', () => {
      Object.values(SPACING).forEach(value => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('should have ascending spacing scale', () => {
      const spacingValues = Object.entries(SPACING)
        .map(([key, value]) => ({
          key: parseFloat(key),
          value: parseInt(value),
        }))
        .sort((a, b) => a.key - b.key); // Sort by key to ensure correct order

      for (let i = 1; i < spacingValues.length; i++) {
        expect(spacingValues[i].value).toBeGreaterThan(spacingValues[i - 1].value);
      }
    });

    it('should have spacing 0 equal to 0px', () => {
      expect(SPACING[0]).toBe('0px');
    });
  });

  describe('SIZES', () => {
    it('should have all size constants', () => {
      expect(SIZES).toHaveProperty('MAX_CONTENT_WIDTH');
      expect(SIZES).toHaveProperty('MAX_ARTICLE_WIDTH');
      expect(SIZES).toHaveProperty('MAX_TEXT_WIDTH');
      expect(SIZES).toHaveProperty('HEADER_HEIGHT');
    });

    it('should have numeric values', () => {
      expect(typeof SIZES.MAX_CONTENT_WIDTH).toBe('number');
      expect(typeof SIZES.MAX_ARTICLE_WIDTH).toBe('number');
      expect(typeof SIZES.MAX_TEXT_WIDTH).toBe('number');
      expect(typeof SIZES.HEADER_HEIGHT).toBe('number');
    });

    it('should have logical width hierarchy', () => {
      expect(SIZES.MAX_TEXT_WIDTH).toBeLessThan(SIZES.MAX_ARTICLE_WIDTH);
      expect(SIZES.MAX_ARTICLE_WIDTH).toBeLessThan(SIZES.MAX_CONTENT_WIDTH);
    });
  });

  describe('BORDER_RADIUS', () => {
    it('should have consistent border radius units', () => {
      Object.entries(BORDER_RADIUS).forEach(([key, value]) => {
        if (key === 'none') {
          expect(value).toBe('0px');
        } else if (key === 'full') {
          expect(value).toBe('9999px');
        } else {
          expect(value).toMatch(/^\d+px$/);
        }
      });
    });

    it('should have ascending border radius scale', () => {
      const values = {
        sm: parseInt(BORDER_RADIUS.sm),
        DEFAULT: parseInt(BORDER_RADIUS.DEFAULT),
        md: parseInt(BORDER_RADIUS.md),
        lg: parseInt(BORDER_RADIUS.lg),
        xl: parseInt(BORDER_RADIUS.xl),
      };

      expect(values.sm).toBeLessThan(values.DEFAULT);
      expect(values.DEFAULT).toBeLessThan(values.md);
      expect(values.md).toBeLessThan(values.lg);
      expect(values.lg).toBeLessThan(values.xl);
    });
  });

  describe('SHADOWS', () => {
    it('should have all shadow levels', () => {
      expect(SHADOWS).toHaveProperty('none');
      expect(SHADOWS).toHaveProperty('sm');
      expect(SHADOWS).toHaveProperty('DEFAULT');
      expect(SHADOWS).toHaveProperty('md');
      expect(SHADOWS).toHaveProperty('lg');
      expect(SHADOWS).toHaveProperty('xl');
      expect(SHADOWS).toHaveProperty('2xl');
    });

    it('should have valid shadow syntax', () => {
      expect(SHADOWS.none).toBe('none');

      // Other shadows should be CSS box-shadow strings
      [SHADOWS.sm, SHADOWS.DEFAULT, SHADOWS.md, SHADOWS.lg, SHADOWS.xl, SHADOWS['2xl']].forEach(
        shadow => {
          expect(shadow).toContain('rgba');
          expect(shadow).toContain('0, 0, 0');
        }
      );
    });
  });

  describe('TRANSITIONS', () => {
    it('should have duration values with time units', () => {
      expect(TRANSITIONS.duration.fast).toMatch(/^\d+ms$/);
      expect(TRANSITIONS.duration.normal).toMatch(/^\d+ms$/);
      expect(TRANSITIONS.duration.slow).toMatch(/^\d+ms$/);
      expect(TRANSITIONS.duration.slower).toMatch(/^\d+ms$/);
    });

    it('should have ascending duration scale', () => {
      const durations = {
        fast: parseInt(TRANSITIONS.duration.fast),
        normal: parseInt(TRANSITIONS.duration.normal),
        slow: parseInt(TRANSITIONS.duration.slow),
        slower: parseInt(TRANSITIONS.duration.slower),
      };

      expect(durations.fast).toBeLessThan(durations.normal);
      expect(durations.normal).toBeLessThan(durations.slow);
      expect(durations.slow).toBeLessThan(durations.slower);
    });

    it('should have valid timing functions', () => {
      expect(TRANSITIONS.timing.linear).toBe('linear');
      expect(TRANSITIONS.timing.easeIn).toBe('ease-in');
      expect(TRANSITIONS.timing.easeOut).toBe('ease-out');
      expect(TRANSITIONS.timing.easeInOut).toBe('ease-in-out');
      expect(TRANSITIONS.timing.spring).toContain('cubic-bezier');
    });
  });

  describe('ANIMATIONS', () => {
    it('should have all animation definitions', () => {
      expect(ANIMATIONS).toHaveProperty('slideUp');
      expect(ANIMATIONS).toHaveProperty('slideDown');
      expect(ANIMATIONS).toHaveProperty('fadeIn');
      expect(ANIMATIONS).toHaveProperty('scaleIn');
    });

    it('should have valid animation structure', () => {
      Object.values(ANIMATIONS).forEach(animation => {
        expect(animation).toHaveProperty('name');
        expect(animation).toHaveProperty('duration');
        expect(animation).toHaveProperty('timing');
        expect(animation).toHaveProperty('keyframes');
        expect(typeof animation.keyframes).toBe('object');
      });
    });

    it('should have valid keyframes', () => {
      Object.values(ANIMATIONS).forEach(animation => {
        expect(animation.keyframes).toHaveProperty('0%');
        expect(animation.keyframes).toHaveProperty('100%');
      });
    });
  });

  describe('BREAKPOINTS', () => {
    it('should have all breakpoint values', () => {
      expect(BREAKPOINTS).toHaveProperty('xs');
      expect(BREAKPOINTS).toHaveProperty('sm');
      expect(BREAKPOINTS).toHaveProperty('md');
      expect(BREAKPOINTS).toHaveProperty('lg');
      expect(BREAKPOINTS).toHaveProperty('xl');
      expect(BREAKPOINTS).toHaveProperty('2xl');
    });

    it('should have consistent breakpoint units', () => {
      Object.values(BREAKPOINTS).forEach(breakpoint => {
        expect(breakpoint).toMatch(/^\d+px$/);
      });
    });

    it('should have ascending breakpoint scale', () => {
      const values = {
        xs: parseInt(BREAKPOINTS.xs),
        sm: parseInt(BREAKPOINTS.sm),
        md: parseInt(BREAKPOINTS.md),
        lg: parseInt(BREAKPOINTS.lg),
        xl: parseInt(BREAKPOINTS.xl),
        '2xl': parseInt(BREAKPOINTS['2xl']),
      };

      expect(values.xs).toBeLessThan(values.sm);
      expect(values.sm).toBeLessThan(values.md);
      expect(values.md).toBeLessThan(values.lg);
      expect(values.lg).toBeLessThan(values.xl);
      expect(values.xl).toBeLessThan(values['2xl']);
    });
  });

  describe('Z_INDEX', () => {
    it('should have all z-index layers', () => {
      expect(Z_INDEX).toHaveProperty('base');
      expect(Z_INDEX).toHaveProperty('dropdown');
      expect(Z_INDEX).toHaveProperty('sticky');
      expect(Z_INDEX).toHaveProperty('fixed');
      expect(Z_INDEX).toHaveProperty('modalBackdrop');
      expect(Z_INDEX).toHaveProperty('modal');
      expect(Z_INDEX).toHaveProperty('popover');
      expect(Z_INDEX).toHaveProperty('tooltip');
      expect(Z_INDEX).toHaveProperty('header');
      expect(Z_INDEX).toHaveProperty('overlay');
    });

    it('should have numeric z-index values', () => {
      Object.values(Z_INDEX).forEach(value => {
        expect(typeof value).toBe('number');
      });
    });

    it('should have ascending z-index scale', () => {
      expect(Z_INDEX.base).toBeLessThan(Z_INDEX.dropdown);
      expect(Z_INDEX.dropdown).toBeLessThan(Z_INDEX.sticky);
      expect(Z_INDEX.sticky).toBeLessThan(Z_INDEX.fixed);
      expect(Z_INDEX.fixed).toBeLessThan(Z_INDEX.modalBackdrop);
      expect(Z_INDEX.modalBackdrop).toBeLessThan(Z_INDEX.modal);
      expect(Z_INDEX.modal).toBeLessThan(Z_INDEX.popover);
      expect(Z_INDEX.popover).toBeLessThan(Z_INDEX.tooltip);
      expect(Z_INDEX.tooltip).toBeLessThan(Z_INDEX.header);
      expect(Z_INDEX.header).toBeLessThan(Z_INDEX.overlay);
    });
  });

  describe('OPACITY', () => {
    it('should have all opacity values', () => {
      expect(OPACITY).toHaveProperty('disabled');
      expect(OPACITY).toHaveProperty('hover');
      expect(OPACITY).toHaveProperty('muted');
      expect(OPACITY).toHaveProperty('subtle');
      expect(OPACITY).toHaveProperty('subtleBorder');
      expect(OPACITY).toHaveProperty('placeholder');
      expect(OPACITY).toHaveProperty('overlay');
      expect(OPACITY).toHaveProperty('semiTransparent');
    });

    it('should have values between 0 and 1', () => {
      Object.values(OPACITY).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('LAYOUT', () => {
    it('should have header configuration', () => {
      expect(LAYOUT.header).toHaveProperty('height');
      expect(LAYOUT.header).toHaveProperty('padding');
      expect(typeof LAYOUT.header.height).toBe('number');
    });

    it('should have section configuration', () => {
      expect(LAYOUT.section).toHaveProperty('paddingY');
      expect(LAYOUT.section).toHaveProperty('paddingX');
    });

    it('should have container configuration', () => {
      expect(LAYOUT.container).toHaveProperty('maxWidth');
      expect(LAYOUT.container).toHaveProperty('padding');
      expect(LAYOUT.container.maxWidth).toBe(SIZES.MAX_CONTENT_WIDTH);
    });

    it('should use clamp() for responsive values', () => {
      expect(LAYOUT.section.paddingY.mobile).toContain('clamp');
      expect(LAYOUT.section.paddingY.desktop).toContain('clamp');
      expect(LAYOUT.section.paddingX).toContain('clamp');
      expect(LAYOUT.container.padding).toContain('clamp');
    });
  });

  describe('COMPONENT_STYLES', () => {
    it('should have button styles', () => {
      expect(COMPONENT_STYLES.button).toHaveProperty('primary');
      expect(COMPONENT_STYLES.button).toHaveProperty('secondary');
    });

    it('should have input styles', () => {
      expect(COMPONENT_STYLES.input).toHaveProperty('text');
    });

    it('should have card styles', () => {
      expect(COMPONENT_STYLES.card).toHaveProperty('bg');
      expect(COMPONENT_STYLES.card).toHaveProperty('border');
      expect(COMPONENT_STYLES.card).toHaveProperty('borderRadius');
      expect(COMPONENT_STYLES.card).toHaveProperty('padding');
      expect(COMPONENT_STYLES.card).toHaveProperty('shadow');
      expect(COMPONENT_STYLES.card).toHaveProperty('hover');
    });

    it('should have header styles', () => {
      expect(COMPONENT_STYLES.header).toHaveProperty('bg');
      expect(COMPONENT_STYLES.header).toHaveProperty('text');
      expect(COMPONENT_STYLES.header).toHaveProperty('zIndex');
      expect(COMPONENT_STYLES.header.zIndex).toBe(Z_INDEX.header);
    });

    it('should reference design tokens', () => {
      expect(COMPONENT_STYLES.button.primary.bg).toBe(COLORS.accent.DEFAULT);
      expect(COMPONENT_STYLES.button.primary.bgHover).toBe(COLORS.accent.hover);
      expect(COMPONENT_STYLES.button.primary.borderRadius).toBe(BORDER_RADIUS.DEFAULT);
    });
  });

  describe('ACCESSIBILITY', () => {
    it('should have touch target minimums', () => {
      expect(ACCESSIBILITY.touchTarget.min).toBeGreaterThanOrEqual(44);
      expect(ACCESSIBILITY.touchTarget.mobile).toBeGreaterThanOrEqual(44);
    });

    it('should have focus ring configuration', () => {
      expect(ACCESSIBILITY.focusRing).toHaveProperty('width');
      expect(ACCESSIBILITY.focusRing).toHaveProperty('color');
      expect(ACCESSIBILITY.focusRing).toHaveProperty('offset');
      expect(ACCESSIBILITY.focusRing).toHaveProperty('style');
    });

    it('should have WCAG contrast minimums', () => {
      expect(ACCESSIBILITY.contrast.minAA).toBe(4.5);
      expect(ACCESSIBILITY.contrast.minAAA).toBe(7);
    });

    it('should have focus ring color from accent palette', () => {
      expect(ACCESSIBILITY.focusRing.color).toBe(COLORS.accent.DEFAULT);
    });
  });

  describe('MOTION', () => {
    it('should have media query strings', () => {
      expect(MOTION.reducedMotion).toContain('@media');
      expect(MOTION.reducedMotion).toContain('prefers-reduced-motion');
      expect(MOTION.hover).toContain('@media');
      expect(MOTION.hover).toContain('hover: hover');
      expect(MOTION.touch).toContain('@media');
      expect(MOTION.touch).toContain('hover: none');
    });
  });

  describe('createCSSVariables()', () => {
    it('should return a string', () => {
      const result = createCSSVariables();
      expect(typeof result).toBe('string');
    });

    it('should contain CSS custom properties', () => {
      const result = createCSSVariables();
      expect(result).toContain('--color-ink:');
      expect(result).toContain('--color-paper:');
      expect(result).toContain('--color-accent:');
      expect(result).toContain('--font-sans:');
      expect(result).toContain('--font-serif:');
      expect(result).toContain('--max-content-width:');
    });

    it('should use actual token values', () => {
      const result = createCSSVariables();
      expect(result).toContain(COLORS.ink.DEFAULT);
      expect(result).toContain(COLORS.paper.DEFAULT);
      expect(result).toContain(COLORS.accent.DEFAULT);
      expect(result).toContain(String(SIZES.MAX_CONTENT_WIDTH));
    });

    it('should format font families correctly', () => {
      const result = createCSSVariables();
      expect(result).toContain(TYPOGRAPHY.fontFamily.sans.join(', '));
      expect(result).toContain(TYPOGRAPHY.fontFamily.serif.join(', '));
    });

    it('should not have leading/trailing whitespace', () => {
      const result = createCSSVariables();
      expect(result).toBe(result.trim());
    });
  });

  describe('Token Immutability', () => {
    it('should have readonly type annotation (enforced at compile-time)', () => {
      // TypeScript 'as const' provides compile-time immutability
      // This test verifies the tokens are exported with const assertions
      expect(COLORS).toBeDefined();
      expect(TYPOGRAPHY).toBeDefined();
      expect(SPACING).toBeDefined();

      // @ts-expect-error - TypeScript should prevent this at compile time
      COLORS.ink.DEFAULT = '#000000';

      // @ts-expect-error - TypeScript should prevent this at compile time
      TYPOGRAPHY.fontSize.base = '20px';

      // @ts-expect-error - TypeScript should prevent this at compile time
      SPACING[1] = '10px';
    });
  });

  describe('Token Consistency', () => {
    it('should use SIZES in LAYOUT', () => {
      expect(LAYOUT.container.maxWidth).toBe(SIZES.MAX_CONTENT_WIDTH);
      expect(LAYOUT.header.height).toBe(SIZES.HEADER_HEIGHT);
    });

    it('should use Z_INDEX in COMPONENT_STYLES', () => {
      expect(COMPONENT_STYLES.header.zIndex).toBe(Z_INDEX.header);
    });

    it('should use COLORS in COMPONENT_STYLES', () => {
      expect(COMPONENT_STYLES.button.primary.bg).toBe(COLORS.accent.DEFAULT);
      expect(COMPONENT_STYLES.button.primary.bgHover).toBe(COLORS.accent.hover);
      expect(COMPONENT_STYLES.button.primary.text).toBe(COLORS.paper.white);
    });

    it('should use BORDER_RADIUS in COMPONENT_STYLES', () => {
      expect(COMPONENT_STYLES.button.primary.borderRadius).toBe(BORDER_RADIUS.DEFAULT);
      expect(COMPONENT_STYLES.button.secondary.borderRadius).toBe(BORDER_RADIUS.full);
      expect(COMPONENT_STYLES.input.text.borderRadius).toBe(BORDER_RADIUS.DEFAULT);
      expect(COMPONENT_STYLES.card.borderRadius).toBe(BORDER_RADIUS.lg);
    });

    it('should use TRANSITIONS in COMPONENT_STYLES', () => {
      expect(COMPONENT_STYLES.button.primary.transition).toContain(
        TRANSITIONS.duration.normal
      );
      expect(COMPONENT_STYLES.button.primary.transition).toContain(
        TRANSITIONS.timing.easeInOut
      );
    });

    it('should use TYPOGRAPHY in COMPONENT_STYLES', () => {
      // Button primary should use base font size (15px)
      expect(COMPONENT_STYLES.button.primary.fontSize).toBe('15px');

      // Button secondary should use small font size (14px)
      expect(COMPONENT_STYLES.button.secondary.fontSize).toBe('14px');

      // Font weights should be semibold (600)
      expect(COMPONENT_STYLES.button.primary.fontWeight).toBe(600);
      expect(COMPONENT_STYLES.button.secondary.fontWeight).toBe(600);

      // Input should use base font size and line height
      expect(COMPONENT_STYLES.input.text.fontSize).toBe('15px');
      expect(COMPONENT_STYLES.input.text.lineHeight).toBe('24px');
    });

    it('should use SHADOWS in COMPONENT_STYLES', () => {
      expect(COMPONENT_STYLES.card.shadow).toBe(SHADOWS.md);
      expect(COMPONENT_STYLES.card.hover.shadow).toBe(SHADOWS.xl);
    });

    it('should use COLORS in ACCESSIBILITY', () => {
      expect(ACCESSIBILITY.focusRing.color).toBe(COLORS.accent.DEFAULT);
    });
  });
});
