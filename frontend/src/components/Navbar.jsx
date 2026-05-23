import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  return (
    <nav
      style={{
        background: "black",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>E-Commerce</h2>

      <Link
        to="/cart"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px",
        }}
      >
        🛒 Cart ({cartCount})
      </Link>
    </nav>
  );
}

export default Navbar;