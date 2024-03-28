import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import connect from "./db/dbconnection";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connect(app);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// middleware
// called on every request

app.get("/api/health", (req, res) => {
  res.status(200).json("Server is up and running!");
});

function main() {
  app.on("ready", () => {
    app.listen(4000, () => {
      console.log(`Server listening at http://localhost:4000`);
    });
  });

  routes(app);
}

main();
