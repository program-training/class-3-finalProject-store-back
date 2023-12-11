import express from "express";
import morgan from "morgan";
import moment from "moment-timezone";
import cors from "cors";
import { connectionToMongoDB } from "./mongoDB/connectionToMongoDB";
import dotenv from "dotenv";
import connectionToPostgresDB from "./postgresDB/postgres";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { ServerContext } from "./helpers/types";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<ServerContext>({ typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] });

morgan.token("date", function () {
  return moment().tz("Israel").format("DD/MMM/YYYY HH:mm:ss ZZ");
});

const start = async () => {
  await server.start();
  app.use(
    `/`,
    cors<cors.CorsRequest>(),
    express.json(),
    morgan(`[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.token;
        return { token };
      },
    })
  );
  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionToMongoDB();
  connectionToPostgresDB();
};

start();
