import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function OrderPage(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(()=>{ (async ()=>{ try{ const { data } = await api.get(`/orders/${id}`); setOrder(data); }catch(e){ console.error(e); } })(); },[id]);
  if(!order) return <div>Loading...</div>;
  return <div><h2>Order {order._id}</h2><p>Total: ₹{order.totalPrice}</p><p>Status: {order.status || 'Placed'}</p></div>;
}
