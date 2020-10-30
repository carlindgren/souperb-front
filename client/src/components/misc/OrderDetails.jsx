import React from 'react';
import styled from 'styled-components';
const Container = styled.section`
  display: flex;

  flex-direction: column;
  * {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;
const StyledSpan = styled.span`
  width: 150px;
`;
const Title = styled.h2`
  text-align: center;
  margin: 0;
`;
const Subtitle = styled.h3`
  text-align: center;
`;
const FlexItem = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Price = styled(FlexItem)``;
const Name = styled(FlexItem)``;
const Adress = styled(FlexItem)``;
const Phone = styled(FlexItem)``;
export default function OrderDetails({
  total,
  deliveryAdress,
  phoneNumber,
  name
}) {
  return (
    <Container>
      <Title>Summering över din order</Title>
      <Subtitle>Se gärna över så att detta ser korrekt ut</Subtitle>
      <div>
        <Price>
          <StyledSpan>Kostnad</StyledSpan>
          <StyledSpan>{total}kr</StyledSpan>
        </Price>
        <Name>
          <StyledSpan>namn</StyledSpan>
          <StyledSpan>{name}</StyledSpan>
        </Name>
        {deliveryAdress && (
          <Adress>
            <StyledSpan>Levereras till</StyledSpan>
            <StyledSpan>{deliveryAdress}</StyledSpan>
          </Adress>
        )}
        {phoneNumber && (
          <Phone>
            <StyledSpan>Vi når dig på</StyledSpan>
            <StyledSpan>{phoneNumber}</StyledSpan>
          </Phone>
        )}
      </div>
    </Container>
  );
}
