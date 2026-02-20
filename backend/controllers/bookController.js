import { validationResult, param, body, query } from "express-validator";
import db from "../db.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};

// GET ALL BOOKS
export const getAllBooks = (req, res) => {
  const sql = "SELECT * FROM book";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching books" });

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

// ADD BOOK
export const addBook = [
  body("title").isLength({ min: 5 }).withMessage("Title min 5 characters"),
  body("author").isLength({ min: 3 }).withMessage("Author min 3 characters"),
  body("publishYear").isInt().withMessage("Year must be number"),
  body("genre").notEmpty().withMessage("Genre required"),
  validate,

  (req, res) => {
    const { title, author, publishYear, genre } = req.body;

    const sql =
      "INSERT INTO book (title, author, publishYear, genre) VALUES (?, ?, ?, ?)";

    db.query(sql, [title, author, publishYear, genre], (err) => {
      if (err) return res.status(500).json({ message: "Insert failed" });

      res.status(201).json({
        success: true,
        message: "Book added successfully",
      });
    });
  },
];

// GET BY ID
export const getBookById = [
  param("id").isInt().withMessage("ID must be integer"),
  validate,

  (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM book WHERE id=?";

    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length === 0)
        return res.status(404).json({ message: "Book not found" });

      res.json({ success: true, data: result[0] });
    });
  },
];

// UPDATE BOOK
export const updateBook = [
  param("id").isInt(),
  body("title").notEmpty(),
  body("author").notEmpty(),
  validate,

  (req, res) => {
    const { id } = req.params;
    const { title, author, publishYear, genre } = req.body;

    const sql =
      "UPDATE book SET title=?, author=?, publishYear=?, genre=? WHERE id=?";

    db.query(sql, [title, author, publishYear, genre, id], (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed" });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Book not found" });

      res.json({ success: true, message: "Book updated successfully" });
    });
  },
];

// DELETE BOOK
export const deleteBook = [
  param("id").isInt(),
  validate,

  (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM book WHERE id=?";

    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Delete failed" });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Book not found" });

      res.json({ success: true, message: "Book deleted" });
    });
  },
];

// FILTER BY GENRE
export const getBookByGenre = [
  query("genre").notEmpty().withMessage("Genre required"),
  validate,

  (req, res) => {
    const { genre } = req.query;
    const sql = "SELECT * FROM book WHERE genre=?";

    db.query(sql, [genre], (err, results) => {
      if (err) return res.status(500).json({ message: "Filter failed" });

      res.json({
        success: true,
        count: results.length,
        data: results,
      });
    });
  },
];