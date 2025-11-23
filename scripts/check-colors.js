#!/usr/bin/env node
/**
 * Fails the build if hardcoded colors (hex/rgb/hsl) appear outside custom properties.
 * Allowed: lines that define or use CSS variables (contain "--" or "var(--)").
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', 'src');
const colorPattern = /(#(?:[0-9a-fA-F]{3,8})|rgba?\(|hsla?\()/;

/** Walk the directory tree and return all CSS files. */
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name.endsWith('.css') ? [fullPath] : [];
  });
}

const files = walk(rootDir);
const violations = [];

files.forEach((file) => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, idx) => {
    if (!colorPattern.test(line)) return;
    // Allow lines that define or reference custom properties
    if (line.includes('--') || line.includes('var(--')) return;
    violations.push({ file, line: idx + 1, text: line.trim() });
  });
});

if (violations.length) {
  console.error('❌ Hardcoded colors found (use CSS variables instead):');
  violations.forEach(({ file, line, text }) => {
    console.error(`${path.relative(path.join(__dirname, '..'), file)}:${line}  ${text}`);
  });
  process.exit(1);
}

console.log('✅ No hardcoded colors found (only CSS variables detected).');
