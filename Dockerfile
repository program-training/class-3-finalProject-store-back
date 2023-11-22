FROM node:lts-slim AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
RUN npm install -g typescript
RUN npm install cheerio @types/cheerio
COPY ./src ./src
RUN tsc
ENV PORT=8181
EXPOSE 8181
CMD [ "node", "./dist/server.js" ]