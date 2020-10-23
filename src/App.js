import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import SoupDetails from './components/pages/SoupDetails/SoupDetails.jsx';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Address from './components/pages/Address';
import Profile from './components/pages/Profile';
import CartPage from './components/pages/CartPage';
import TrackYourOrder from './components/pages/TrackYourOrder';
import Employee from './Employee/Employee';
import Footer from './components/layout/Footer';

import UserContext from './context/UserContext';
import FoodContext from './context/FoodContext';
import CartContext from './context/CartContext';
import './style.css';
import styled, { ThemeProvider } from 'styled-components';
const theme = {
  cardBg: '#808C6C',
  cardColor: '#F5F1DA',
  mainBg: '#f9f8eb',
  secondaryBg: '#76b39d',
  mainLinkColor: '#fd5f00',
  mainButtonBg: '#FDAC61',
  mainButtonColor: '#F5F1DA',
  mainCardBg: '#438a5e',
  shadow: '0px 3px 4px 1px rgba(0, 0, 0, 0.29)'
};

const AppContainer = styled.div`
  height: 100vh;
  padding-bottom: 60px;
  background-color: #f9f8eb;
`;

/* const theme = {
  mainBg: '#f7fbe1',
  secondaryBg: '#438A5E',
  mainLinkColor: '#BAC964',
  mainButtonBg: '#436F8A',
  mainButtonColor: '#f7fbe1?'
}; */

//header might not be needed as in this state.

const Container = styled.div``;

export default function App() {
  const [address, setAddress] = useState();
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [foodData, setFoodData] = useState({
    soups: undefined,
    breads: undefined,
    drinks: undefined
  });
  const [cartItems, setCartItems] = useState(0);

  //should check if there is any cartItems in db. and set default state.

  const getCart = async () => {
    const authToken = localStorage.getItem('auth-token');
    let cart = await Axios.get('http://localhost:5000/users/getCart', {
      headers: { 'x-auth-token': authToken }
    });
    const count = (cart) => {
      let num = 0;
      cart.forEach((elem) => (num += elem.quantity));
      return num;
    };

    setCartItems(count(cart.data.cart[0].products));
  };

  useEffect(() => {
    //checking if user is logged in, setting auth-token.
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token }
        });
        setUserData({
          ...userData,
          token,
          user: userRes.data
        });
      }
    };
    checkLoggedIn();
    const getFood = async () => {
      const soups = await Axios.get('http://localhost:5000/soups/getall');
      //setSoups(soups.data);
      const drinks = await Axios.get('http://localhost:5000/drinks/getall');
      //setDrinks(drinks.data);
      const breads = await Axios.get('http://localhost:5000/breads/getall');
      //setBread(breads.data);

      setFoodData({
        soups: soups.data,
        drinks: drinks.data,
        breads: breads.data
      });
    };
    getFood();
    getCart();
    let LSaddress = localStorage.getItem('user-address');
    setAddress(LSaddress);
  }, [address]);

  //header layout? perhaps move header into homecomponent.
  if (userData.user !== undefined && userData.user.ROLE === 'souperber') {
    return (
      <>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Employee />
        </UserContext.Provider>
      </>
    );
  }
  return (
    <AppContainer className='AppContainer'>
      <Router>
        <ThemeProvider theme={theme}>
          <CartContext.Provider value={{ cartItems, setCartItems }}>
            <UserContext.Provider value={{ userData, setUserData }}>
              <FoodContext.Provider value={{ foodData, setFoodData }}>
                {/*address && <Header />*/}
                <Container>
                  <Switch>
                    <Route exact path='/' component={Address} />
                    <Route exact path='/home' component={Home} />
                    <Route path='/TrackOrder' component={TrackYourOrder} />
                    <Route path='/SoupDetails' components={SoupDetails} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/CartPage' component={CartPage} />
                  </Switch>
                </Container>
                <Footer />
              </FoodContext.Provider>
            </UserContext.Provider>
          </CartContext.Provider>
        </ThemeProvider>
      </Router>
    </AppContainer>
  );
}
