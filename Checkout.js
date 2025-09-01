import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Checkout(){
  const navigate = useNavigate();
  const placeOrder = async ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    if(cart.length===0) return alert('Cart empty');
    const itemsPrice = cart.reduce((s,i)=> s + i.price*i.qty,0);
    const body = { user: null, orderItems: cart.map(i=>({ product: i.product, name: i.name, qty: i.qty, price: i.price })), shippingAddress: {}, paymentMethod: 'COD', itemsPrice, taxPrice:0, shippingPrice:0, totalPrice: itemsPrice };
    try{
      const { data } = await api.post('/orders', body);
      localStorage.removeItem('cart');
      navigate(`/order/${data._id}`);
    }catch(e){
      console.error(e);
      alert('Order failed');
    }
  };
  return <div><h2>Checkout</h2><button onClick={placeOrder}>Place Order (Cash on Delivery)</button></div>;
}
