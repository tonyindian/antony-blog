#!/usr/bin/env node

/**
 * Token Inlining Script
 *
 * Automatically inlines _tokens.css into style.css for all builds
 * This ensures CSS variables are always available, even in dev builds
 *
 * Why this is needed:
 * - CSS @import can fail due to CORS, MIME types, or path resolution
 * - Inlining ensures 100% reliability across all environments
 * - Better performance (one fewer HTTP request)
 */

const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, '../_site/css/style.css');
const tokensFile = path.join(__dirname, '../_site/css/_tokens.css');

if (!fs.existsSync(cssFile)) {
  console.log('⏭️  Skipping token inlining (style.css not found)');
  process.exit(0);
}

if (!fs.existsSync(tokensFile)) {
  console.error('❌ Error: _tokens.css not found at', tokensFile);
  process.exit(1);
}

try {
  let css = fs.readFileSync(cssFile, 'utf8');
  const tokensCSS = fs.readFileSync(tokensFile, 'utf8');

  // Replace @import statement with actual tokens content
  const importRegex = /@import\s+url\(['"]?\.?\/?_tokens\.css['"]?\);?/g;

  if (importRegex.test(css)) {
    css = css.replace(importRegex, tokensCSS);
    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('✅ Inlined _tokens.css into style.css');
  } else {
    console.log('⏭️  No @import found, skipping token inlining');
  }
} catch (error) {
  console.error('❌ Error inlining tokens:', error.message);
  process.exit(1);
}
