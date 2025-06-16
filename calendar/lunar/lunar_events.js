const Astronomy = require('astronomy-engine');
const fs = require('fs');

function findLunarEvents(startDate = '2025-05-26', days = 365) {
  const start = new Astronomy.AstroTime(new Date(startDate + 'T00:00:00Z'));
  const end = start.AddDays(days);

  let events = [];

  let mq = Astronomy.SearchMoonQuarter(start);
  while (mq.time.tt <= end.tt) {
    if (mq.quarter === 0) events.push({ time: mq.time.date, event: 'New Moon' });
    else if (mq.quarter === 2) events.push({ time: mq.time.date, event: 'Full Moon' });
    mq = Astronomy.NextMoonQuarter(mq);
  }

  let aps = Astronomy.SearchLunarApsis(start);
  while (aps.time.tt <= end.tt) {
    if (aps.kind === Astronomy.ApsisKind.Pericenter) {
      events.push({ time: aps.time.date, event: 'Perigee' });
    } else {
      events.push({ time: aps.time.date, event: 'Apogee' });
    }
    aps = Astronomy.NextLunarApsis(aps);
  }

  events.sort((a, b) => a.time - b.time);

  const midpoints = [];
  for (let i = 0; i < events.length - 1; i++) {
    const t0 = events[i].time.getTime();
    const t1 = events[i + 1].time.getTime();
    const mid = new Date((t0 + t1) / 2);
    midpoints.push({ time: mid, event: `Midpoint ${events[i].event}->${events[i+1].event}` });
  }

  return { events, midpoints };
}

if (require.main === module) {
  const { events, midpoints } = findLunarEvents();
  const format = (d) => d.toISOString();
  const eventLines = ['time,event'];
  events.forEach(e => eventLines.push(`${format(e.time)},${e.event}`));
  fs.writeFileSync('lunar_events.csv', eventLines.join('\n'));

  const midLines = ['time,event'];
  midpoints.forEach(m => midLines.push(`${format(m.time)},${m.event}`));
  fs.writeFileSync('lunar_midpoints.csv', midLines.join('\n'));
  console.log('Saved lunar_events.csv and lunar_midpoints.csv');
}

module.exports = { findLunarEvents };
