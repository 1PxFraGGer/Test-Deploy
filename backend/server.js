import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Deploy Practice API is running"
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get products"
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get product"
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || price === undefined || price === "") {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const [result] = await db.query(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description || ""]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      price,
      description: description || ""
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create product"
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || price === undefined || price === "") {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const [result] = await db.query(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      [name, price, description || "", req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update product"
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
