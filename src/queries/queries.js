const getAllBook = `SELECT * FROM "Book_Details_View"`;
const getBookByKeyword = `SELECT * FROM "Book_Details_View" WHERE "Title" ILIKE $1`;

module.exports = {
  getAllBook,
  getBookByKeyword,
};
