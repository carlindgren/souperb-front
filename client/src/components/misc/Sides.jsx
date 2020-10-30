import React from 'react';
import styled from 'styled-components';
import AddAndRm from './AddAndRm';

const Container = styled.section`
  padding: 4px;
`;
const Title = styled.h2`
  text-align: center;
  color: lightgrey;
`;
const Hr = styled.hr`
  margin-bottom: 5px;
`;
const Li = styled.li`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  .product {
    width: 134px;
  }
`;
export default function Sides({
  sides,
  title,
  kind,
  handleIncrement,
  handleDecrement,
  amount
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Hr />
      <Info>
        <span className='product'>Produkt</span>
        <span className='price'>Pris/st</span>
        <span className='amount'>Antal</span>
      </Info>
      <ul>
        {sides.map(({ _id: id, name, price }) => (
          <Li key={id}>
            <div style={{ width: '140px' }}>{name}</div>
            <div>{price}kr</div>
            <AddAndRm
              amount={amount}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              kind={kind}
              id={id}
            />
          </Li>
        ))}
      </ul>
    </Container>
  );
}
