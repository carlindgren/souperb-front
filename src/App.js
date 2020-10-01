import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import SoupDetails from './components/pages/SoupDetails/SoupDetails.jsx';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Address from './components/pages/Address';
import Profile from './components/pages/Profile';
import ShoppingCart from './components/pages/ShoppingCart';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';
import FoodContext from './context/FoodContext';
import './style.css';
import styled from 'styled-components';

//header might not be needed as in this state.

const Container = styled.div`
  max-width: 900px;
`;

export default function App() {
  const address = localStorage.getItem('user-address');

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [foodData, setFoodData] = useState({
    soups: undefined,
    breads: undefined,
    drinks: undefined
  });

  useEffect(() => {
    //checking if user is logged in, setting auth-token.
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      console.log(token);
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
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <FoodContext.Provider value={{ foodData, setFoodData }}>
            {address !== 'null' && <Header />}
            <Container>
              <Switch>
                <Route exact path='/' component={Address} />
                <Route exact path='/home' component={Home} />
                <Route path='/SoupDetails' components={SoupDetails} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/shoppingcart' component={ShoppingCart} />
              </Switch>
            </Container>
            <Footer />
          </FoodContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}
