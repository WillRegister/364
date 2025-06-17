# Time Pope Terminal Calendar

This repository contains a CLI-first web project implementing a symbolic 360° orbit system and a 364-day ritual calendar. Both calendar modes start on the first Monday after the summer solstice.

## Structure

```
calendar-cli/
  cli/            # Node CLI scripts
  ui/             # Optional browser UI
  data/           # Generated ephemeris files
```

## Setup

```
cd calendar-cli
npm install
node cli/index.js compute 2025 ritual     # 364-day ritual calendar
node cli/index.js compute 2025 gregorian  # 365-day Gregorian calendar
```

The ritual calendar uses 13 months with 7-day weeks and 4 weeks per month. The CLI output includes `month`, `week` and `weekday` fields for this mode. Open `ui/index.html` in a browser to view the generated data.

### Launching the browser demo

After generating the JSON files, serve the `calendar-cli` directory so the
browser can fetch them. A quick way is:

```bash
cd calendar-cli
python3 -m http.server
```

Then visit <http://localhost:8000/ui/> in your browser. If you open the HTML
file directly from disk you may see the message `Run \`node cli/index.js
compute\` first` because the browser cannot fetch the JSON files without an HTTP
server.
