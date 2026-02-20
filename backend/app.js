import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book API Running 🚀");
});

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});