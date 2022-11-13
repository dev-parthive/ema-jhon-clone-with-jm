import { getStoredCart } from "../utilities/fakedb"

export const ProdcutsAndCartLoader = async () =>{
    //get products data 
    const productsData = await fetch ('http://localhost:5000/products')
    const {products} = await productsData.json()
    // get cart 
    
    const savedCart = getStoredCart();
    const initialCart = []
    // console.log('savedCart', savedCart)
    // console.log(products)
    for(const id in savedCart){
       const addedProduct  = products.find(product => product._id === id);
       if(addedProduct){
        const quantity = savedCart[id];
        console.log(id, quantity);
        addedProduct.quantity = quantity;
        initialCart.push(addedProduct)

       }
    }
    return {products:products, initialCart:initialCart};
}