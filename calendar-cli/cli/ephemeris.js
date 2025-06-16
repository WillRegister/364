const Astronomy = require('astronomy-engine');

function summerSolsticeFirstMonday(year) {
  const seasons = Astronomy.Seasons(year);
  const solstice = seasons.jun_solstice.date;
  const d = new Date(Date.UTC(solstice.getUTCFullYear(), solstice.getUTCMonth(), solstice.getUTCDate()));
  while (d.getUTCDay() !== 1) {
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return new Astronomy.AstroTime(d);
}

function computeOrbits(year = new Date().getUTCFullYear()) {
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
    { body: Astronomy.Body.Moon, name: 'moon' }
  ];
  const days = 364;
  const records = [];
  for (let day = 0; day < days; day++) {
    const t = start.AddDays(day);
    const row = { day };
    for (const p of planets) {
      const vec = Astronomy.GeoVector(p.body, t, false);
      const lon = Astronomy.Ecliptic(vec).elon;
      const rel = (lon - sunLon + 360) % 360;
      row[p.name] = Number(rel.toFixed(6));
    }
    records.push(row);
  }
  return { start: start.date.toISOString(), records };
}

module.exports = { computeOrbits };
