import mongoose from "mongoose";
import { config } from "./config";

export const connectionToDB = () => {
  mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
};
