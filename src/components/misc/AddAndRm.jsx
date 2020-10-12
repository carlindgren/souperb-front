import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.2rem;
  .minus {
  }
  .plus {
  }
`;
export default function AddandRm({
  id,
  kind,
  handleDecrement,
  handleIncrement,
  amount
}) {
  if (amount && id) {
    let num = amount.find((elem) => elem.id === id).amount;

    return (
      <Container>
        <span className='minus' onClick={() => handleDecrement(id, kind)}>
          -
        </span>
        <span id={id}>{num}</span>
        <span className='plus' onClick={() => handleIncrement(id, kind)}>
          +
        </span>
      </Container>
    );
  }
}
