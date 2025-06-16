# Time Pope Terminal Calendar

This repository contains a CLI-first web project implementing a symbolic 360° orbit system and a 364-day ritual calendar.

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
node cli/index.js compute 2025  # generate ephemeris for the year
```

Open `ui/index.html` in a browser to view the generated data.
