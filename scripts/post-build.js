// Post-build script: replace pdfjs-dist's fake-worker dynamic import with a stub.
//
// pdfjs-dist's fake-worker fallback contains import(this.workerSrc). In the source
// file it is annotated with /* webpackIgnore: true */, but Terser strips that comment
// during minification. The bare import(this.workerSrc) in the output then triggers
// "Critical dependency: the request of a dependency is an expression" in downstream
// webpack builds, and the severity of the warning varies by webpack version.
//
// The fake-worker path (_setupFakeWorkerGlobal) is only invoked when pdfjs cannot
// create a real web worker. Since we always set GlobalWorkerOptions.workerSrc to a
// valid URL this path is never taken at runtime. Replacing the dynamic import with a
// rejected promise is therefore safe: it preserves the return type (Promise) while
// completely removing the dynamic import expression from the bundle.

const fs = require('fs');
const path = require('path');

const distFile = path.resolve(__dirname, '../dist/index.js');
const original = 'import(this.workerSrc)';
const stub = 'Promise.reject(new Error("pdfjs-dist: fake worker unavailable"))';

let content = fs.readFileSync(distFile, 'utf8');
const count = (content.match(new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

if (count === 0) {
  console.log('post-build: no occurrences found, skipping patch');
} else {
  content = content.replaceAll(original, stub);
  fs.writeFileSync(distFile, content);
  console.log(`post-build: replaced ${count} occurrence(s) of dynamic import with safe stub`);
}
