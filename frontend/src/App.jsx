import React, { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getProducts() {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/products`);

      if (!response.ok) {
        throw new Error("Could not load products");
      }

      const data = await response.json();
      setProducts(data);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Practice Store</h1>
          <p>React Frontend + Express API + MySQL</p>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <p className="tag">DEPLOYMENT PRACTICE</p>
          <h2>Products from your MySQL database</h2>
          <p>
            Every card below is loaded from the backend API.
          </p>
        </section>

        {loading && <p>Loading products...</p>}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid">
            {products.map((product) => (
              <article className="card" key={product.id}>
                <span className="id">#{product.id}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>
                  ₹{Number(product.price).toFixed(2)}
                </strong>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
