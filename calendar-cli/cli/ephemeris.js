const Astronomy = require('astronomy-engine');

// Approximate ecliptic longitude of the galactic center (Sagittarius A*)
// calculated from RA 17h45m40.04s, Dec -29°00'28.1".
const SAGITTARIUS_A_LON = 266.851728;

function summerSolsticeFirstMonday(year) {
  const seasons = Astronomy.Seasons(year);
  const solstice = seasons.jun_solstice.date;
  const d = new Date(Date.UTC(solstice.getUTCFullYear(), solstice.getUTCMonth(), solstice.getUTCDate()));
  while (d.getUTCDay() !== 1) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return new Astronomy.AstroTime(d);
}

function gregorianStart(year) {
  return new Astronomy.AstroTime(new Date(Date.UTC(year, 0, 1)));
}

function computeOrbits(year = new Date().getUTCFullYear(), calendar = 'ritual') {
  const start = calendar === 'gregorian'
    ? gregorianStart(year)
    : summerSolsticeFirstMonday(year);
  const days = calendar === 'gregorian'
    ? 365
    : 364;
  const gcLon = SAGITTARIUS_A_LON;
  const planets = [
    { body: Astronomy.Body.Mercury, name: 'mercury' },
    { body: Astronomy.Body.Venus, name: 'venus' },
    { body: Astronomy.Body.Earth, name: 'earth' },
    { body: Astronomy.Body.Mars, name: 'mars' },
    { body: Astronomy.Body.Jupiter, name: 'jupiter' },
    { body: Astronomy.Body.Saturn, name: 'saturn' },
    { body: Astronomy.Body.Moon, name: 'moon' }
  ];
  const records = [];
  for (let day = 0; day < days; day++) {
    const t = start.AddDays(day);
    const row = { day };
    for (const p of planets) {
      const vec = Astronomy.GeoVector(p.body, t, false);
      const lon = Astronomy.Ecliptic(vec).elon;
      const rel = (lon - gcLon + 360) % 360;
      row[p.name] = Number(rel.toFixed(6));
    }
    records.push(row);
  }
  return { calendar, start: start.date.toISOString(), records };
}

module.exports = { computeOrbits };
