import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import aloeVeraImage from "./assets/aloe-vera.jpg";
import lavenderImage from "./assets/lavender.jpg";
import mintImage from "./assets/mint.jpg";
import monsteraImage from "./assets/monstera.jpg";
import peaceLilyImage from "./assets/peace-lily.jpg";
import rosemaryImage from "./assets/rosemary.jpg";
import rubberPlantImage from "./assets/rubber-plant.jpg";
import snakePlantImage from "./assets/snake-plant.jpg";
import zzPlantImage from "./assets/zz-plant.jpg";
import "./ProductList.css";

const plantCategories = [
  {
    name: "Air-purifying plants",
    description: "Natural filters that help your favorite rooms feel fresh and calm.",
    plants: [
      { id: "snake-plant", name: "Snake Plant", price: 18, image: snakePlantImage, description: "Architectural leaves and famously easy care." },
      { id: "peace-lily", name: "Peace Lily", price: 24, image: peaceLilyImage, description: "Graceful white blooms with lush green foliage." },
      { id: "rubber-plant", name: "Rubber Plant", price: 28, image: rubberPlantImage, description: "Glossy statement leaves for a bold green corner." },
      { id: "spider-plant", name: "Spider Plant", price: 17, image: mintImage, description: "Striped arching leaves that brighten shelves and desks." },
      { id: "boston-fern", name: "Boston Fern", price: 21, image: monsteraImage, description: "Feathery green fronds that love a humid room." },
      { id: "areca-palm", name: "Areca Palm", price: 30, image: zzPlantImage, description: "Soft palm foliage for an instant indoor retreat." },
    ],
  },
  {
    name: "Aromatic plants",
    description: "Fragrant favorites for a naturally uplifting home.",
    plants: [
      { id: "lavender", name: "French Lavender", price: 16, image: lavenderImage, description: "Soft purple blooms with a soothing fragrance." },
      { id: "rosemary", name: "Rosemary", price: 12, image: rosemaryImage, description: "A bright, woody herb for kitchens and sunny sills." },
      { id: "mint", name: "Garden Mint", price: 10, image: mintImage, description: "Fast-growing freshness for drinks and recipes." },
      { id: "sweet-basil", name: "Sweet Basil", price: 11, image: rubberPlantImage, description: "Tender, fragrant leaves for everyday cooking." },
      { id: "jasmine", name: "Arabian Jasmine", price: 20, image: peaceLilyImage, description: "Delicate white flowers with a rich evening scent." },
      { id: "lemon-balm", name: "Lemon Balm", price: 13, image: rosemaryImage, description: "Citrusy foliage that brings a cheerful aroma indoors." },
    ],
  },
  {
    name: "Low-maintenance plants",
    description: "Resilient companions that look beautiful with minimal fuss.",
    plants: [
      { id: "monstera", name: "Monstera Deliciosa", price: 32, image: monsteraImage, description: "Iconic split leaves with a relaxed tropical feel." },
      { id: "aloe-vera", name: "Aloe Vera", price: 14, image: aloeVeraImage, description: "A sun-loving succulent with sculptural leaves." },
      { id: "zz-plant", name: "ZZ Plant", price: 22, image: zzPlantImage, description: "Polished foliage that thrives in low light." },
      { id: "golden-pothos", name: "Golden Pothos", price: 19, image: monsteraImage, description: "Trailing heart-shaped leaves for effortless greenery." },
      { id: "jade-plant", name: "Jade Plant", price: 15, image: aloeVeraImage, description: "A compact succulent that prefers infrequent watering." },
      { id: "cast-iron-plant", name: "Cast Iron Plant", price: 26, image: rubberPlantImage, description: "Deep green leaves built for shade and busy schedules." },
    ],
  },
];

function CartIcon() {
  return <span className="navbar-cart-icon" aria-hidden="true">🛒</span>;
}

export function Navbar({ onNavigate }) {
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <header className="site-header product-navbar">
      <a className="brand" href="#home" onClick={(event) => handleNavigation(event, "home")}>
        <span className="brand-mark">P</span>
        <span><strong>Paradise</strong><small>Nursery</small></span>
      </a>
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar-link" href="#home" onClick={(event) => handleNavigation(event, "home")}>Home</a>
        <a className="navbar-link" href="#plants" onClick={(event) => handleNavigation(event, "products")}>Plants</a>
        <a className="navbar-link cart-link" href="#cart" onClick={(event) => handleNavigation(event, "cart")} aria-label={`Shopping cart with ${totalItems} plants`}>
          <CartIcon />
          <span>Cart</span>
          <span className="cart-badge" aria-live="polite">{totalItems}</span>
        </a>
      </nav>
    </header>
  );
}

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState(() =>
    Object.fromEntries(cartItems.map((item) => [item.name, true])),
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((previous) => ({ ...previous, [plant.name]: true }));
  };

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="products-page" id="plants">
        <section className="products-intro">
          <p className="eyebrow">The green collection</p>
          <h1>Find your perfect plant</h1>
          <p>Easy-care favorites, fragrant herbs, and leafy statement plants—selected to make growing at home feel effortless.</p>
        </section>

        {plantCategories.map((category) => (
          <section className="product-category" key={category.name} aria-labelledby={category.name.replaceAll(" ", "-")}>
            <div className="category-heading">
              <div>
                <h2 id={category.name.replaceAll(" ", "-")}>{category.name}</h2>
                <p>{category.description}</p>
              </div>
              <span>{category.plants.length} plants</span>
            </div>

            <div className="product-grid">
              {category.plants.map((plant) => (
                <article className="plant-card" key={plant.name}>
                  <div className="plant-image-wrap">
                    <img src={plant.image} alt={`${plant.name} houseplant`} />
                    <span className="price-tag">${plant.price.toFixed(2)}</span>
                  </div>
                  <div className="plant-details">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <button type="button" onClick={() => handleAddToCart(plant)} disabled={addedToCart[plant.name]}>
                      {addedToCart[plant.name] ? "Added to cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="products-cta">
          <div><p className="eyebrow">Ready to grow?</p><h2>Review your leafy picks.</h2></div>
          <button className="secondary-button" type="button" onClick={() => onNavigate("cart")}>View Cart <span aria-hidden="true">→</span></button>
        </section>
      </main>
    </>
  );
}

export default ProductList;
