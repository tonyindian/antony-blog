#!/usr/bin/env node

/**
 * CSS Minification Script
 * Minifies CSS files in production builds
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const isProduction = process.env.ELEVENTY_ENV === 'production';

if (!isProduction) {
  console.log('⏭️  Skipping CSS minification (not production)');
  process.exit(0);
}

const cssFile = path.join(__dirname, '../_site/css/style.css');
const tokensFile = path.join(__dirname, '../_site/css/_tokens.css');

if (!fs.existsSync(cssFile)) {
  console.error('❌ CSS file not found:', cssFile);
  process.exit(1);
}

let css = fs.readFileSync(cssFile, 'utf8');

// Note: Token inlining now happens in build:inline-tokens step
// This check is kept for backward compatibility
if (css.includes('@import')) {
  console.log('⚠️  Warning: @import found in CSS, tokens should be inlined before minification');
  if (fs.existsSync(tokensFile)) {
    const tokensCSS = fs.readFileSync(tokensFile, 'utf8');
    css = css.replace(/@import\s+url\(['"]?\.?\/?_tokens\.css['"]?\);?/g, tokensCSS);
    console.log('✅ Inlined _tokens.css into style.css (fallback)');
  }
}

const result = new CleanCSS({
  level: 2, // Advanced optimizations
  compatibility: '*', // All browsers
  format: false, // No formatting (minified)
  sourceMap: false
}).minify(css);

if (result.errors.length > 0) {
  console.error('❌ CSS minification errors:');
  result.errors.forEach(err => console.error(err));
  process.exit(1);
}

if (result.warnings.length > 0) {
  console.warn('⚠️  CSS minification warnings:');
  result.warnings.forEach(warn => console.warn(warn));
}

fs.writeFileSync(cssFile, result.styles, 'utf8');

const originalSize = css.length;
const minifiedSize = result.styles.length;
const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

console.log('✅ CSS minified successfully');
console.log(`   Original: ${(originalSize / 1024).toFixed(2)}KB`);
console.log(`   Minified: ${(minifiedSize / 1024).toFixed(2)}KB`);
console.log(`   Savings: ${savings}%`);
