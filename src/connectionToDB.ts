import mongoose from "mongoose";

export const connectionToDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URI, { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
};
