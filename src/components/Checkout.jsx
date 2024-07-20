import { useContext } from "react";
import CartContext from "../store/CartContext";
import currencyFormatter from '../util/Formatting.js';
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from './UI/Modal.jsx';
export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgrssCtx = useContext(UserProgressContext);



    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgrssCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });


    }
    return <Modal open={userProgrssCtx.progress === 'checkout'} onClose={handleClose}>

        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p> Total Amount: {currencyFormatter(cartTotal)} </p>
            <Input label="Full Name" type="text" id="name" />
            <Input label="E-Mail Address" type="text" id="email" />
            <Input label="Delivery Address" type="textarea" id="street" />
            <div className="control-row">

                <Input label="Postal Code" type="number" min="6" id="postal-code" />
                <Input label="City" type="text" id="city" />

            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}