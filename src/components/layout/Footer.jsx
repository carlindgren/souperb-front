import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
const NavParent = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
const CartCount = styled.div`
  position: absolute;
  font-size: 10px;
  top: 2px;
  left: 6px;
`;
const Circle = styled.div`
  position: relative;
  top: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.mainLinkColor};
`;
const WholeShoppingIcon = styled.div`
  margin-bottom: 13px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  background-color: ${(props) => props.theme.secondaryBg};
  height: 60px;
  > * {
    font-size: 2rem;
    color: ${(props) => props.theme.mainBg};
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: #ccafa5;
    }
  }
`;

export default function Footer() {
  const { userData, setUserData } = useContext(UserContext);
  const [amountInCart, setAmountInCart] = useState(0);

  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = await Axios.get(
        'http://localhost:5000/users/getUserInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );

      const { bread, drinks, soup } = user.data.user;
      setAmountInCart(bread.length + drinks.length + soup.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //only works when reloading page, need something that knows change
    getUser();
  }, []); //something in here.

  /*  useEffect(() => {
    history.push('/home');
  }, [userData]); */

  const checkUserAndPush = (route) => {
    const userLoggedIn = userData.user !== undefined;
    if (userLoggedIn) {
      history.push(route);
      return;
    }
    history.push('/login');
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
        <WholeShoppingIcon>
          {amountInCart > 0 && (
            <Circle>
              <CartCount>{amountInCart}</CartCount>
            </Circle>
          )}

          <ShoppingCartOutlined onClick={shoppingCart} />
        </WholeShoppingIcon>
        <UserOutlined onClick={profile} />
      </Nav>
    </NavParent>
  );
}
