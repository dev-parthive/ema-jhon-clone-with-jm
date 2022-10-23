import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCoffee, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css'
const ReviewItem = ({ product , handleRemoveItem } ) => {
    // console.log(product)
    const { id, img, name, price, quantity, seller, shipping, stock } = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <h3>{name}</h3>
                    <p>price: ${price}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>Quantity: {quantity}</p>
                </div>
                <div className="delete-button">
                    <button  onClick={() => handleRemoveItem(id)} className='btn-delete'><FontAwesomeIcon  className='delete-icon' icon={faTrashAlt} /></button>
                    
                </div>
            </div>
        </div>
    );
};

export default ReviewItem; <h2>This is Reviwe prodcut</h2>