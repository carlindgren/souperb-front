import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { Form, Button } from './auth.styled';
import ErrorNotice from '../misc/ErrorNotice';
const RegisterButton = styled(Button)``;

const RegisterPage = styled.div`
  margin: 0 auto;
  padding: 10px;
  max-width: 800px;
`;
const Title = styled.h2`
  text-align: center;
`;
export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        phoneNumber
      };
      await Axios.post('http://localhost:5000/users/register', newUser);
      const loginRes = await Axios.post('http://localhost:5000/users/login', {
        email,
        password
      });
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

  return (
    <RegisterPage>
      <Title>Registrera dig</Title>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <Form onSubmit={submit}>
        <label htmlFor='register-phoneNumber'>Telefonummer</label>
        <input
          id='register-phoneNumber'
          type='text'
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label htmlFor='register-email'>Email</label>
        <input
          id='register-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='register-password'>Lösenord</label>
        <input
          id='register-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder='Verifiera lösenord'
          type='password'
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor='register-display-name'>Användarnamn</label>
        <input
          id='register-display-name'
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <RegisterButton type='submit' value='register' />
      </Form>
    </RegisterPage>
  );
}
