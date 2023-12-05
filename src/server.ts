import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import BodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { typeDefs } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectionToDB } from "./DB/connectionToDB.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
const apolloServer = new ApolloServer({
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
await apolloServer.start();

app.use(cors());
app.use("/graphql", cors(), BodyParser.json(), expressMiddleware(apolloServer));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  connectionToDB();
});
