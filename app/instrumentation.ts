import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4317';

const traceExporter = new OTLPTraceExporter({
    url: `${otlpEndpoint}`,
});

const metricExporter = new OTLPMetricExporter({
    url: `${otlpEndpoint}`,
});

const sdk = new NodeSDK({
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
