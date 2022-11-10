FROM node:16.17.0-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

RUN npm install --location=global @adonisjs/cli
RUN npm install @adonisjs/ace

COPY . .
RUN npm run build

WORKDIR /app/build

RUN npm ci --omit=dev
RUN node ace generate:key

FROM node:16.17.0-alpine

WORKDIR /app

RUN rm -rf ./*
RUN npm install --location=global @adonisjs/cli
COPY --from=builder /app/build .
RUN mkdir public
COPY .env.prod .env

EXPOSE 80

CMD npm start
