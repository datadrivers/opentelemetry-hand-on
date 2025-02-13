# OpenTelemetry Hands-On

OpenTelemetry setup showing its capabilities.

Using:

- Node.js - To send traces, metrics and logs
- OpenTelemetry Collector - To receive traces, metrics and logs
- Jaeger - To visualize traces
- Prometheus - To gather metrics
- Grafana - To visualize metrics
- Loki - To visualize logs

## App Set Up

```bash
cd ./app

# Use the correct Node.js version defined in .nvmrc
nvm use

# Install the dependencies
npm install
```

## Docker Compose Set Up

```bash
# Build the Docker Image in ./app
docker compose build

# Start the services
docker compose up -d

# Check the logs of the app
docker compose logs -f app
# ... or of the collector
docker compose logs -f collector
```
