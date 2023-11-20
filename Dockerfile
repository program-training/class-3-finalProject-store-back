FROM node:lts-slim AS build
WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY ./src ./src
RUN npx tsc

FROM node:lts-slim as artifact
WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /app/node_modules .
RUN 

ENV PORT=8181
EXPOSE 8181
CMD [ "node", "./dist/server.js" ]