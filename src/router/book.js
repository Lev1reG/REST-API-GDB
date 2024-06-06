const controller = require("../controller/book");

const book = (router) => {
  router.get("/book", controller.getAllBook);
  router.get("/search/book", controller.getBookByKeyword);
};

module.exports = book;
