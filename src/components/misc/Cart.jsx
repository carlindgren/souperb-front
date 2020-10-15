import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import CartSum from './CartSum';
import Header from './HeaderInfo';

import { ShoppingCartOutlined } from '@ant-design/icons';
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
`;

const EmptyCart = styled.main`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  > :first-child {
    font-size: 80px;
  }
`;
const CostContainer = styled.section`
  margin: 0 10px 10px 10px;
  border-radius: 9px;
  padding: 10px;
  background-color: #e3dfc8;
  //box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.75);
`;
const Title = styled.h2`
  padding: 12px;
`;

const Continue = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  max-width: 800px;

  height: 50px;
  > button {
    width: inherit;
    color: ${(props) => props.theme.mainButtonColor};
    cursor: pointer;
    background-color: ${(props) => props.theme.mainButtonBg};
    letter-spacing: 0.1em;
    font-size: 21px;
    border-radius: 8px 8px 0 0;
  }
`;
export default function Cart({
  increaseOrder,
  decreaseOrder,
  cart,
  totalCartValue,
  soupValue,
  sideValue,
  removeItem,
  goToPayment
}) {
  if (totalCartValue) {
    return (
      <>
        <Container className='Container'>
          <Header title={'Varukorg'} noBackArrow={true} />

          <Title>Soppor</Title>
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'soup'}
            cart={cart.filter((elem) => elem.typeOfProd === 'soup')}
          />
          <Title>Tillbehör</Title>
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'drink'}
            title='Dryck'
            cart={cart.filter((elem) => elem.typeOfProd === 'drink')}
          />
          <CartItem
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            type={'bread'}
            title='Bröd'
            cart={cart.filter((elem) => elem.typeOfProd === 'bread')}
          />

          <CostContainer>
            <CartSum
              total={totalCartValue}
              sideValue={sideValue}
              soupValue={soupValue}
            />
          </CostContainer>
          <Continue>
            <button onClick={() => goToPayment()}>
              Fortsätt till betalning.
            </button>
          </Continue>
        </Container>
      </>
    );
  }
  return (
    <EmptyCart>
      <ShoppingCartOutlined />
      <span>Ooops.. Det verkar som att din varukorg är tom.</span>
    </EmptyCart>
  );
}
