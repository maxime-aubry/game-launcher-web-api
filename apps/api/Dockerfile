FROM oven/bun:latest

WORKDIR /usr/src/app

COPY bun.lockb .
COPY package*.json .

RUN bun install

COPY . .