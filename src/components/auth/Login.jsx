import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { Form } from './auth.styled';
import ErrorNotice from '../misc/ErrorNotice';

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
    <div>
      <h2>Logga in</h2>
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

        <input type='submit' value='Logga in' />
      </Form>
    </div>
  );
}
