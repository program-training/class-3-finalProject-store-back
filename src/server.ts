import express from "express";
import morgan from "morgan";
import moment from "moment-timezone";
import cors from "cors";
import { connectionToMongoDB } from "./mongoDB/connectionToMongoDB";
import { authenticateToken } from "./helpers/jwt";
import usersRouter from "./users/usersRouter";
import productsRouter from "./products/productsRouter";
import ordersRouter from "./orders/orderRouter";
import cartsRouter from "./carts/cartsRouter";
import cartReportsRouter from "./triggers/triggersRouter";
import dotenv from "dotenv";
import connectionToPostgresDB from "./postgresDB/postgres";

dotenv.config();

const app = express();
morgan.token("date", function () {
  return moment().tz("Israel").format("DD/MMM/YYYY HH:mm:ss ZZ");
});

app.use(cors());
app.use(morgan(`[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`));
app.use(express.json());
app.use(authenticateToken);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/carts", cartsRouter);
app.use("/triggers", cartReportsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionToMongoDB();
  connectionToPostgresDB();
});
