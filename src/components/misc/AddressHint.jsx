import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const Section = styled.section`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1``;
const Container = styled.div``;

//TBC
export default function AddressHint({ name, adress }) {
  return (
    <Container>
      <Title>Leveransaddress</Title>
      <HomeOutlined />
      <Section>
        <p>{name}</p>
        <p>{adress}</p>
      </Section>
    </Container>
  );
}
