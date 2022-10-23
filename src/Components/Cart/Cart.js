import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Cart = (props) => {
    const {cart, clearCart, children } = props;
    // console.log(cart)
  let total = 0;
  let oldShipping = 0;
  let quantity = 1;
//   console.log(cart)
  for(const product of cart){
    quantity = quantity + product.quantity


//    set total pirce 
   total = total + product.price * product.quantity ;
    oldShipping = oldShipping + product.shipping ;

  }
  const tax = total * 10/100;
  const grandTotal = total + tax + oldShipping
    return (
        <div className='cart'>
              <h4>This order summary</h4>
            <p>Selected Item: {quantity - 1}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${oldShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total ${grandTotal.toFixed(2)} </h4>
            <button className='clear-cart' onClick={clearCart}>
              <span>Clear Cart</span>
            <FontAwesomeIcon className='arrow-icon' icon={faTrashAlt}></FontAwesomeIcon>
            </button>
            {children}
        </div>
    );
};

export default Cart;