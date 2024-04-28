import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response, json, urlencoded } from "express";
import cors from "cors"
import routes from "./routes"
import { corsOptions } from "./src/utils/helpers";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors(corsOptions))

app.get("/", (_, res) => {
  res.json({ message: "ok" });
});

app.use("/api/v1", routes);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
