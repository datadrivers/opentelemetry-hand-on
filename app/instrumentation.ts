import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const metricsEndpoint = process.env.OTEL_EXPORTER_METRICS_ENDPOINT || 'http://otel-collector:4317';
const tracesEndpoint = process.env.OTEL_EXPORTER_TRACES_ENDPOINT || 'http://jaeger:4317';

const metricExporter = new OTLPMetricExporter({
    // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
    url: `${metricsEndpoint}/v1/metrics`,
    // an optional object containing custom headers to be sent with each request
    headers: {},
});

const traceExporter = new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: `${tracesEndpoint}/v1/traces`,
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
});

const sdk = new NodeSDK({
    metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => sdk.shutdown().catch(console.error));
});
