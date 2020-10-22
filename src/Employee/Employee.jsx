import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import Orders from './Components/Orders';
const EmployeeContainer = styled.div`
  height: 100vh;
  padding-bottom: 60px;
  background-color: #f9f8eb;
`;

const Title = styled.h2`
  text-align: center;
`;

export default function Employee() {
  const { setUserData } = useContext(UserContext);
  const [orders, setOrders] = useState();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
  };
  const getOrders = async () => {
    const authToken = localStorage.getItem('auth-token');
    const orderRes = await Axios.get('http://localhost:5000/users/getOrders', {
      headers: { 'x-auth-token': authToken }
    });
    setOrders(orderRes.data.orders);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <EmployeeContainer>
      <Title>Dagens Order</Title>
      <button onClick={logout}>logga ut</button>
      {orders ? <Orders orders={orders}></Orders> : 'inga ordrar idag'}
    </EmployeeContainer>
  );
}
