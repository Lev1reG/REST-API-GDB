const express = require("express");

const router = express.Router();
const book = require('./book');

const createRouter = () => {
  book(router);

  return router;
}

module.exports = createRouter;
