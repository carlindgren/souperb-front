import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import CartSum from './CartSum';
import Header from './HeaderInfo';
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
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
  removeItem
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
              deliveryCost={39}
            />
          </CostContainer>
          <Continue>
            <button onClick={() => console.log('continue to payment')}>
              Fortsätt till betalning.
            </button>
          </Continue>
        </Container>
      </>
    );
  }
  return <div>Din varukorg är tom</div>;
}
