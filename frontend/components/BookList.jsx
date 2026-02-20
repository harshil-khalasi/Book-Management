import React from "react";

function BookList({ books, deleteBook, setEditBook }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="card" key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Year: {book.publishYear}</p>
          <p>Genre: {book.genre}</p>

          <div className="btn-group">
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button className="delete" onClick={() => deleteBook(book.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;