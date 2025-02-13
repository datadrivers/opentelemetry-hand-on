import express, { Express } from 'express';
import { trace } from '@opentelemetry/api';
import { faker } from '@faker-js/faker';


const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();

const tracer = trace.getTracer(process.env.OTEL_SERVICE_NAME || 'my-app');

function getRandomNumber(min: number, max: number) {
    const span = tracer.startSpan('get-random-number'); // Start a trace span
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    span.end(); // End the trace span

    return randomNumber;
}

app.get('/rolldice', (req, res) => {
    console.log('Rolling dice...');

    const span = tracer.startSpan('roll-dice'); // Start a trace span
    const result = getRandomNumber(1, 6);
    span.end(); // End the trace span

    console.log(`Rolled a ${result}`);

    res.send(result.toString());
});

app.get('/rollrick', (req, res) => {
    console.log('Faking rick...');

    const span = tracer.startSpan('roll-rick'); // Start a trace span
    const randomNumber = getRandomNumber(1, 6);
    const randomName = faker.person.fullName(); 
    const randomEmail = faker.internet.email();
    const result = `Rolled a ${randomNumber} for ${randomName} at ${randomEmail}`
    span.end(); // End the trace span

    console.log(result);
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});
