import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

const api = require("./routes/auth.routes");

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/api", api);

const server = http.createServer(app);

const port = 8000;
const MONGO_URL =
  "mongodb+srv://develijahndungu:monkey12@cluster0.izq45my.mongodb.net/?retryWrites=true&w=majority";

server.listen(port, () => {
  console.log("Server running on 8000");
});

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
mongoose.connection.on("error", (error) => console.log(error));
