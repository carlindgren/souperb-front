import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  cursor: pointer;
`;
export default function Slider() {
  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const handleClick = () => {
    alert('clicked carousel');
  };

  const contentStyle = {
    borderRadius: '8px',
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#DDEBE9'
  };

  return (
    <Container>
      <Carousel afterChange={onChange}>
        <div onClick={handleClick}>
          <h3 style={contentStyle}>
            Dela med en vän för 20% rabatt på nästa köp
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            Köp fem soppor - få den sjätte på köpet.{' '}
          </h3>
        </div>
      </Carousel>
    </Container>
  );
}
