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
  background-image: linear-gradient(to right, #436f8a, #438a5e);

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
  const { userData } = useContext(UserContext);
  const [amountInCart, setAmountInCart] = useState(0);

  const history = useHistory();

  //could be 'profile' or 'cart'
  const [clicked, setClicked] = useState(history.location.pathname);
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
    getUser();
  }, []);

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
    setClicked('/profile');
  };

  const goToShoppingCart = () => {
    setClicked('/CartPage');
    checkUserAndPush('/CartPage');
  };

  const goToHome = () => {
    setClicked('/home');
    history.push('/home');
  };

  return (
    <NavParent>
      <Nav>
        <HomeOutlined
          style={{ color: clicked === '/home' && '#FDAC61' }}
          onClick={goToHome}
        />
        <WholeShoppingIcon>
          {amountInCart > 0 && (
            <Circle>
              <CartCount>{amountInCart}</CartCount>
            </Circle>
          )}

          <ShoppingCartOutlined
            style={{ color: clicked === '/CartPage' && '#FDAC61' }}
            onClick={goToShoppingCart}
          />
        </WholeShoppingIcon>
        <UserOutlined
          style={{ color: clicked === '/profile' && '#FDAC61' }}
          onClick={goToProfile}
        />
      </Nav>
    </NavParent>
  );
}
