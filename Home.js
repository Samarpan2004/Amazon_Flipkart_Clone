import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ (async ()=>{ try{ const res = await api.get('/products'); setProducts(res.data.products||[]); }catch(e){ console.error(e); } })(); },[]);
  return (
    <div>
      <h1>Products</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {products.map(p=>(
          <div key={p._id} style={{border:'1px solid #ddd',padding:12}}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <Link to={`/product/${p._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
