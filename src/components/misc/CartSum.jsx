import React from 'react';
import styled from 'styled-components';
const H2 = styled.h2`
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  * {
    width: 100px;
    color: grey;
  }
`;
const Title = styled.h1`
  text-align: center;
  padding: 27px 0;
`;
export default function CartSum({ total, sideValue, soupValue, deliveryCost }) {
  return (
    <>
      <Title>Summering</Title>
      <H2>
        <span>Soppa</span>
        <span>{soupValue}kr</span>
      </H2>
      <H2>
        <span>Tillägg</span>
        <span>{sideValue}kr</span>
      </H2>
      <H2>
        <span>Leverans</span>
        <span>{deliveryCost}kr</span>
      </H2>
      <hr />
      <H2>
        <span>Totalt</span>
        <span>{total}kr</span>
      </H2>
    </>
  );
}
