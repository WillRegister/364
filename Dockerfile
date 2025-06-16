# Build UI
FROM node:18 AS frontend
WORKDIR /app/ui
COPY ui/package.json ui/package-lock.json* ./
RUN npm install
COPY ui .
RUN npm run build

# Backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY --from=frontend /app/ui/dist ui/dist
COPY calendar calendar
COPY rituals rituals
COPY agents agents
COPY README.md .
CMD ["bash"]
