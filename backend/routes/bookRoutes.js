import express from "express";
import {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
  getBookByGenre,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", addBook);
router.get("/filter", getBookByGenre);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;