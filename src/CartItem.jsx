import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Navbar } from "./ProductList";
import "./CartItem.css";

function CartItem({ onNavigate, onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    window.alert("Checkout functionality is coming soon!");
  };

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="cart-page" id="cart">
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
              <article className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={`${item.name} houseplant`} />
                <div className="cart-item-info">
                  <div className="cart-item-title">
                    <div>
                      <h2 className="cart-item-name">{item.name}</h2>
                      <p className="cart-item-cost">Unit price: ${item.price.toFixed(2)}</p>
                    </div>
                    <strong>Total: ${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button className="cart-item-button cart-item-button-dec" type="button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button className="cart-item-button cart-item-button-inc" type="button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>
                        +
                      </button>
                    </div>
                    <button className="cart-item-delete delete-button" type="button" onClick={() => handleRemove(item)}>
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
              <span>Total Cart Amount</span>
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
    </>
  );
}

export default CartItem;
