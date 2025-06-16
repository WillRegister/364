# Build UI
FROM node:18 AS frontend
WORKDIR /app/ui
COPY ui/package.json ui/package-lock.json* ./
RUN npm install
COPY ui .
RUN npm run build

