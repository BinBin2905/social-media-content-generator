import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import contentRoute from "./routes/contentRoute.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api", authRoute);
app.use("/api", contentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
