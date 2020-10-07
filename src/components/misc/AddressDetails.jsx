import React from 'react';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

const Container = styled.div`
  padding: 0 20px;
`;
export default function AddressDetails({ title, goBack }) {
  return (
    <Container>
      <Header goBack={goBack} title={'LeveransAddress'} />
    </Container>
  );
}
