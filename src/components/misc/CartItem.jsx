import React, { useContext, useState } from 'react';
import FoodContext from '../../context/FoodContext';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  padding: 10px;
  background-color: lightskyblue;
  border-radius: 8px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div``;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default function CartItem({ title, cart }) {
  return (
    <>
      {cart && (
        <Container>
          <div>{title}</div>
          <Ul>
            {cart.map((prod) => (
              <li key={prod._id}>{prod.name}</li>
            ))}
          </Ul>
        </Container>
      )}
    </>
  );
}
