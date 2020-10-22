import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LOGO from '../../images/icon/souplogo.png';
import { Link } from 'react-router-dom';
const StyledP = styled.p`
  color: ${(props) => props.theme.mainLinkColor};
  margin: 0;
  .click {
    text-decoration: underline;
  }
`;
const Login = styled.section`
  display: flex;
  text-align: center;
  justify-content: center;
`;
const Title = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    color: ${(props) => props.theme.secondaryBg};
  }
  .souperb {
    font-size: 40px;
    font-weight: bold;
  }
`;
const Offer = styled.section`
  padding: 30px 80px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  > img {
    height: 150px;
    width: 150px;
  }
`;
const Container = styled.main`
  /* background-color: #f7fbe1; */
  background-color: ${(props) => props.theme.mainBg};
  padding: 0px 10px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Form = styled.form`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  outline: none;
  input {
    color: ${(props) => props.theme.mainBg};
    outline: none;
    border: none;
    font-size: 20px;
    letter-spacing: 1.5px;
    padding-left: 10px;
    background-color: ${(props) => props.theme.secondaryBg};
    border-radius: 8px;
    width: 400px;
    height: 40px;
    ::placeholder {
      color: #f7fbe1;
    }
  }
`;

export default function Address() {
  const [address, setAddress] = useState('');
  const history = useHistory();
  let currentAddress = localStorage.getItem('user-address');
  //do below if we wanna render this page.
  //currentAddress = localStorage.setItem('user-address', '');

  const submit = (e) => {
    e.preventDefault();
    setAddress(currentAddress);
    if (address !== '') {
      history.push('/home');
    }
    localStorage.setItem('user-address', address);
  };
  //rerendering users whom already entered address to LS.
  useEffect(() => {
    let address = localStorage.getItem('user-address');
    if (address === 'null' || address === null) {
      localStorage.setItem('user-address', '');
      return;
    }
    if (address !== '') {
      history.push('/home');
    }
  }, [address, history]);

  return (
    <Container>
      <Title>
        <h1 className='welcome'>Välkommen till </h1>
        <h1 className='souperb'>Souperb</h1>
      </Title>
      <Icon>
        <img alt='' src={LOGO} />
      </Icon>
      <Form onSubmit={submit}>
        <input
          type='text'
          placeholder='Skriv in din adress här...'
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form>
      <Offer>
        <h3>
          För att veta om vi kan leverera till dig, så ber vi dig skriva in din
          adress.
        </h3>
      </Offer>

      <Login>
        <Link to='/login'>
          <StyledP>Har du redan ett konto?</StyledP>{' '}
          <StyledP className='link'>Klicka här</StyledP>
        </Link>
      </Login>
    </Container>
  );
}
