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
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.29);
  height: 50px;
  background-color: ${(props) => props.theme.cardBg};
  display: flex;
  justify-content: space-around;
  align-items: center;
  > h3 {
    width: 150px;
    text-align: center;
    color: ${(props) => props.theme.cardColor};
  }
`;
const Subtitle = styled.h4`
  padding: 5px 10px;
`;
const Li = styled.li`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Span = styled.span`
  .increase {
  }
  .decrease {
  }
`;

export default function CartItem({
  title,
  cart,
  removeItem,
  increaseOrder,
  decreaseOrder
}) {
  return (
    <>
      {cart && (
        <Container>
          <Subtitle>{title}</Subtitle>
          <Ul>
            {cart.map((prod) => (
              <Li key={prod._id}>
                <ListContainer>
                  <h3 id='name'>{prod.name}</h3>
                  <h3 id='price'>{prod.price}Kr</h3>
                </ListContainer>
                <ListContainer>
                  <h3 id='amount'>
                    <Span
                      className='decrease'
                      onClick={() => decreaseOrder(prod._id)}
                    >
                      -
                    </Span>
                    {prod.amount}
                    <Span
                      className='increase'
                      onClick={() => increaseOrder(prod._id)}
                    >
                      +
                    </Span>
                  </h3>
                  <h3 id='trashCan' onClick={() => removeItem(prod._id)}>
                    trashcan
                  </h3>
                </ListContainer>
              </Li>
            ))}
          </Ul>
        </Container>
      )}
    </>
  );
}
