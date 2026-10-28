import { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import CartItem from "./CartItem";
import Header from "./Header";
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "home") {
    return (
      <main className="landing-page">
        <div className="background-image" aria-hidden="true" />
        <div className="landing-overlay" />
        <Header currentPage={currentPage} cartCount={cartCount} onNavigate={navigate} />
        <div className="landing-content">
          <section className="hero" aria-labelledby="hero-title">
            <p className="hero-kicker">Plants for happier spaces</p>
            <h1 id="hero-title">Welcome to Paradise Nursery</h1>
            <p className="hero-copy">
              Thoughtfully selected greenery to refresh your home, lift your mood,
              and make every corner feel alive.
            </p>
            <button className="primary-button" type="button" onClick={() => navigate("products")}>
              Get Started <span aria-hidden="true">→</span>
            </button>
          </section>
          <AboutUs />
        </div>
      </main>
    );
  }

  return (
    <div className="app-shell">
      {currentPage === "products" ? (
        <ProductList onNavigate={navigate} />
      ) : (
        <CartItem onNavigate={navigate} onContinueShopping={() => navigate("products")} />
      )}
    </div>
  );
}

export default App;
