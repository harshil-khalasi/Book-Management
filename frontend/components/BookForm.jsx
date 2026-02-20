import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000/books";

function BookForm({ fetchBooks, editBook, setEditBook }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publishYear: "",
    genre: "",
  });

  useEffect(() => {
    if (editBook) setForm(editBook);
  }, [editBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editBook) {
      await axios.put(`${API}/${editBook.id}`, form);
      setEditBook(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ title: "", author: "", publishYear: "", genre: "" });
    fetchBooks();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="publishYear" value={form.publishYear} onChange={handleChange} placeholder="Year" required />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required />
      <button type="submit">
        {editBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;