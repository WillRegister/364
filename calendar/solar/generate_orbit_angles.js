const Astronomy = require('astronomy-engine');
const fs = require('fs');

function summerSolsticeFirstMonday(year) {
  const seasons = Astronomy.Seasons(year);
  const solsticeDate = seasons.jun_solstice.date;
  const d = new Date(Date.UTC(solsticeDate.getUTCFullYear(), solsticeDate.getUTCMonth(), solsticeDate.getUTCDate()));
  while (d.getUTCDay() !== 1) { // Monday = 1
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return new Astronomy.AstroTime(d);
}

function computeOrbits(year = 2024) {
  const start = summerSolsticeFirstMonday(year);
  const sunVec = Astronomy.GeoVector(Astronomy.Body.Sun, start, false);
  const sunLon = Astronomy.Ecliptic(sunVec).elon;

  const planets = [
    { body: Astronomy.Body.Mercury, name: 'mercury' },
    { body: Astronomy.Body.Venus, name: 'venus' },
    { body: Astronomy.Body.Earth, name: 'earth' },
    { body: Astronomy.Body.Mars, name: 'mars' },
    { body: Astronomy.Body.Jupiter, name: 'jupiter' },
    { body: Astronomy.Body.Saturn, name: 'saturn' },
    { body: Astronomy.Body.Uranus, name: 'uranus' },
    { body: Astronomy.Body.Neptune, name: 'neptune' },
  ];

  const records = [];
  const days = 364;
  for (let day = 0; day < days; day++) {
    const t = start.AddDays(day);
    const row = { day };
    for (const p of planets) {
      const vec = Astronomy.GeoVector(p.body, t, false);
      const lon = Astronomy.Ecliptic(vec).elon;
      const rel = (lon - sunLon + 360) % 360;
      row[p.name] = rel.toFixed(6);
    }
    records.push(row);
  }
  return records;
}

if (require.main === module) {
  const data = computeOrbits();
  const headers = Object.keys(data[0]);
  const lines = [headers.join(',')];
  for (const row of data) {
    lines.push(headers.map(h => row[h]).join(','));
  }
  fs.writeFileSync('orbit_angles.csv', lines.join('\n'));
  console.log('Saved orbit_angles.csv');
}
