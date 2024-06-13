const getAllBook = `SELECT * FROM "Book_Details_View"`;
const getBookByKeyword = `SELECT * FROM "Book_Details_View" WHERE "Title" ILIKE $1`;
const getBookByTitle = `SELECT * FROM "Book_Details_View" WHERE "Title" = $1`;
const getCustomerByName = `SELECT * FROM "Customer" WHERE "Name" = $1`;
const addBook = `INSERT INTO "Book" ("Title", "Synopsis", "Publisher_ID", "Publication_Year", "Pages", "Price")
   VALUES ($1, $2, (SELECT "Publisher_ID" FROM "Publisher" WHERE "Name" = $3 LIMIT 1), $4, $5, $6)
  `;
const addBookAuthor = `INSERT INTO "Book_Author" ("Book_ID", "Author_ID")
    VALUES ((SELECT "Book_ID" FROM "Book" WHERE "Title" = $1 LIMIT 1), (SELECT "Author_ID" FROM "Author" WHERE "Name" = $2 LIMIT 1))
  `;
const getPublisherID = `SELECT "Publisher_ID" FROM "Publisher" WHERE "Name" = $1`;
const getAuthorID = `SELECT "Author_ID" FROM "Author" WHERE "Name" = $1`;
const getAllReview = `SELECT * FROM "Book_Review_Customer_View"`;
const getReviewByTitle = `SELECT * FROM "Book_Review_Customer_View" WHERE "Book_Title" ILIKE $1`;
const addReview = `
  INSERT INTO "Review" ("Book_ID", "Customer_ID", "Rating", "Review_Text")
    VALUES ((SELECT "Book_ID" FROM "Book" WHERE "Title" = $1 LIMIT 1), (SELECT "Customer_ID" FROM "Customer" WHERE "Name" = $2 LIMIT 1), $3, $4)
  `;
const updateBookAuthor = `
  UPDATE "Book_Author" SET "Author_ID" = (SELECT "Author_ID" FROM "Author" WHERE "Name" = $2 LIMIT 1) 
  WHERE "Book_ID" = (SELECT "Book_ID" FROM "Book" WHERE "Title" = $1 LIMIT 1)`;

module.exports = {
  getAllBook,
  getBookByKeyword,
  addBook,
  getBookByTitle,
  addBookAuthor,
  getPublisherID,
  getAuthorID,
  getAllReview,
  getReviewByTitle,
  addReview,
  getCustomerByName,
  updateBookAuthor,
};
