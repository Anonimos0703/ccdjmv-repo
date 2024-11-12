// ProductList.js
import React from 'react';
import Product from './Product';
import './ProductList.css';
// import dog_food from './assets/dog_food.jpg';

const products = [
    { name: 'Dog Food', price: 130, image: 'dog_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Treats', price: 150, image: 'cat-treats.jpg' },
    { name: 'Dog Treats', price: 140, image: 'dog-treats.jpg' },
    { name: 'Dog Leash', price: 100, image: 'dog-leash.jpg'},
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },
    { name: 'Cat Food', price: 200, image: 'cat_food.jpg' },

    // Add more products as needed
];

const ProductList = () => (
    <section id="products" className="product-list">
        <h2>Products</h2>
        <div className="product-grid">
            {products.map((product, index) => (
                <Product
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                />
            ))}
        </div>
    </section>
);

export default ProductList;
