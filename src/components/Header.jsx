import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce((totalItemCount, item) => {
        return totalItemCount + item.quantity;
    }, 0);

    function handleShowCart() {
        userCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} />
                <h1>InstaMeal</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly>Cart {totalCartItems}</Button>
            </nav>
        </header>
    );
}
