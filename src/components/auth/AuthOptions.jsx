import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../../context/UserContext';

const StyledNav = styled.nav`
  display: flex;
  height: 100%;

  > button {
    padding: 0 5px;
    background-color: #fdac61;
    color: #f9f8eb;
    font-size: 1.1 rem;
    &:hover {
      background-color: #e39a57;
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
        <button onClick={logout}>Logga ut</button>
      ) : (
        <>
          <button onClick={register}>Registrera dig</button>
          <button onClick={login}>Logga in </button>
        </>
      )}
    </StyledNav>
  );
}
