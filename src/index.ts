import express from "express";
import { router } from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(3000, () => console.log("Server is running on port 3000"));
