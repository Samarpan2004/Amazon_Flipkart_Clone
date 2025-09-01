import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const total = cart.reduce((s,i)=> s + (i.price*i.qty), 0);
  return (
    <div>
      <h2>Cart</h2>
      {cart.map(i=>(
        <div key={i.product}>
          <strong>{i.name}</strong> x {i.qty} = ₹{i.price*i.qty}
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>
      <div style={{marginTop:12}}><Link to="/">Continue Shopping</Link></div>
    </div>
  );
}
