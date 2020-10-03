import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';

const Container = styled.main`
  height: 60vh;
  overflow-y: scroll;
`;

export default function Cart({
  increaseOrder,
  decreaseOrder,
  cart,
  totalCartValue,
  soupValue,
  sideValue,
  removeItem
}) {
  return (
    <>
      <Container>
        <CartItem
          increaseOrder={increaseOrder}
          decreaseOrder={decreaseOrder}
          removeItem={removeItem}
          title='Soppor'
          cart={cart.soups}
        />
        <h2>Tillbehör</h2>
        <CartItem
          increaseOrder={increaseOrder}
          decreaseOrder={decreaseOrder}
          removeItem={removeItem}
          title='Dryck'
          cart={cart.drinks}
        />
        <CartItem
          increaseOrder={increaseOrder}
          decreaseOrder={decreaseOrder}
          removeItem={removeItem}
          title='Bröd'
          cart={cart.bread}
        />
      </Container>
      <div>total kostnad exklusive utkörning.{totalCartValue} kr</div>
      <div>Kostnad för dina sides.{sideValue} kr</div>
      <div>Kostnad för din soppa.{soupValue} kr</div>
    </>
  );
}
