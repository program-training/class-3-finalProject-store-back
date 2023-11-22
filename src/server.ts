import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "./config";
import { connectionToDB } from "./connectionToDB";
import { authenticateToken } from "./helpers/jwt";
import usersRouter from "./internal/users/usersRouter";
import productsRouter from "./external/products/productsRouter"
import ordersRouter from "./external/orders/orderRouter";

const app = express();

app.use(cors());
app.use(morgan(`tiny`));
app.use(express.json());
app.use(authenticateToken);
<<<<<<< HEAD
app.use(`/users`, usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
=======
app.use(`/users`, usersRouter)
app.use("/orders", routerOrder);
>>>>>>> 9a5646afec3e6222aa6bac0c93bae8699c51f918

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
  connectionToDB();
});
