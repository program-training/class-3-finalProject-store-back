import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./config";
import { connectionToDB } from "./connectionToDB";
import {authenticateToken} from "./helpers/jwt"
import usersRouter from "./internal/users/usersRouter"

const app = express();

app.use(cors());
app.use(morgan(`tiny`));
app.use(express.json());
app.use(authenticateToken);
app.use(`/users`, usersRouter)


app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
  connectionToDB();
});
