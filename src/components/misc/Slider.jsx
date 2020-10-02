import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.mainBg};
`;
const StyledCarousel = styled(Carousel)`
  cursor: pointer;
  width: 50vw;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 90vw;
  }
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
    color: '#F7FBE1',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#436F8A'
  };

  return (
    <Container>
      <StyledCarousel afterChange={onChange}>
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
      </StyledCarousel>
    </Container>
  );
}
