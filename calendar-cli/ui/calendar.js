fetch('../data/orbits-' + new Date().getUTCFullYear() + '.json')
  .then(r => r.json())
  .then(data => {
    document.getElementById('output').textContent = JSON.stringify(data.records.slice(0, 5), null, 2) + '\n...';
  })
  .catch(() => {
    document.getElementById('output').textContent = 'Run `node cli/index.js compute` first.';
  });
