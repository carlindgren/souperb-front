import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LOGO from '../../images/icon/souplogo.png';
import { Link } from 'react-router-dom';

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
    margin: 2px;
  }
  .souperb {
    font-size: 40px;
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
  background-color: #ddebe9;
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
    outline: none;
    border: none;
    font-size: 20px;
    letter-spacing: 1.5px;
    padding-left: 5px;
    background-color: #d3f8e2;
    border-radius: 8px;
    width: 400px;
    height: 40px;
  }
`;

export default function Address() {
  const [address, setAddress] = useState();
  const history = useHistory();
  const currentAddress = localStorage.getItem('user-address');

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem('user-address', address);
    history.push('/home');
  };
  if (currentAddress !== 'null') {
    history.push('/home');
  }
  return (
    <Container>
      <Title>
        <h1 className='welcome'>Välkommen till </h1>
        <h1 className='souperb'>Souperb</h1>
      </Title>
      <Icon>
        <img src={LOGO} />
      </Icon>
      <Form onSubmit={submit}>
        <input
          type='text'
          placeholder='adress'
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
          <p>Har du redan ett konto?</p> <p>Klicka här</p>
        </Link>
      </Login>
    </Container>
  );
}
