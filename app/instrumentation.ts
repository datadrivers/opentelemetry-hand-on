import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4317';

const traceExporter = new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: `${otlpEndpoint}/v1/traces`,
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
});

const metricExporter = new OTLPMetricExporter({
    // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
    url: `${otlpEndpoint}/v1/metrics`,
    // an optional object containing custom headers to be sent with each request
    headers: {},
});

const sdk = new NodeSDK({
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
