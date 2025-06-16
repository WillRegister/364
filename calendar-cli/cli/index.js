#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { computeOrbits } = require('./ephemeris');

function usage() {
  console.log(`Usage: node cli/index.js compute [year]\n`);
}

const [,, cmd, arg] = process.argv;
if (cmd === 'compute') {
  const year = parseInt(arg || new Date().getUTCFullYear(), 10);
  const result = computeOrbits(year);
  const outDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `orbits-${year}.json`);
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log(`Saved ${outFile}`);
} else {
  usage();
  process.exit(1);
}
