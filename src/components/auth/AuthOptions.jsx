import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../context/UserContext';

const StyledNav = styled.nav`
  display: flex;
  height: 100%;

  > button {
    padding: 0 1rem;
    background-color: #bac964;
    color: white;
    font-size: 1.1 rem;
    &:hover {
      background-color: #dcd2cc;
    }
  }
`;
//track user. logged in or not.
export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => {
    history.push('/register');
  };

  const login = () => {
    history.push('/login');
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <StyledNav>
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </StyledNav>
  );
}
