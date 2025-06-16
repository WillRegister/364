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
