import React from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
const Title = styled.h1`
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;

  padding-top: 10px;
  padding-bottom: 12px;
`;
const BackArrow = styled.span`
  position: absolute;
  padding: 5px;
  top: 15px;
  left: 18px;
`;

const Container = styled.div`
  height: 60px;
  @media (max-width: 800px) {
    box-shadow: ${(props) => props.theme.shadow};
  }
`;
export default function HeaderInfo({ title, goBack, noBackArrow }) {
  return (
    <Container>
      {noBackArrow ? (
        ''
      ) : (
        <BackArrow>
          <LeftOutlined onClick={goBack} />
        </BackArrow>
      )}
      <Title>{title}</Title>
    </Container>
  );
}
