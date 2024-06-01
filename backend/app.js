import express, { Router } from "express";
import "dotenv/config";
import dbconnect from "./databases/db.js";
import cors from "cors";
import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT;
//middleware
app.use(express.json());
app.use(cors());

dbconnect();

app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

app.get("/v1", (req, res) => {
  res.json({
    success: true,
    message: "Entry successfully",
  });
});
