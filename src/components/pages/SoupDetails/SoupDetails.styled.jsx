import styled from 'styled-components';

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
  display: block;
  float: right;
  margin-right: 10px;
  width: 120px;
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
  }
`;
export const Text = styled.section`
  padding: 10px;
`;
export const Title = styled.section`
  display: flex;
  justify-content: space-between;
`;
