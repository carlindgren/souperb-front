import React from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
const Title = styled.h1`
  text-align: center;
  margin-top: 2px;
  margin-bottom: 0px;
  border-bottom: 0.2px solid black;
  padding-bottom: 12px;
`;
const BackArrow = styled.span`
  position: absolute;
  padding: 5px;
  top: 15px;
  left: 18px;
`;

const Container = styled.div`
  height: 50px;
`;
export default function HeaderInfo({ title, goBack }) {
  return (
    <Container>
      <BackArrow>
        <LeftOutlined onClick={goBack} />
      </BackArrow>
      <Title>{title}</Title>
    </Container>
  );
}
