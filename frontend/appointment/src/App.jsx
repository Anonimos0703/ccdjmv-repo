// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Product from './Components/Product' 

import './App.css';
import AppointmentForm from './Components/appointment';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* Define routes for each page */}
                    
                 
                    <Route path="/appointment" element={<AppointmentForm />} /> 
                    <Route path="/ProductList" element={<ProductList />} />
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
