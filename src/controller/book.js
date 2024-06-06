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
  const books = req.body;
  if (!Array.isArray(books) || !books.length) {
    res.status(400).send("Please provide a list of books");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const book of books) {
      const {
        Title,
        Synopsis,
        Publisher,
        Author,
        Publication_Year,
        Pages,
        Price,
      } = book;

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

      const author = await client.query(query.getAuthorID, [Author]);
      if (!author.rows.length) {
        res.status(404).send("Author not found");
        return;
      }

      const publisher = await client.query(query.getPublisherID, [Publisher]);
      if (!publisher.rows.length) {
        res.status(404).send("Publisher not found");
        return;
      }

      await client.query(query.addBook, [
        Title,
        Synopsis,
        Publisher,
        Publication_Year,
        Pages,
        Price,
      ]);
      await client.query(query.addBookAuthor, [Title, Author]);
      await client.query("COMMIT");

      res.status(201).send("Book added successfully");
    }
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).send(error.message);
  } finally {
    client.release();
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

const addReview = async (req, res) => {
  const reviews = req.body;

  if (!Array.isArray(reviews) || !reviews.length) {
    res.status(400).send("Please provide a list of reviews");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const review of reviews) {
      const { Title, Customer, Rating, Review } = review;

      if (!Title || !Customer || !Rating || !Review) {
        res.status(400).send("Please enter all fields");
        return;
      }

      const book = await client.query(query.getBookByTitle, [Title]);
      if (!book.rows.length) {
        res.status(404).send("Book not found");
        return;
      }

      const customer = await client.query(query.getCustomerByName, [Customer]);
      if (!customer.rows.length) {
        res.status(404).send("Customer not found");
        return;
      }

      if(Rating < 1 || Rating > 5) {
        res.status(400).send("Rating must be between 1 and 5");
        return;
      }

      await client.query(query.addReview, [Title, Customer, Rating, Review]);
    }
    await client.query("COMMIT");

    res.status(201).send("Review added successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).send(error.message);
  } finally {
    client.release();
  }
};

module.exports = {
  getAllBook,
  getBookByKeyword,
  addBook,
  getAllReview,
  getReviewByTitle,
  addReview,
};
