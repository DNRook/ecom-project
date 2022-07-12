import React from "react";
import { createContext,useContext,useState,useEffect } from "react";
import {toast} from 'react-hot-toast';

const Context=createContext();

export const StateContext=({children})=>{
    const [showCart, setShowCart]=useState(false);
    const [cartItems, setCartItems]=useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;
    
    const toggleCartItemQuanitity = (id, value) => {
      //the find method returns the first value that matches the condition
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        // we are splicing and keeping all the items that arent the one we want
        // (so that we can re-enter it with updated quantities)
        const newCartItems = cartItems[index];
        
        
        if(value === 'inc') {
          newCartItems.quantity=newCartItems.quantity+1;
          //this re-enters that product with a new quanity
          //setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
          //update the total price
          //prevTotalPrice is totalPrice
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            newCartItems.quantity=newCartItems.quantity-1;
            //setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }

    const onAdd =(product,quantity)=>{
        const checkProductInCart= cartItems.find((item)=>item._id===product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        //if the product is already in the cart
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          })
    
          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
          
          setCartItems([...cartItems, { ...product }]);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
      setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
    }

    const incQty =()=>{
        setQty((prevQty)=>prevQty+1)
    }

    const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }

    return(
      //gives the components access to the states and functions
        <Context.Provider
        value={{
          showCart,
          setShowCart,
          cartItems,
          totalPrice,
          totalQuantities,
          qty,
          incQty,
          decQty,
          onAdd,
          onRemove,
          toggleCartItemQuanitity
        }}
      >
        {children}
      </Context.Provider>

    )
}

export const useStateContext = () => useContext(Context);