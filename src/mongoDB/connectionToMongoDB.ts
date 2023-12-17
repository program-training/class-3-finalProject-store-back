import mongoose from "mongoose";

export const connectionToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URI || "", { retryWrites: true, w: "majority" })
    .then(() => {
      console.log("Connection to mongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};
