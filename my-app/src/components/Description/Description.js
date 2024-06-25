import React from 'react';
import './Description.css';
import { ShoppingCart } from 'react-feather';

const Description = () => {
    const Men = require("../Description/card1.jpg");
  return (
    <div>
      <div className="container">
  <div className="row">
    <div className="col-4">
    <img src={Men} className="card-img-top left-img" alt="..." height={600}/>
    </div>

    
    <div className="col-6">
        <h2 className='head'>Professional Suit </h2>
        <p className='detail'>RISANI Men Regular Fit Two Piece Suit</p>
        <p className='price'>Rs.1500</p>
        <button className='add'>Add to Cart</button>        
    </div>
  </div>
</div>
    </div>
  )
}

export default Description
