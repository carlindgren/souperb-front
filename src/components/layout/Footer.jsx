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

  //could be 'profile' or 'cart'
  const [clicked, setClicked] = useState('home');
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
  const goToProfile = () => {
    checkUserAndPush('/profile');
    setClicked('profile');
  };

  const goToShoppingCart = () => {
    setClicked('cart');
    checkUserAndPush('/shoppingCart');
  };

  const goToHome = () => {
    setClicked('home');
    history.push('/home');
  };

  const history = useHistory();
  return (
    <NavParent>
      <Nav>
        <HomeOutlined
          style={{ color: clicked === 'home' && 'black' }}
          onClick={goToHome}
        />
        <WholeShoppingIcon>
          {amountInCart > 0 && (
            <Circle>
              <CartCount>{amountInCart}</CartCount>
            </Circle>
          )}

          <ShoppingCartOutlined
            style={{ color: clicked === 'cart' && 'black' }}
            onClick={goToShoppingCart}
          />
        </WholeShoppingIcon>
        <UserOutlined
          style={{ color: clicked === 'profile' && 'black' }}
          onClick={goToProfile}
        />
      </Nav>
    </NavParent>
  );
}
