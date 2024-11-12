// Product.js
import React from 'react';
import './Product.css';

const Product = ({ name, price, image }) => (
    <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <h3>{name}</h3>
        <p>₱{price}</p>
        <button className="buy-button">Buy now</button>
    </div>
);

export default Product;
