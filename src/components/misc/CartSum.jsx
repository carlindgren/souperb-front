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
  padding: 5px 0 10px 0;
`;
const PriceTag = styled.span``;
const Subtitle = styled.span`
  color: ${(props) => props.discount && 'red'};
`;

export default function CartSum({
  total,
  sideValue,
  soupValue,
  deliveryFee,
  discount
}) {
  return (
    <>
      <Title>Summering</Title>
      <H2>
        <Subtitle>Soppa</Subtitle>
        <PriceTag discount>{soupValue}kr</PriceTag>
      </H2>
      <H2>
        <Subtitle>Tillägg</Subtitle>
        <PriceTag>{sideValue}kr</PriceTag>
      </H2>
      {deliveryFee && (
        <H2>
          <Subtitle>leveranskostnad</Subtitle>
          <PriceTag>{deliveryFee}kr</PriceTag>
        </H2>
      )}
      {discount && (
        <H2>
          <Subtitle discount>Rabatt</Subtitle>
          <PriceTag>20%</PriceTag>
          <PriceTag>-{total * 0.2}kr</PriceTag>
        </H2>
      )}
      <hr style={{ border: '1px solid black', margin: '5px' }} />
      <H2>
        <Subtitle>Totalt</Subtitle>
        <PriceTag>{total * 0.8}kr</PriceTag>
      </H2>
    </>
  );
}
