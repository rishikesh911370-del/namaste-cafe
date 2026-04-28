import React, { useState, useEffect } from "react";

function MenuItem({ item }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.name === item.name);
    if (existing) setQty(existing.qty);
  }, [item.name]);

  const updateCart = (newQty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(i => i.name !== item.name);

    if (newQty > 0) {
      cart.push({ ...item, qty: newQty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty(newQty);

    // trigger UI update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="item-card">

      {/* AI IMAGE */}
      <img
        src={`https://source.unsplash.com/300x200/?${item.name}`}
        alt={item.name}
        className="item-img"
      />

      <div className="item-info">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
      </div>

      {qty === 0 ? (
        <button className="add-btn" onClick={() => updateCart(1)}>
          Add
        </button>
      ) : (
        <div className="qty-control">
          <button onClick={() => updateCart(qty - 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => updateCart(qty + 1)}>+</button>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
