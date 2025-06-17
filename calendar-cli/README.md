# Time Pope Terminal Calendar

This project is a CLI-first calendrical system based on a symbolic 360° orbit. It normalizes planetary year cycles and implements a 364-day ritual calendar. Calendar data for both modes begins on the first Monday after the summer solstice. The CLI can download ephemeris data and compute planetary positions. The optional UI provides a simple browser-based view.

## Setup

Install dependencies and run the CLI:

```bash
npm install
# generate ritual calendar data
node cli/index.js compute 2025 ritual
# generate Gregorian calendar data
node cli/index.js compute 2025 gregorian
```

The ritual calendar divides the 364-day year into 13 months with 7-day weeks and 4 weeks per month. The JSON output includes `month`, `week` and `weekday` fields.

### Viewing the data in a browser

Serve the `calendar-cli` directory so the static page can load the generated JSON files. For example:

```bash
python3 -m http.server
```

Then open <http://localhost:8000/ui/> in your browser. Opening `index.html` directly from disk won't work because the page uses `fetch` to request the JSON data.
