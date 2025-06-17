from skyfield.api import load
from skyfield.positionlib import position_of_radec
from datetime import date

planets = load('de440s.bsp')
ts = load.timescale()
planet_ids = {
    'mercury': 199,
    'venus': 299,
    'earth': 399,
    'mars': 499,
    'jupiter': 599,
    'saturn': 699,
    'sun': 10,
    'moon': 301
}

def get_elongation(d: date, planet_name: str):
    t = ts.utc(d.year, d.month, d.day)
    earth = planets[planet_ids['earth']]
    sun_obs = earth.at(t).observe(planets[planet_ids['sun']]).apparent()

    planet_code = planet_ids.get(planet_name.lower())
    if planet_code is None:
        raise ValueError(f"Unknown planet name: {planet_name}")

    obs = earth.at(t).observe(planets[planet_code]).apparent()
    elong = obs.separation_from(sun_obs).degrees
    return elong

def save_to_json(d):
    data = get_elongation(d)
    with open("data/positions.json", "w") as f:
        import json
        json.dump(data, f, indent=2)