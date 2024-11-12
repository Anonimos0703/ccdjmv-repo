import { Link } from 'react-router-dom';

import React from 'react';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="logo">Tails & Whiskers</div>
        <nav>
            <a href="#products">Home</a>
            <a href="/ProductList">Products</a>
            <a href="/appointment">Services</a>
            <a href="#about">About Us</a>
            <button className="login-button">Login</button>
        </nav>
    </header>
);

export default Header;
