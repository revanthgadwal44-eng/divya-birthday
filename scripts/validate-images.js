const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
const root = path.join(__dirname, '..');

const txt = fs.readFileSync(dataPath, 'utf8');
const re = /assets\/photos\/[a-zA-Z0-9_\-\.]+\.(?:jpg|jpeg|png|webp)/g;
const matches = Array.from(new Set(txt.match(re) || []));

if (!matches.length) {
  console.log('No photo references found in data.js');
  process.exit(0);
}

let ok = true;
console.log('Checking referenced photos:');
matches.forEach((p) => {
  const fp = path.join(root, p.replace(/\//g, path.sep));
  let exists = fs.existsSync(fp);
  let size = 0;
  if (exists) {
    size = fs.statSync(fp).size;
    if (size === 0) exists = false;
  }
  console.log(`- ${p} -> ${exists ? `OK (${size} bytes)` : 'MISSING or empty'}`);
  if (!exists) ok = false;
});

if (!ok) process.exit(2);
console.log('All referenced photos exist and are non-empty.');
