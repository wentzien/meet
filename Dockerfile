FROM node:12

WORKDIR /app

ENV PORT 80

WORKDIR /app/react-app/
COPY ./react-app/package.json ./
RUN npm install

WORKDIR /app/express-server/
COPY ./express-server/package.json ./
RUN npm install

COPY . .

WORKDIR /app/react-app/
RUN npm run build

WORKDIR /app/express-server/

CMD  ["node", "server.js"]