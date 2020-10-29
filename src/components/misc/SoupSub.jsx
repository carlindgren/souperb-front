import React from 'react';
import styled from 'styled-components';
const Container = styled.section`
  display: flex;
  max-width: 400px;
  align-items: center;
`;
const Sub = styled.p`
  color: white;
  border-radius: 8px;
  margin-right: 10px;
  padding: 4px;
  height: 32px;
  background-color: ${(props) =>
    props.sub ? props.theme.mainButtonBg : props.theme.mainCardBg};
`;

export default function SoupSub({ subs, kcal }) {
  //[Vegetarisk, Glutenfri]
  //map out and style.
  //Vegetarisk, glutenfri, alt Laktosfri
  return (
    <Container>
      <Sub key={kcal}>{kcal}kcal</Sub>
      {subs.map((i) => (
        <Sub sub key={i}>
          {' '}
          {i}
        </Sub>
      ))}
    </Container>
  );
}
