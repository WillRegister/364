import pandas as pd
from datetime import datetime, timedelta
from skyfield.api import load
from skyfield import almanac

# Planets to track
PLANETS = [
    'mercury',
    'venus',
    'earth',  # for reference
    'mars',
    'jupiter barycenter',
    'saturn barycenter',
    'uranus barycenter',
    'neptune barycenter',
]

def summer_solstice_first_monday(eph, ts, year):
    """Return Time of the first Monday after the June solstice."""
    t0 = ts.utc(year, 6, 20)
    t1 = ts.utc(year, 7, 1)
    t, y = almanac.find_discrete(t0, t1, almanac.seasons(eph))
    solstice = None
    for ti, yi in zip(t, y):
        if yi == almanac.SUMMER:
            solstice = ti.utc_datetime().date()
            break
    if solstice is None:
        raise ValueError('Could not determine summer solstice')

    d = datetime.combine(solstice, datetime.min.time())
    while d.weekday() != 0:  # 0 = Monday
        d += timedelta(days=1)
    return ts.utc(d.year, d.month, d.day)


def compute_orbits(year=2024):
    ts = load.timescale()
    eph = load('de421.bsp')

    start_time = summer_solstice_first_monday(eph, ts, year)

    sun = eph['sun']
    start_long = sun.at(start_time).ecliptic_position().longitude.degrees

    days = 364
    records = []
    for day in range(days):
        t = start_time + day
        row = {'day': day}
        for name in PLANETS:
            body = eph[name]
            lon = body.at(t).ecliptic_position().longitude.degrees
            rel_angle = (lon - start_long) % 360
            row[name] = rel_angle
        records.append(row)

    df = pd.DataFrame(records)
    return df

if __name__ == '__main__':
    df = compute_orbits()
    df.to_csv('orbit_angles.csv', index=False)
    print('Saved orbit_angles.csv')
