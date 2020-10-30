import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1.3rem;
  .plusMinus {
    cursor: pointer;
    padding: 5px;
  }
  .num {
    color: gray;
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
        <span className='plusMinus' onClick={() => handleDecrement(id, kind)}>
          -
        </span>
        <span className='num' id={id}>
          {num}
        </span>
        <span className='plusMinus' onClick={() => handleIncrement(id, kind)}>
          +
        </span>
      </Container>
    );
  }
}
