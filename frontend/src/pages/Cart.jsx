import { useState } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    alert("Order Placed Successfully ✅");

    localStorage.removeItem("cart");

    setCart([]);
  };

  return (
    <>
      <Navbar cartCount={cart.length} />

      <div className="container">
        <h1 className="title">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <h2>Cart is Empty</h2>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  marginBottom: "20px",
                }}
              >
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />

                <h3>{item.name}</h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Quantity:{" "}
                  {item.quantity || 1}
                </p>

                <button
                  className="btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}

            <h2>
              Total: ₹{totalPrice}
            </h2>

            <button
              className="btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;