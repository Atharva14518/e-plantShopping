import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const changeQuantity = (item, change) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + change }));
  };

  const handleCheckout = () => {
    window.alert("Checkout functionality is coming soon!");
  };

  return (
    <main className="cart-page">
      <section className="cart-heading">
        <p className="eyebrow">Your selection</p>
        <h1>Shopping Cart</h1>
        <p>{totalItems === 1 ? "1 plant" : `${totalItems} plants`} ready to make your space greener.</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <span aria-hidden="true">🌱</span>
          <h2>Your cart is ready to grow</h2>
          <p>Explore our collection and choose a new leafy companion.</p>
          <button className="primary-button" type="button" onClick={onContinueShopping}>
            Browse Plants
          </button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={`${item.name} houseplant`} />
                <div className="cart-item-info">
                  <div className="cart-item-title">
                    <div>
                      <h2>{item.name}</h2>
                      <p>Unit price: ${item.price.toFixed(2)}</p>
                    </div>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => changeQuantity(item, -1)} aria-label={`Decrease ${item.name} quantity`}>
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item, 1)} aria-label={`Increase ${item.name} quantity`}>
                        +
                      </button>
                    </div>
                    <button className="delete-button" type="button" onClick={() => dispatch(removeItem(item.id))}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary" aria-labelledby="summary-title">
            <p className="eyebrow">Order overview</p>
            <h2 id="summary-title">Cart Summary</h2>
            <div className="summary-row">
              <span>Total plants</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>
            <div className="summary-total">
              <span>Total cost</span>
              <strong>${totalCost.toFixed(2)}</strong>
            </div>
            <button className="checkout-button" type="button" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="continue-button" type="button" onClick={onContinueShopping}>
              ← Continue Shopping
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartItem;
