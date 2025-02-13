FROM node:23.7.0-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "-r", "./instrumentation.js", "app.js"]
