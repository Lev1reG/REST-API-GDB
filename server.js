const express = require("express");
const pool = require("./src/db/db");

const createRouter = require("./src/router");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/", createRouter());
