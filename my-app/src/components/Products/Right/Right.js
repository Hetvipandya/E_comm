import React, { useEffect, useState } from 'react'
import './Right.css';
import { Search, ShoppingCart } from 'react-feather';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Right = ({productsPage}) => {
    const Navigate = useNavigate();

    const cart = async (product) => {
      try {
        const userId = sessionStorage.getItem('userId');
        console.log('User ID from sessionStorage:', userId);
    
        const cartItem = {
          userId: userId,
          image:product.image,
          itemName: product.itemName,
          price: product.price,
          quantity: 1,
          subTotal: product.price,
        };
    
        if (!cartItem.itemName || !cartItem.price) {
          throw new Error('All fields are required');
        }
    
        const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
        console.log('Product added to cart:', response.data);
      } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      }
    };
    
  return (
    <div>
     <input className="input" name="text" placeholder="Search..." type="search"></input>

     <div className="row row-cols-1 row-cols-md-3 g-4 cards">
  
    {productsPage.map((item,index) => {
      return(
        <div className="col" key={item.id}>
        <div className="card">
        <img src={item.image} className="card-img-top" alt="..." height={300} onClick={() => {
          Navigate("/description")
        }}/>
        <div className="card-body">
          <h5 className="card-title">{item.itemName}</h5>
          <p className="card-text">{item.price}</p>
          <ShoppingCart className='cart1' onClick={() => cart(item)}/>
        </div>
      </div>
      </div>
      )
    })}
   
</div>
    </div>
  )
}

export default Right
