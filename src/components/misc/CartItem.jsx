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
const ListContainer = styled.div`
  background-color: #438a5e;
  display: flex;
  justify-content: space-around;
  > h3 {
    color: ${(props) => props.theme.mainBg};
  }
`;
const Li = styled.li`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

export default function CartItem({ title, cart }) {
  return (
    <>
      {cart && (
        <Container>
          <div>{title}</div>
          <Ul>
            {cart.map((prod) => (
              <Li key={prod._id}>
                <ListContainer>
                  <h3 id='name'>{prod.name}</h3>
                  <h3 id='price'>{prod.price}Kr</h3>
                </ListContainer>
                <ListContainer>
                  <h3 id='amount'>{prod.amount}</h3>
                  <h3 id='trashCan'>trashcan</h3>
                </ListContainer>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
    </>
  );
}
