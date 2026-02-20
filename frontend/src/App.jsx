import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    publishYear: "",
    genre: "",
  });
  const [editId, setEditId] = useState(null);
  const [filterGenre, setFilterGenre] = useState("");

  // Fetch all books
  const fetchBooks = async () => {
    const res = await axios.get(API);
    setBooks(res.data.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ title: "", author: "", publishYear: "", genre: "" });
    fetchBooks();
  };

  // Edit
  const handleEdit = (book) => {
    setForm(book);
    setEditId(book.id);
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchBooks();
  };

  // Filter
  const handleFilter = async () => {
    const res = await axios.get(`${API}/filter?genre=${filterGenre}`);
    setBooks(res.data.data);
  };

  return (
    <div className="container">
      <h1>📚 Book Management System</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publishYear"
          placeholder="Publish Year"
          value={form.publishYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* FILTER */}
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by Genre"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
        <button onClick={fetchBooks}>Reset</button>
      </div>

      {/* BOOK LIST */}
      <div className="book-list">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <h3>{book.title}</h3>
            <p>👤 {book.author}</p>
            <p>📅 {book.publishYear}</p>
            <p>🏷 {book.genre}</p>

            <div className="btn-group">
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;