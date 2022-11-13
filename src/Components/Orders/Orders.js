import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviweItem/ReviewItem';

const Orders = () => {

    const { products , initialCart } = useLoaderData() //{products: products, initialCart: initialCart}
    const [cart, setCart] = useState(initialCart)

    const handleRemoveItem = (id) =>{
        const remaining  =cart.filter(product => product._id !==id);
       setCart(remaining);
        removeFromDb(id);
    }
    const clearCart = () =>{
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className="orders-container">
            {
                cart.map(product => <ReviewItem  handleRemoveItem={handleRemoveItem} product={product} key={product._id}></ReviewItem> )
            }{
                    cart.length === 0 && <h2> No Items for Review. Please purchase somthing! <Link to="/">Shop</Link> </h2> 
            }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}></Cart>
                <Link to='/shipping' className='btn-shipping'><button>Proceed Shipping</button></Link>
            </div>
          
        </div>
    );
};

export default Orders;