const controller = require("../controller/book");

const book = (router) => {
  router.get("/book", controller.getAllBook);
  router.get("/search/book", controller.getBookByKeyword);
  router.post("/book", controller.addBook);
  router.get("/review", controller.getAllReview);
  router.get("/search/review", controller.getReviewByTitle);
  router.post("/review", controller.addReview);
  router.put("/book", controller.updateBookAuthor);
};

module.exports = book;
