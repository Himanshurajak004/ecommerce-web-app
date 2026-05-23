import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <>
      <Navbar cartCount={cart.length} />

      <div className="container">
        <h1 className="title">
          E-Commerce Store
        </h1>

        <div className="product-container">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
            >
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />

              <h3>{product.name}</h3>

              <p className="price">
                ₹{product.price}
              </p>

              <p>{product.description}</p>

              <button
                className="btn"
                onClick={() =>
                  addToCart(product)
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;