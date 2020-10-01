import React from 'react';
import styled from 'styled-components';
import AddAndRm from './AddAndRm';

const Container = styled.section``;
const Title = styled.h2``;
const Li = styled.li`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
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
      <ul>
        {sides.map((side) => (
          <Li key={side._id}>
            {side.name}{' '}
            <AddAndRm
              amount={amount}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              kind={kind}
              id={side._id}
            />
          </Li>
        ))}
      </ul>
    </Container>
  );
}
