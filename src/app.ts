import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./modules/indexRoutes";
import { swaggerDocs } from "./config/swaggers";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

swaggerDocs(app, Number(process.env.PORT) || 3000);

export default app;
