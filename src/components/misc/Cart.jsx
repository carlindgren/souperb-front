import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import CartSum from './CartSum';
const Container = styled.main`
  /*   
  deside on this.
  height: 60%;
  overflow-y: scroll; */
`;
const CostContainer = styled.section`
  margin-bottom: 60px;
  padding-top: 10px;
  background-color: #e3dfc8;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.75);
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
  if (totalCartValue) {
    return (
      <>
        <Container>
          <h2 style={{ textAlign: 'center' }}>Soppor</h2>
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'soup'}
            cart={cart.soups}
          />
          <h2 style={{ textAlign: 'center' }}>Tillbehör</h2>
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'drink'}
            title='Dryck'
            cart={cart.drinks}
          />
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'bread'}
            title='Bröd'
            cart={cart.bread}
          />
        </Container>
        <CostContainer>
          <CartSum
            total={totalCartValue}
            sideValue={sideValue}
            soupValue={soupValue}
            deliveryCost={39}
          />
        </CostContainer>
      </>
    );
  }
  return <div>Din varukorg är tom</div>;
}
