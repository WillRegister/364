# Metaphysical Manifesto

This project experiments with a 13‑month, 28‑day calendar synchronized with the June solstice. Python utilities track solar and lunar events, while a React interface visualizes the data.

## Directory overview

- `calendar/solar` – 364‑day calendar tools and orbital calculations
- `calendar/lunar` – lunar phases, perigee and apogee tracker
- `ui` – Vite/React interface
- `rituals` – personal journaling space
- `agents` – future CLI bots

## Development

Install Python and Node dependencies:

```bash
pip install -r requirements.txt
cd ui && npm install
```

Generate orbital angles:

```bash
python calendar/solar/generate_orbit_angles.py
```

Compute lunar events:

```bash
python calendar/lunar/lunar_events.py
```

Run the development server for the UI:

```bash
cd ui
npm run dev
```


## Container

Build the container to run the tools in a single environment:

```bash
docker build -t calendar .
docker run -it calendar
```
