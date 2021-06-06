FROM node:12

WORKDIR /app

ENV PORT 80

COPY ./react-app/package.json ./

RUN npm install

COPY ./express-server/package.json ./

RUN npm install

COPY . .

RUN cd ./react-app/
RUN npm run build
RUN cd ..

CMD  ["node", "express-server/server.js"]