import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{ (async ()=>{ try{ const { data } = await api.get(`/products/${id}`); setProduct(data); }catch(e){ console.error(e); } })(); },[id]);
  if(!product) return <div>Loading...</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <button onClick={()=>{ localStorage.setItem('cart', JSON.stringify([{ product: product._id, name: product.name, qty:1, price: product.price }])); navigate('/cart'); }}>Add to cart</button>
    </div>
  );
}
