import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cart }) => {
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);


  return (
    <div className="navbar">
      <div className="logo">Namaste Cafe</div>

      <div className="navbar-right">
      <span
  className="nav-link"
  onClick={() =>
    navigate("/", { state: { scrollTo: "about" } })
  }
>
  About Us
</span>

        <button onClick={() => navigate("/cart")}>
          Cart 🛒 {totalItems > 0 && `(${totalItems})`}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
