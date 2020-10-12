import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import FoodContext from '../../context/FoodContext';
import Cart from '../misc/Cart';
import styled from 'styled-components';
const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  height: 86vh;
  margin-bottom: 60px;
`;

export default function ShoppingCart() {
  const { foodData } = useContext(FoodContext);
  const { userData } = useContext(UserContext);
  const [cart, setCart] = useState();

  //counting...
  const [totalValue, setTotalValue] = useState(100);
  const [soupValue, setSoupValue] = useState(0);
  const [sideValue, setSideValue] = useState(0);

  const count = (cart) => {
    console.log('hello');
    console.log(cart);
  };

  const getCart = async (userId) => {
    const authToken = localStorage.getItem('auth-token');
    console.log(authToken);
    console.log(userId);
    const payload = {
      userId
    };
    try {
      const cart = await Axios.get('http://localhost:5000/users/getCart', {
        payload,
        headers: { 'x-auth-token': authToken }
      });
      console.log(cart);
      setCart(cart.data.cart[0].products);
    } catch (err) {
      console.log(err);
    }
  };
  //effect for getting user.
  useEffect(() => {
    if (userData.user) {
      const { id } = userData.user;
      getCart(id);
    }
  }, [userData]);

  const increase = async (userID, id, type) => {};

  const remove = (userID, id, type) => {};
  const removeItem = (userID, prod, type) => {
    //remove(userID, prod._id, type);
  };
  const increaseOrder = async (userID, prod, type) => {
    //works, doesnt rerender page.
    increase(userID, prod._id, type);
    //rerender here
  };

  const decrease = () => {
    console.log('hello World');
  };

  const decreaseOrder = (userID, prod, type) => {
    decrease(prod, type);
    console.log('decreased' + prod._id + 'by 1');
  };

  return (
    <Container>
      {cart ? (
        <>
          <Cart
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            sideValue={sideValue}
            soupValue={soupValue}
            totalCartValue={totalValue}
            cart={cart}
          />
        </>
      ) : (
        'loading...'
      )}
    </Container>
  );
}
