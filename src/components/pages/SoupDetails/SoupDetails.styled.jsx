import styled from 'styled-components';

export const PriceTag = styled.div`
  h2 {
    font-size: 30px;
    margin-right: 4px;
  }
  span {
    color: grey;
    font-size: 15px;
  }
`;

export const GoBackContainer = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.mainButtonBg};
  border-radius: 10px;
  top: 20px;
  left: 20px;
  border: 0.3px solid white;
  * {
    top: 10px;
    font-weight: bold;
    font-size: 25px;
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

export const Button = styled.button`
  position: absolute;

  bottom: 67px;
  width: 100vw;
  max-width: 800px;
  padding: 0 10px;
  height: 40px;
  background-color: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  &:hover {
    background-color: #e39a57;
  }
  * {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

export const Container = styled.main`
  margin: 0 auto;
  max-width: 800px;
`;
export const ImgContainer = styled.div`
  width: 100vw;
  max-width: inherit;

  overflow: hidden;
  > img  {
    width: 100%;
    max-height: 50vh;
  }
`;
export const Text = styled.section`
  padding: 10px 10px 0 10px;
`;
export const DescriptionTitle = styled.h3`
  font-weight: bold;
`;
export const Title = styled.section``;
