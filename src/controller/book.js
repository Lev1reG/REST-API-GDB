const pool = require("../db/db");
const query = require("../queries/queries");

const getAllBook = async (req, res) => {
  pool.query(query.getAllBook, (error, results) => {
    try {
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
};

module.exports = {
  getAllBook,
};
