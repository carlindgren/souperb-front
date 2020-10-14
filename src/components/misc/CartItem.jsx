import React, { useContext, useState } from 'react';
import FoodContext from '../../context/FoodContext';
import styled from 'styled-components';
import UserData from '../../context/UserContext';
import Header from '../misc/HeaderInfo';
import { DeleteOutlined } from '@ant-design/icons';
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
  height: 150px;
  background-color: #438a5e;
  //background-color: ${(props) => props.theme.secondaryBg};
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: center;
  border-radius: 9px;
  > h3 {
    width: 49%;
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
  decreaseOrder,
  type
}) {
  const { userData } = useContext(UserData);
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

                  <h3 id='amount'>
                    <Span
                      className='decrease'
                      onClick={() =>
                        decreaseOrder(userData.user.id, prod, type)
                      }
                    >
                      -
                    </Span>
                    {prod.quantity}
                    <Span
                      className='increase'
                      onClick={() =>
                        increaseOrder(userData.user.id, prod, type)
                      }
                    >
                      +
                    </Span>
                  </h3>
                  <h3
                    id='trashCan'
                    onClick={() => removeItem(userData.user.id, prod, type)}
                  >
                    <DeleteOutlined style={{ fontSize: '25px' }} />
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
