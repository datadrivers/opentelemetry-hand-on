# OpenTelemetry Hands-On

OpenTelemetry setup showing its capabilities.

Using:

- Node.js - To send traces, metrics and logs
- OpenTelemetry Collector
  - To receive metrics and logs
  - To export metrics to Prometheus and export logs to Loki
- Jaeger
  - To receive and visualize traces
- Prometheus - To gather metrics
- Grafana - To visualize metrics from Prometheus
- Loki - To visualize logs

## URLs

- Jaeger - http://localhost:16686
- Prometheus - http://localhost:9090
- Grafana - http://localhost:3000
  - User: `admin`
  - Default password: `admin`
- Loki - http://localhost:3100

## TODOs

- [ ] Decide whether to use Jaeger or OpenTelemetry Collector to collect traces, metrics and logs
  - [ ] If Jaeger: Find a way to export data sent to Jaeger to Prometheus for metrics and Loki for logs
  - [ ] If OpenTelemetry Collector: Find a way to export traces to Jaeger, metrics to Prometheus and logs to Loki

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
