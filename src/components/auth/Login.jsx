import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
//import CartContext from '../../context/CartContext';
import { Form } from './auth.styled';
import ErrorNotice from '../misc/ErrorNotice';
import { Button } from './auth.styled';
const Container = styled.main`
  margin: 0 auto;
  padding: 10px;
  max-width: 800px;
`;
const Title = styled.h2`
  text-align: center;
`;
const LoginButton = styled(Button)``;

const NoAccount = styled.section`
  text-align: center;
  margin-top: 90px;
  &:hover {
    p {
      color: ${(props) => props.theme.buttonHoverBg};
    }
  }
  > p {
    cursor: pointer;
    margin-bottom: 0;
    font-size: 17px;
    color: ${(props) => props.theme.mainButtonBg};
    text-decoration: underline;
  }
`;

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = {
        email,
        password
      };

      const loginRes = await Axios.post(
        'http://localhost:5000/users/login',
        loginUser
      );
      console.log(loginRes.data.user);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      const message = err.response.data.msg;
      message && setError(message);
    }
  };

  const goToRegister = () => {
    history.push('/register');
  };
  return (
    <Container>
      <Title>Logga in</Title>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <Form onSubmit={submit}>
        <label htmlFor='login-email'>Email</label>
        <input
          id='login-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='login-password'>Lösenord</label>
        <input
          id='login-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <LoginButton type='submit' value='Logga in' />
      </Form>
      <NoAccount onClick={() => goToRegister()}>
        <p>Har du inget konto?</p>
        <p>Registrera Dig</p>
      </NoAccount>
    </Container>
  );
}
