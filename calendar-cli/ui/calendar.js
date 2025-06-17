const year = new Date().getUTCFullYear();
function load(file) {
  return fetch(file).then(r => r.ok ? r.json() : Promise.reject());
}

load('../data/orbits-ritual-' + year + '.json')
  .catch(() => load('../data/orbits-gregorian-' + year + '.json'))
  .then(data => {
    const out = { start: data.start, waitDays: data.waitDays, sample: data.records.slice(0, 5) };
    document.getElementById('output').textContent = JSON.stringify(out, null, 2) + '\n...';
  })
  .catch(() => {
    document.getElementById('output').textContent = 'Run `node cli/index.js compute` first.';
  });
