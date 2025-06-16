import pandas as pd
from datetime import datetime
from skyfield.api import load
from skyfield import almanac


def find_lunar_events(start_date="2025-05-26", days=365):
    ts = load.timescale()
    eph = load('de421.bsp')
    start = ts.utc(datetime.fromisoformat(start_date))
    end = start + days

    # Moon phases: 0=new, 2=full
    t_phase, y_phase = almanac.find_discrete(start, end, almanac.moon_phases(eph))
    # Moon apsides: 0=perigee, 1=apogee
    t_apsides, y_apsides = almanac.find_discrete(start, end, almanac.moon_apsides(eph))

    events = []
    for t, phase in zip(t_phase, y_phase):
        if phase == almanac.NEW_MOON:
            events.append({"time": t.utc_datetime(), "event": "New Moon"})
        elif phase == almanac.FULL_MOON:
            events.append({"time": t.utc_datetime(), "event": "Full Moon"})

    for t, apsis in zip(t_apsides, y_apsides):
        if apsis == 0:
            events.append({"time": t.utc_datetime(), "event": "Perigee"})
        else:
            events.append({"time": t.utc_datetime(), "event": "Apogee"})

    events.sort(key=lambda x: x["time"])

    midpoints = []
    for i in range(len(events) - 1):
        t0 = events[i]["time"]
        t1 = events[i + 1]["time"]
        mid = t0 + (t1 - t0) / 2
        midpoints.append({"time": mid, "event": f"Midpoint {events[i]['event']} -> {events[i+1]['event']}"})

    df_events = pd.DataFrame(events)
    df_mid = pd.DataFrame(midpoints)
    return df_events, df_mid


if __name__ == "__main__":
    events, mids = find_lunar_events()
    events.to_csv("lunar_events.csv", index=False)
    mids.to_csv("lunar_midpoints.csv", index=False)
    print("Saved lunar_events.csv and lunar_midpoints.csv")
