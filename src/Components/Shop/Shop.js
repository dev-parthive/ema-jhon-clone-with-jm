import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


/*
Count : loaded 
Per page(size) : 10 
pages: count / perpage 
currentPage (page)

*/

const Shop = () => {
    // const {products, count} = useLoaderData()
    const [products, setProducts] = useState([])
    const [count ,setCount] = useState(0)
    const [cart, setCart] = useState([])
    const [page, setPage] = useState(0)
    const[size, setSize] = useState(10)
    const [loading, setLoading] = useState(true)

    useEffect( ()=> {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`
        fetch(url)
        .then( res => res.json())
        .then( data =>{
            setLoading(false)
            setCount(data.count)
            setProducts(data.products)
        })
    } , [page, size])

    const pages = Math.ceil(count/size )

    const clearCart = () =>{
        setCart([])
        deleteShoppingCart();
    }
   
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart)
        console.log(ids)
        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(data => {
             console.log('by ids', data)
             for(const id in storedCart){
                const addedProduct = data.find(product => product._id ===  id);
              
                if(addedProduct){
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct)
                }
            }
            setCart(savedCart);
        })
       
      
     }, [products])

//declare a eventhandler 
    const handleAddToCart = (selectedProduct)  =>{
        // console.log(product)
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id)
        if(!exists){
            selectedProduct.quantity = 1;
            newCart =  [...cart,  selectedProduct]
        }else{
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            exists.quantity =  exists.quantity + 1;
            newCart = [...rest, exists]
        }
       setCart(newCart);
        addToDb(selectedProduct._id)
    }

    return (
        <div className='shop-container'>
           {
            loading &&  <p style={{textAlign:'center' , color: 'red'}}>Loading.....</p>
           }
            <div className="products-container">
            {
                products.map(product => <Product handleAddToCart={handleAddToCart} product={product} key={product._id}></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                  <p>  <Link className='review-btn' to="/orders"> <span style={{marginRight: '20px'}}>Review Order</span>
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>

                  </Link></p>
                </Cart>
          
            </div>
            <div className="pagination">
               <div>
               <p>Currently Selected page: {page} and size: {size}</p>
               </div>
              <div>
              {
                    [...Array(pages).keys()].map(number => <button key={number}
                        className={page === number && 'selected'}
                    onClick={()=> setPage(number)}
                    >{number}</button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
              </div>
            </div>
        </div>
    );
};

export default Shop;