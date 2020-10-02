import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
const NavParent = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  background-color: #bdc3cb;
  height: 60px;
  > * {
    font-size: 2rem;
    color: #ede7dc;
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: #ccafa5;
    }
  }
`;

export default function Footer() {
  const { userData, setUserData } = useContext(UserContext);
 /*  useEffect(() => {
    history.push('/home');
  }, [userData]); */

  const checkUserAndPush = (route) => {
    const userLoggedIn = userData.user !== undefined;
    if (userLoggedIn) {
      history.push(route);
    }
  };
  const profile = () => {
    checkUserAndPush('/profile');
  };
  const shoppingCart = () => {
    checkUserAndPush('/shoppingCart');
  };
  const history = useHistory();
  return (
    <NavParent>
      <Nav>
        <HomeOutlined onClick={() => history.push('/home')} />
        <ShoppingCartOutlined onClick={shoppingCart} />
        <UserOutlined onClick={profile} />
      </Nav>
    </NavParent>
  );
}
