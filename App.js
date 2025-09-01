import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:12, borderBottom:'1px solid #ddd'}}>
        <Link to="/" style={{marginRight:12}}>Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <div style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
