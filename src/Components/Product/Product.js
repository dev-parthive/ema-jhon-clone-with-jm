import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const  Product = (props) => {
    const {product, handleAddToCart} = props;
    const {category , img, id, name, price, quantity, ratings, ratingsCount, seller, shipping, stock} = product;
    
    // console.log(props)
        return (
        <div className='product'>
           <img src={img} alt="product-img" />
           <div className='product-info' style={{marginLeft: '20px'}}>
           <p className='product-name'> {name}</p>
           <p>Price: ${price}</p>
           <p>Manufacturer: {seller}</p>
           <p>Rating {ratings} stars</p>
           </div>
           <button  onClick={() => handleAddToCart(product)} className='add-to-cart-btn'>
            <span>Add to cart</span>
            <FontAwesomeIcon icon={faShoppingCart} />
           </button>

        </div>
    );
};

export default Product;