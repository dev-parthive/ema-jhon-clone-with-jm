import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const Shop = () => {
    const products = useLoaderData()
    const [cart, setCart] = useState([])
    // console.log(cart)
    

    const clearCart = () =>{
        setCart([])
        deleteShoppingCart();
    }
   
     useEffect( ()=>{
        const storedCart  = getStoredCart()
        const savedCart = []
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id ===  id);
          
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart);
     }, [products])

//declare a eventhandler 
    const handleAddToCart = (selectedProduct)  =>{
        // console.log(product)
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id)
        if(!exists){
            selectedProduct.quantity = 1;
            newCart =  [...cart,  selectedProduct]
        }else{
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            exists.quantity =  exists.quantity + 1;
            newCart = [...rest, exists]
        }
       setCart(newCart);
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
            {
                products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product.id}></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                  <p>  <Link className='review-btn' to="/orders"> <span style={{marginRight: '20px'}}>Review Order</span>
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>

                  </Link></p>
                </Cart>
          
            </div>
        </div>
    );
};

export default Shop;