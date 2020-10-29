import React, { useState } from 'react';
import styled from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const Title = styled.h2`
  font-size: 20px;
  padding-top: 8px;
  color: ${(props) => props.theme.mainButtonColor};
`;
const Container = styled.main`
  background-color: ${(props) => props.theme.mainCardBg};

  margin-top: 20px;
  display: flex;
  border-radius: 9px;
  flex-direction: column;
  max-width: 800px;
`;
const TopContainer = styled.section`
  cursor: pointer;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.mainButtonColor};
`;

const Content = styled.div`
  text-align: center;
  > p {
    color: ${(props) => props.theme.mainButtonColor};
    padding: 10px;
  }
`;

export default function Accordion({ title, content, color }) {
  const style = {
    fontSize: '20px'
  };

  const [isShown, setIsShown] = useState(false);
  const toggleContent = () => {
    setIsShown(!isShown);
  };
  return (
    <Container
      style={color && { backgroundColor: { color } }}
      className='container'
    >
      <TopContainer onClick={() => toggleContent()}>
        <Title>{title}</Title>
        {isShown ? (
          <button>
            <DownOutlined style={style} />
          </button>
        ) : (
          <button>
            <UpOutlined style={style} />
          </button>
        )}
      </TopContainer>
      {isShown && (
        <Content>
          <div>{content}</div>
        </Content>
      )}
    </Container>
  );
}
