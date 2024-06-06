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
    res.status(400).send("Please enter a title");
    return;
  }

  const keyword = `%${title}%`;

  try {
    const results = await pool.query(query.getBookByKeyword, [keyword]);
    if (!results.rows.length) {
      res.status(404).send("Book not found");
      return;
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addBook = async (req, res) => {
  const { Title, Synopsis, Publisher, Author, Publication_Year, Pages, Price } =
    req.body;

  if (
    !Title ||
    !Synopsis ||
    !Publisher ||
    !Publication_Year ||
    !Pages ||
    !Price
  ) {
    res.status(400).send("Please enter all fields");
    return;
  }

  try {
    const author = await pool.query(query.getAuthorID, [Author]);

    if (!author.rows.length) {
      res.status(404).send("Author not found");
      return;
    }

    const publisher = await pool.query(query.getPublisherID, [Publisher]);

    if (!publisher.rows.length) {
      res.status(404).send("Publisher not found");
      return;
    }

    await pool.query(query.addBook, [
      Title,
      Synopsis,
      Publisher,
      Publication_Year,
      Pages,
      Price,
    ]);
    await pool.query(query.addBookAuthor, [Title, Author]);
    res.status(201).send("Book added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllReview = async (req, res) => {
  try {
    const results = await pool.query(query.getAllReview);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getReviewByTitle = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).send("Please enter a title");
    return;
  }

  const keyword = `%${title}%`;

  try {
    const results = await pool.query(query.getReviewByTitle, [keyword]);

    if (!results.rows.length) {
      res.status(404).send("Book not found");
      return;
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllBook,
  getBookByKeyword,
  addBook,
  getAllReview,
  getReviewByTitle,
};
