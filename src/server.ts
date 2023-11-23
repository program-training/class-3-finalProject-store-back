import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectionToDB } from "./DB/connectionToDB";
import { authenticateToken } from "./helpers/jwt";
import usersRouter from "./users/usersRouter";
import productsRouter from "./products/productsRouter";
import ordersRouter from "./orders/orderRouter";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan(`[:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms`));
app.use(express.json());
app.use(authenticateToken);
app.use("api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectionToDB();
});
