function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H7" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </svg>
  );
}

function Header({ currentPage, cartCount, onNavigate }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate("home")} aria-label="Paradise Nursery home">
        <span className="brand-mark">P</span>
        <span>
          <strong>Paradise</strong>
          <small>Nursery</small>
        </span>
      </button>

      <nav aria-label="Main navigation">
        <button className={currentPage === "home" ? "active" : ""} type="button" onClick={() => onNavigate("home")}>
          Home
        </button>
        <button className={currentPage === "products" ? "active" : ""} type="button" onClick={() => onNavigate("products")}>
          Plants
        </button>
        <button className={`cart-link ${currentPage === "cart" ? "active" : ""}`} type="button" onClick={() => onNavigate("cart")} aria-label={`Shopping cart with ${cartCount} plants`}>
          <CartIcon />
          <span>Cart</span>
          <span className="cart-badge" aria-live="polite">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
