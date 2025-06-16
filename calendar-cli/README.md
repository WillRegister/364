# Time Pope Terminal Calendar

This project is a CLI-first calendrical system based on a symbolic 360° orbit. It normalizes planetary year cycles and implements a 364-day ritual calendar. The CLI can download ephemeris data and compute planetary positions. The optional UI provides a simple browser-based view.

## Setup

Install dependencies and run the CLI:

```bash
npm install
# generate ritual calendar data
node cli/index.js compute 2025 ritual
# generate Gregorian calendar data
node cli/index.js compute 2025 gregorian
```

To open the optional web interface, open `ui/index.html` in a browser.
