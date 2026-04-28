import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import menuItems from "../data/menuItems";
import heroBg from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import fssaiLogo from "../assets/fssai.png";


const Menu = ({ cart, addToCart, decreaseQty, openCart }) => {
const navigate = useNavigate();
const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      const section = document.getElementById("about-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

const scrollToMenu = () => {
  const section = document.getElementById("menu-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const categories = [
  { name: "Rolls", img: "/category/rolls.jpg" },
  { name: "Thali", img: "/category/thali.jpg" },
  { name: "Biryani", img: "/category/biryani.jpg" },
  { name: "Combos", img: "/category/combos.jpg" },
  { name: "Snacks & Pasta", img: "/category/snacks.jpg" },
  { name: "Burgers & Sandwich", img: "/category/burger.jpg" },
  { name: "Maggi & Chowmein", img: "/category/noodles.jpg" },
  { name: "Chinese", img: "/category/chinese.jpg" },
  { name: "Indian Veg", img: "/category/veg.jpg" },
  { name: "Indian Non-Veg", img: "/category/nonveg.jpg" },
  { name: "Bread & Rice", img: "/category/rice.jpg" },
  { name: "Beverages", img: "/category/drinks.jpg" }
];

  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  // FILTER CATEGORY6655
  const filteredItems =
    active === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === active);

  // SEARCH FILTER
  const finalItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // GET QTY
  const getQty = (name) => {
    const item = cart.find((i) => i.name === name);
    return item ? item.qty : 0;
  };

  // TOTAL ITEMS
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <>
      {/* ===== HERO ===== */}
      <div className="hero-luxury">

  <video
    className="hero-video"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>


  <div className="hero-overlay">
    <p className="hero-top">WELCOME TO</p>

    <h1>

      Namaste Cafe <br />
    </h1>
<h2>
      Bhagalpur <br />  
    </h2>


    <p className="hero-tagline">BREW • BITE • BELONG</p>

<div style={{
  marginTop: "14px",
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  flexWrap: "wrap"
}}>

  {/* FREE DELIVERY */}
  <span style={{
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    backdropFilter: "blur(6px)"
  }}>
    Free Home Delivery
  </span>

  {/* MIN ORDER */}
  <span style={{
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    backdropFilter: "blur(6px)"
  }}>
    Minimum Order ₹249
  </span>

</div>
</div>
</div>

<div className="menu-heading">
  <h2 className="rotating-wrapper">
    <span className="rotating-text">
      <span>Pick your favorites</span>
      <span>Freshly made</span>
      <span>Delivered fast</span>
    </span>
  </h2>
</div>

      {/* ===== CATEGORY ===== */}
      <div className="category-cards">
  {categories.map((cat, i) => (
    <div
      key={i}
      className={`category-card ${active === cat.name ? "active" : ""}`}
      onClick={() => setActive(cat.name)}
    >
      <img src={cat.img} alt={cat.name} />
      <div className="overlay">
        <h3>{cat.name}</h3>
      </div>
    </div>
  ))}
</div>


      {/* ===== SEARCH ===== */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== MENU GRID ===== */}
      <div id="menu-section" className="menu-grid">
        {finalItems.map((item, i) => {
          const qty = getQty(item.name);

          return (
            <div className="card" key={i}>
              <img src={item.image} className="food-img" alt="" />

              <div className={`food-type ${item.veg ? "veg" : "nonveg"}`}></div>

              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {qty === 0 ? (
                <button
                  className="add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              ) : (
                <div className="qty-box">
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== ABOUT SECTION (FIXED STRUCTURE) ===== */}
      <div id="about-section" className="about-section">

        {/* LEFT */}
        <div className="about-left">
          <h2>A Bit About Us</h2>

          <p>
            At Namaste Café, every dish is a new destination. From crazy fusion snacks and
            Italian pastas to American burgers, Korean ramen and the best rolls in town —
            our menu celebrates global flavors with a Namaste twist.
          </p>

          <p>
            We began with a craving — to serve food that's more than flavor.
            It’s love, laughter, and wanderlust served on a plate.
          </p>

          <div className="about-buttons">

  <a
          href="https://instagram.com/namastecafebhagalpur"
          target="_blank"
          rel="noreferrer"
          className="social-icon"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="instagram" />
        </a>


  <a
    href="https://wa.me/918002733701" 
    target="_blank"
    rel="noopener noreferrer"
    className="btn whatsapp-btn"
  >
    <img 
  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
  alt="whatsapp"
/>

  </a>

<a 
  href="https://share.google/HqyPXD0jAR3CwmAeK" 
  target="_blank" 
  rel="noopener noreferrer"
  className="social-btn google-btn"
>
  <img 
    src="https://cdn-icons-png.flaticon.com/512/300/300221.png" 
    alt="google" 
  />
</a>

</div>
<div className="legal-info">
  <div className="legal-item">
    <img src={fssaiLogo} alt="FSSAI" className="fssai-logo" />
    <span>20425121000783</span>
  </div>

  <div className="legal-item">
    <span>GSTIN: 10AAIHJ9548J1Z0</span>
  </div>
</div>

        </div>

        {/* RIGHT CARD */}
        <div className="about-right">
          <div className="info-card">
            
            <p>⏰ Open Daily: 11:00 AM – 10:00 PM</p>
            <p>🚚 Home Delivery within 4 km</p>
            <p>📞 +91-8002733701</p>
            <p>✉️ contact@namastecafebgp.com</p>
            <p>📍 Dixon Road, Koyla Depo road, Bhagalpur, Bihar - 812002</p>
            <button className="order-btn" onClick={scrollToMenu}>
  Order Now
</button>
          </div>
        </div>

      </div>

      {/* ===== FOOTER (NOW PERFECT) ===== */}
      <div className="footer">
        <h3>Namaste Cafe, Bhagalpur</h3>
        <p>Dixon Road, Koyla Depo Road, Bhagalpur- 812002</p>
        <p>Made with ❤️ in Bhagalpur</p>
      </div>

  {/* FLOATING BUTTONS */}
<div className="floating-social">

  {/* CART BUTTON */}
  <div className="cart-btn" onClick={() => navigate("/cart")}>
    🛒
    <span className="cart-count">
      {totalItems}
    </span>
  </div>

  {/* WHATSAPP BUTTON */}
  <a
    href="https://wa.me/918002733701"
    target="_blank"
    rel="noopener noreferrer"
    className="btn whatsapp-btn"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="whatsapp"
    />
  </a>

</div>

    </>
  );
};

export default Menu;
