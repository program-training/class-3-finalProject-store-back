import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import morgan from "morgan";
import moment from "moment-timezone";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import connectionToPostgresDB from "./postgresDB/postgres";
import connectionToMongoDB from "./mongoDB/connectionToMongoDB";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ServerContext } from "./helpers/types";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectionToRedis } from "./redis/redisClient";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

dotenv.config();
const app = express();
morgan.token("date", function () {
  return moment().tz("Israel").format("DD/MMM/YYYY HH:mm:ss ZZ");
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/",
});
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer<ServerContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
const start = async () => {
  await server.start();
  app.use(`/`, cors(), express.json(), morgan(`[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`), expressMiddleware(server));
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionToMongoDB();
  connectionToPostgresDB();
  connectionToRedis();
};

start();
