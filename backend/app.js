// import express, { Router } from "express";
// import "dotenv/config";
// import dbconnect from "./databases/db.js";
// import cors from "cors";
// import router from "./routes/routes.js";
// const app = express();
// const PORT = process.env.PORT;
// //middleware
// app.use(express.json());
// app.use(cors());

// dbconnect();

// app.use("/v1", router);

// app.listen(PORT, () => {
//   console.log(`server is running at ${PORT}`);
// });

// app.get("/v1", (req, res) => {
//   res.json({
//     success: true,
//     message: "Entry successfully",
//   });
// });

import express from "express";
import "dotenv/config";
import dbconnect from "./databases/db.js";
import cors from "cors";
// import rote from "./routes/routes.js";  // Updated router import
import router from "./routes/routes.js";

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
dbconnect();

// Use main router
app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/v1", (req, res) => {
  res.json({
    success: true,
    message: "Entry successfully",
  });
});
