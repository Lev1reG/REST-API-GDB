const pool = require("../db/db");
const query = require("../queries/queries");

const getAllBook = async (req, res) => {
  try {
    const results = await pool.query(query.getAllBook);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getBookByKeyword = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send("Please enter a title");
  }

  const keyword = `%${title}%`;

  try {
    const results = await pool.query(query.getBookByKeyword, [keyword]);
    if (!results.rows.length) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllBook,
  getBookByKeyword,
};
