// Post-build script: re-inject webpackIgnore on pdfjs-dist's dynamic import.
//
// pdfjs-dist's fake-worker fallback contains `import(this.workerSrc)`. The source
// file marks it with `/* webpackIgnore: true */`, which suppresses webpack's
// "Critical dependency" warning during our build. However, Terser strips that
// comment during minification. Any downstream webpack that processes dist/index.js
// will then see a bare dynamic import with a non-literal argument and emit the
// warning. This script re-adds the comment to the already-minified bundle so
// that downstream webpack respects it.

const fs = require('fs');
const path = require('path');

const distFile = path.resolve(__dirname, '../dist/index.js');
const original = 'import(this.workerSrc)';
const patched = 'import(/*webpackIgnore:true*/this.workerSrc)';

let content = fs.readFileSync(distFile, 'utf8');
const count = (content.match(new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

if (count === 0) {
  console.log('post-build: no occurrences of dynamic import found, skipping patch');
} else {
  content = content.replaceAll(original, patched);
  fs.writeFileSync(distFile, content);
  console.log(`post-build: patched ${count} occurrence(s) of ${original}`);
}
