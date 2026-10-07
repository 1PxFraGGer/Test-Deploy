import React, { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
  name: "",
  price: "",
  description: ""
};

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage("Could not connect to backend.");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_URL}/api/products/${editingId}`
      : `${API_URL}/api/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setMessage(
        editingId
          ? "Product updated successfully."
          : "Product added successfully."
      );

      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || ""
    });
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setMessage("Product deleted.");
      loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <p>Deploy Practice</p>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#products">Products</a>
        </nav>
      </aside>

      <main className="content">
        <section id="dashboard">
          <p className="eyebrow">ADMIN PANEL</p>
          <h1>Product Management</h1>
          <p>
            Add, edit and delete records stored in MySQL.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
        </section>

        <section className="panel" id="products">
          <h2>
            {editingId ? "Edit Product" : "Add Product"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
                required
              />

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                type="number"
                step="0.01"
                required
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
            />

            <div className="actions">
              <button type="submit">
                {editingId ? "Update Product" : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && (
            <p className="message">{message}</p>
          )}
        </section>

        <section className="panel">
          <h2>Products</h2>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      ₹{Number(product.price).toFixed(2)}
                    </td>
                    <td>{product.description}</td>
                    <td className="action-cell">
                      <button
                        className="edit"
                        onClick={() => startEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
