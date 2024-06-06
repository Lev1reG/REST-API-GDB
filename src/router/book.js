const controller = require("../controller/book");

const book = (router) => {
  router.get("/book", controller.getAllBook);
};

module.exports = book;
