# Design System

**Professional Design Token System following 2025 Best Practices**

## Overview

This design system implements a centralized, type-safe token architecture with automated CSS generation. All design decisions are made in one place, ensuring consistency and preventing drift between code and styles.

## Architecture

```
┌─────────────────────────────────────────┐
│  SINGLE SOURCE OF TRUTH                 │
│  src/design/tokens.ts                   │
│  - TypeScript constants                 │
│  - Type safety & autocomplete           │
│  - Documented design decisions          │
└─────────────┬───────────────────────────┘
              │
              ├── TypeScript Build ──> Type checking & IntelliSense
              │
              └── Token Generator ──> src/css/_tokens.css (auto-generated)
                                      │
                                      └──> Imported by style.css
```

## Key Principles (2025 Standards)

✅ **Single Source of Truth** - All tokens defined ONCE in `tokens.ts`
✅ **Automated Generation** - CSS variables auto-generated from TypeScript
✅ **Type Safety** - Full TypeScript support with autocomplete
✅ **Zero Duplication** - No manual CSS variable definitions
✅ **Validation** - Build-time checks prevent hardcoded colors
✅ **Documentation** - Self-documenting with inline comments

## How to Update Design Tokens

### Changing Colors (or any design token)

**❌ OLD WAY (Don't do this):**
```css
/* Manually editing style.css */
:root {
  --color-accent: #2B4A62;  /* ❌ Don't edit CSS directly */
}
```

**✅ NEW WAY (Correct):**

1. **Edit the single source of truth:**
   ```typescript
   // src/design/tokens.ts
   export const COLORS = {
     accent: {
       DEFAULT: '#2B4A62',    // ✅ Change it here
       hover: '#1F3749',
       light: '#4E6E88',
     },
   }
   ```

2. **Regenerate CSS:**
   ```bash
   npm run build:tokens
   ```

3. **Done!** The changes automatically flow to all CSS.

### Build Process Integration

The token generation is integrated into all build commands:

```bash
# Development
npm start              # Generates tokens automatically

# Production build
npm run build          # Generates tokens before building

# Manual generation
npm run build:tokens   # Generate tokens only
```

## Design Token Categories

### Colors
- **Primitive colors**: ink, paper, accent, warm, hairline
- **Semantic colors**: bg-primary, text-primary, accent-primary
- All colors have WCAG AAA contrast validation

### Typography
- Font families (serif, sans)
- Font sizes (xs → 5xl scale)
- Line heights (tight, base, relaxed)
- Letter spacing
- Font weights

### Spacing
- Consistent spacing scale (0 → 32)
- Based on 4px/8px grid system

### Layout
- Container widths
- Section padding
- Breakpoints
- Z-index scale

### Components
- Pre-defined component styles
- Button variants
- Input styles
- Card styles
- Header configurations

### Accessibility
- Touch target minimums (44px Apple HIG)
- Focus ring styles
- Contrast requirements
- Motion preferences

## TypeScript Usage

Import tokens in your TypeScript/JavaScript:

```typescript
import { COLORS, TYPOGRAPHY, SPACING } from './design/tokens';

// Full type safety and autocomplete
const buttonColor = COLORS.accent.DEFAULT;  // '#2B4A62'
const fontStack = TYPOGRAPHY.fontFamily.sans;
const padding = SPACING[4];  // '16px'
```

## CSS Usage

Use the auto-generated CSS variables:

```css
.button {
  background: var(--color-accent);
  color: var(--color-paper-white);
  padding: var(--space-md);
  font-family: var(--font-sans);
}

.button:hover {
  background: var(--color-accent-hover);
}
```

## Color Linting

The design system includes automated validation:

```bash
npm run lint:colors
```

This prevents:
- ❌ Hardcoded hex colors outside of token definitions
- ❌ Inline RGB/HSL values
- ❌ Colors that bypass the design system

## Files

- **`tokens.ts`** - Single source of truth (EDIT THIS)
- **`_tokens.css`** - Auto-generated (DO NOT EDIT)
- **`README.md`** - This file

## Migration Notes

### Before (Dual Source of Truth)
```
tokens.ts  ──┐
             ├──> ❌ Manual sync required
style.css  ──┘
```

### After (Single Source of Truth)
```
tokens.ts ──> generate-tokens.js ──> _tokens.css
  ↑
  └── EDIT HERE ONLY
```

## Best Practices

1. **Always use tokens** - Never hardcode colors or design values
2. **Update in TypeScript** - Edit `tokens.ts`, never CSS directly
3. **Run build:tokens** - After any token changes
4. **Use semantic tokens** - Prefer `--accent-primary` over `--color-accent`
5. **Document decisions** - Add comments explaining color choices
6. **Test contrast** - Verify WCAG compliance for new colors

## Benefits

- 🎯 **Consistency** - Single source prevents drift
- 🚀 **Type Safety** - TypeScript catches errors early
- 🔄 **Automation** - No manual CSS updates needed
- 📝 **Documentation** - Self-documenting system
- ✅ **Validation** - Build-time checks enforce standards
- 🎨 **Flexibility** - Change entire color scheme in seconds

## Example: Changing the Entire Color Scheme

To switch from blue to green (or any color):

```typescript
// src/design/tokens.ts
export const COLORS = {
  accent: {
    DEFAULT: '#2C7A3E',    // Change from blue to green
    hover: '#1F5A2D',
    light: '#4A9F5D',
  },
}
```

```bash
npm run build:tokens
```

✨ **That's it!** The entire site updates automatically.

---

**Last Updated**: December 2025
**Follows**: W3C Design Tokens Spec, 2025 CSS Architecture Best Practices
