import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Products from './components/Products/Products';
// import Navbat from './components/Navbar/Navbar';

import { Products, Navbar, Cart, Checkout } from './components';        // since we created index.js in components folder having all the components exported there

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        // const cart = await commerce.cart.retrieve();
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);        // this is the cart after the item is added to the cart
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async() => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(() => {                     // useEffect for immediate func call when website loading to fetch.
        fetchProducts();
        fetchCart();
    }, []);


    return (
        <Router>             {/* Router is to switch between pages in website */}
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>

                    <Route exact path="/cart">        {/* when we put '/cart' at the end of link we get cart page */}
                        <Cart 
                            cart={cart} 
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handlEmptyCart={handleEmptyCart}
                        />
                    </Route>

                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}

export default App