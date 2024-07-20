import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import currencyFormatter from '../../util/Formatting.js';
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "../CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userCtx.hideCart();
    }

    function handleCheckout() {
        userCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userCtx.progress === 'cart'} onClose={UserProgressContext.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => (<CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
                    onIncrease={() => {
                        cartCtx.addItem(item)
                    }} onDecrease={() => {
                        cartCtx.removeItem(item.id)
                    }} />))}
            </ul>
            <p className="cart-total">{currencyFormatter(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 ? <Button onClick={handleCheckout}>Go to checkout</Button> : null}
            </p>
        </Modal>
    );
}
