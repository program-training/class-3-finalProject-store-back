import mongoose from "mongoose";

export const connectionToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URI || "", { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("connection to mongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};
