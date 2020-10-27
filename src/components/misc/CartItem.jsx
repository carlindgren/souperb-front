import React, { useContext } from 'react';

import styled from 'styled-components';
import UserData from '../../context/UserContext';

import { DeleteOutlined } from '@ant-design/icons';

const Container = styled.div``;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;
const ListContainer = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  height: 150px;
  background-color: ${(props) => props.theme.mainCardBg};
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
const DeleteIcon = styled(DeleteOutlined)`
  font-size: 25px;
  cursor: pointer;
  transition: ease-in-out;
  &:hover {
    color: black;

    transform: scale(1.2, 1.2);
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
                  <h3 className='defaultCursor' id='name'>
                    {prod.name}
                  </h3>
                  <h3 className='defaultCursor' id='price'>
                    {prod.price}Kr
                  </h3>

                  <h3 id='amount'>
                    <Span
                      className='pointer decrease'
                      onClick={() =>
                        decreaseOrder(userData.user.id, prod, type)
                      }
                    >
                      -
                    </Span>
                    <span className={'defaultCursor'}>{prod.quantity}</span>
                    <Span
                      className='pointer increase'
                      onClick={() =>
                        increaseOrder(userData.user.id, prod, type)
                      }
                    >
                      +
                    </Span>
                  </h3>
                  <h3
                    id='trashCanr'
                    onClick={() => removeItem(userData.user.id, prod, type)}
                  >
                    <DeleteIcon />
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
