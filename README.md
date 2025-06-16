# 364 Calendar Tools

This repository contains a simple HTML wheel for a 13‑month calendar and
Python utilities for computing planetary positions relative to a custom
"day one"—the first Monday following the June solstice.

## Requirements

Install the dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

The first run of the Python scripts will attempt to download the JPL
`de421.bsp` ephemeris. Internet access is required for this download.

## Generating Orbital Angles

Run the `generate_orbit_angles.py` script to compute the daily ecliptic
longitude of each planet (relative to the Sun's position on day one) for
one year:

```bash
python generate_orbit_angles.py
```

The results are saved to `orbit_angles.csv`.
=======
# 364 Day Calendar

This repository contains an experimental 13‑month calendar where each month has exactly 28 days. The scheme keeps weeks aligned so every month starts on a Monday and ends on a Sunday.

A year therefore has 364 days (52 weeks). The calendar year begins on the first Monday on or after the summer solstice. The days between the solstice and this Monday form the **void week**, whose length varies from one to seven days.

The `wheel13.html` file provides an SVG wheel showing the 13 months. Click any sector to display its 28 days. Each day is shown with its day‑of‑year number and the week number.

## Usage

Open `wheel13.html` in a modern web browser. Hover or click on a sector to explore the months.
