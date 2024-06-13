const express = require("express");
const bodyParser = require('body-parser');
const pool = require("./src/db/db");

const createRouter = require("./src/router");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/", createRouter());
