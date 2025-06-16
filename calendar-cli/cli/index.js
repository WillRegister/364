#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { computeOrbits } = require('./ephemeris');

function usage() {
  console.log(`Usage: node cli/index.js compute [year] [calendar]\n`);
  console.log('  calendar = ritual (default) or gregorian');
}

const [,, cmd, argYear, argCal] = process.argv;
if (cmd === 'compute') {
  const year = parseInt(argYear || new Date().getUTCFullYear(), 10);
  const calendar = (argCal === 'gregorian') ? 'gregorian' : 'ritual';
  const result = computeOrbits(year, calendar);
  const outDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `orbits-${calendar}-${year}.json`);
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  console.log(`Saved ${outFile}`);
} else {
  usage();
  process.exit(1);
}
