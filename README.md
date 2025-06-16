# Metaphysical Manifesto

This project experiments with a 13‑month, 28‑day calendar synchronized with the June solstice. Node.js utilities track solar and lunar events, while a React interface visualizes the data.

## Directory overview

- `calendar/solar` – 364‑day calendar tools and orbital calculations
- `calendar/lunar` – lunar phases, perigee and apogee tracker
- `backup` – archived Python utilities
- `ui` – Vite/React interface
- `rituals` – personal journaling space
- `agents` – future CLI bots

## Development

Install Node dependencies:

```bash
npm install
cd ui && npm install
```

Generate orbital angles:

```bash
node calendar/solar/generate_orbit_angles.js
```

Compute lunar events:

```bash
node calendar/lunar/lunar_events.js
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
