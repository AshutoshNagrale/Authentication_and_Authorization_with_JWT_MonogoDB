import mongoose from "mongoose";
import { Express } from "express";

const connect = (app: Express) => {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const mongoUrl: string | any = process.env.MONGO_URL;

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    console.log("Trying MongoDB connection with retry");
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongoUrl, options)
      .then(() => {
        console.log("MongoDB is connected");
        app.emit("ready");
      })
      .catch((err) => {
        console.log(
          "MongoDB connection unsuccessful, retry after 2 seconds.",
          err
        );
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};
export default connect;
