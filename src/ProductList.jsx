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
      {
        id: "snake-plant",
        name: "Snake Plant",
        price: 18,
        image: snakePlantImage,
        description: "Architectural leaves and famously easy care.",
      },
      {
        id: "peace-lily",
        name: "Peace Lily",
        price: 24,
        image: peaceLilyImage,
        description: "Graceful white blooms with lush green foliage.",
      },
      {
        id: "rubber-plant",
        name: "Rubber Plant",
        price: 28,
        image: rubberPlantImage,
        description: "Glossy statement leaves for a bold green corner.",
      },
    ],
  },
  {
    name: "Aromatic plants",
    description: "Fragrant favorites for a naturally uplifting home.",
    plants: [
      {
        id: "lavender",
        name: "French Lavender",
        price: 16,
        image: lavenderImage,
        description: "Soft purple blooms with a soothing fragrance.",
      },
      {
        id: "rosemary",
        name: "Rosemary",
        price: 12,
        image: rosemaryImage,
        description: "A bright, woody herb for kitchens and sunny sills.",
      },
      {
        id: "mint",
        name: "Garden Mint",
        price: 10,
        image: mintImage,
        description: "Fast-growing freshness for drinks and recipes.",
      },
    ],
  },
  {
    name: "Low-maintenance plants",
    description: "Resilient companions that look beautiful with minimal fuss.",
    plants: [
      {
        id: "monstera",
        name: "Monstera Deliciosa",
        price: 32,
        image: monsteraImage,
        description: "Iconic split leaves with a relaxed tropical feel.",
      },
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        price: 14,
        image: aloeVeraImage,
        description: "A sun-loving succulent with sculptural leaves.",
      },
      {
        id: "zz-plant",
        name: "ZZ Plant",
        price: 22,
        image: zzPlantImage,
        description: "Polished foliage that thrives in low light.",
      },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartIds = new Set(cartItems.map((item) => item.id));

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <main className="products-page">
      <section className="products-intro">
        <p className="eyebrow">The green collection</p>
        <h1>Find your perfect plant</h1>
        <p>
          Easy-care favorites, fragrant herbs, and leafy statement plants—selected
          to make growing at home feel effortless.
        </p>
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
            {category.plants.map((plant) => {
              const isInCart = cartIds.has(plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <div className="plant-image-wrap">
                    <img src={plant.image} alt={`${plant.name} houseplant`} />
                    <span className="price-tag">${plant.price.toFixed(2)}</span>
                  </div>
                  <div className="plant-details">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <button type="button" onClick={() => handleAddToCart(plant)} disabled={isInCart}>
                      {isInCart ? "Added to cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section className="products-cta">
        <div>
          <p className="eyebrow">Ready to grow?</p>
          <h2>Review your leafy picks.</h2>
        </div>
        <button className="secondary-button" type="button" onClick={() => onNavigate("cart")}>
          View Cart <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}

export default ProductList;
