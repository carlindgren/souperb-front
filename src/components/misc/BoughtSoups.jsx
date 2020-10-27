import React, { useState } from 'react';
import styled from 'styled-components';
import Circle from './Circle';
const Title = styled.h2`
  text-align: center;
`;
const Container = styled.section`
  background-color: ${(props) => props.theme.mainCardBg};
  box-shadow: ${(props) => props.theme.shadow};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  width: 320px;
  height: 160px;
  border-radius: 8px;
`;

export default function BoughtSoups({ number }) {
  const [soupsLeft] = useState(6 - number);
  const circles = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
  ];
  const checkIfBought = (circleNum, num) => {
    if (circleNum === num || circleNum < num) {
      const found = circles.find((elem) => elem.id === num);
      found.bought = true;
      return true;
    }
    return false;
  };

  return (
    <>
      <Title>
        {' '}
        Köp {soupsLeft} {soupsLeft === 1 ? 'soppa' : 'soppor'} till. Få en
        gratis!
      </Title>
      <Container>
        {circles.map(({ id }) => (
          <Circle key={id} p={checkIfBought(id, number)} />
        ))}
      </Container>
    </>
  );
}
