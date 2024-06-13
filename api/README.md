# REST API Good Reading Bookstore

This API is use to communicate with Good Reading Bookstore database.

## Getting Started

To run this API you need to have Node.js installed on your machine. Follow this step to setup and run the API.

1. Clone this repository

```git
git clone https://github.com/yourusername/book-review-api.git
```

2. Install all dependencies

```npm
npm install
```

3. Setup the database and environment variables

- Create a PostgreSQL database
- Create a `.env` file in the root directory of the project and add the following variables

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
```

4. Run the API

```npm
npm run start
```

## Endpoints

### GET /book

- **Description**: Retrieve all books from the database.
- **Response**: A JSON array containing all books.

### GET /search/book

- **Description**: Retrieve books from the database based on a keyword. The keyword used is the book title
- **Request Body**: A JSON object containing the keyword

```json
{
  "title": "book title"
}
```

- **Response**: A JSON array containing all books that match the keyword.

### POST /book

- **Description**: Add a new book to the database.
- **Request Body**: JSON array containing the book details

```json
[
    {
        "Title": "book title",
        "Synopsis": "book synopsis",
        "Publisher": "book publisher",
        "Author": "book author",
        "Publication_Year": book_year,
        "Pages": book_pages,
        "Price": book_price
    }
    // and so on..
]
```

- **Response**: Message indicating the success or failure of the operation.

### GET /review

- **Description**: Retrieve all reviews from the database.
- **Response**: A JSON array containing all reviews.

### GET /search/review

- **Description**: Retrieve reviews from the database based on a keyword. The keyword used is the book title
- **Request Body**: A JSON object containing the keyword

```json
{
  "title": "book title"
}
```

- **Response**: A JSON array containing all reviews that match the keyword.

### POST /review

- **Description**: Add a new review to the database.
- **Request Body**: JSON array containing the review details

```json
[
    {
        "Title": "book title",
        "Customer": "customer name",
        "Rating": book_rating,
        "Review": "review content"
    }
    // and so on..
]
```

- **Response**: Message indicating the success or failure of the operation.

### PUT /book

- **Description**: Updates the author of a book based on the book title.
- **Request Body**: A JSON object containing the book title and the new author

```json
{
  "title": "book title",
  "author": "new author"
}
```

- **Response**: Message indicating the success or failure of the operation.
