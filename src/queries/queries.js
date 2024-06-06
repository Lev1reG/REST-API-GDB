const getAllBook = `SELECT * FROM "Book_Details_View"`;
const getBookByKeyword = `SELECT * FROM "Book_Details_View" WHERE "Title" ILIKE $1`;
const addBook = `INSERT INTO "Book" ("Title", "Synopsis", "Publisher_ID", "Publication_Year", "Pages", "Price")
   VALUES ($1, $2, (SELECT "Publisher_ID" FROM "Publisher" WHERE "Name" = $3), $4, $5, $6)
  `;
const addBookAuthor = `INSERT INTO "Book_Author" ("Book_ID", "Author_ID")
    VALUES ((SELECT "Book_ID" FROM "Book" WHERE "Title" = $1), (SELECT "Author_ID" FROM "Author" WHERE "Name" = $2))
  `;
const getPublisherID = `SELECT "Publisher_ID" FROM "Publisher" WHERE "Name" = $1`;
const getAuthorID = `SELECT "Author_ID" FROM "Author" WHERE "Name" = $1`;

module.exports = {
  getAllBook,
  getBookByKeyword,
  addBook,
  addBookAuthor,
  getPublisherID,
  getAuthorID,
};
