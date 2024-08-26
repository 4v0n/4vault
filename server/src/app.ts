import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const env = process.env.NODE_END || "normal";

let dbURI;
if (env === "test") dbURI = process.env.TEST_DB_URI;
else dbURI = process.env.DB_URI;

if (!dbURI) {
  throw new Error("Database URI is not defined in environment variables.");
}

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));

// routes

import userRoutes from "./routes/userRoutes";
app.use("/api/users", userRoutes);

app.get("/", (req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log("DB connection successful, listening on port:", port);
    });
  })
  .catch((error) => {
    console.log("Could not connect to the database:\n", error);
  });

export default app;