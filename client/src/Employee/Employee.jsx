import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import Orders from './Components/Orders';
const EmployeeContainer = styled.div`
  padding-bottom: 60px;
  background-color: ${(props) => props.theme.mainBg};
`;

const Title = styled.h2`
  text-align: center;
`;

const Button = styled.button`
  padding: 4px;
  border-radius: 5px;
  color: ${(props) => props.theme.mainBg};
  background-color: ${(props) => props.theme.mainButtonBg};
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg};
  }
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

  const markFinished = async (orderId) => {
    // set state aswell
    const foundOrder = orders.find((order) => order._id === orderId);
    //clicked order.
    foundOrder.deploymentReady = true;
    setOrders((prev) => [...prev, [foundOrder]]);

    const authToken = localStorage.getItem('auth-token');
    const payload = {
      orderId
    };
    await Axios.post('/users/markfinished', payload, {
      headers: { 'x-auth-token': authToken }
    });
  };
  const getOrders = async () => {
    const authToken = localStorage.getItem('auth-token');
    const orderRes = await Axios.get('/users/getOrders', {
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
      <Button onClick={logout}>logga ut</Button>
      {orders ? (
        <Orders markFinished={markFinished} orders={orders}></Orders>
      ) : (
        'inga ordrar idag'
      )}
    </EmployeeContainer>
  );
}
