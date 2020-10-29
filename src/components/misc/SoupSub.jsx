import React from 'react';
import styled from 'styled-components';
const Container = styled.section`
  display: flex;
  max-width: 400px;
  align-items: center;
`;
const Sub = styled.div`
  color: white;
  border-radius: 8px;
  margin-left: 10px;
  padding: 4px;
  height: 32px;
  background-color: ${(props) => props.theme.mainButtonBg};
`;

export default function SoupSub({ subs }) {
  //[Vegetarisk, Glutenfri]
  //map out and style.
  //Vegetarisk, glutenfri, alt Laktosfri
  return (
    <Container>
      {subs.map((i) => (
        <Sub key={i}> {i}</Sub>
      ))}
    </Container>
  );
}
