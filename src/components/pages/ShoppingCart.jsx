import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import FoodContext from '../../context/FoodContext';
import Cart from '../misc/Cart';
import styled from 'styled-components';
const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
`;

export default function ShoppingCart() {
  const { userData } = useContext(UserContext);
  const { foodData } = useContext(FoodContext);
  const [cartItems, setCartItems] = useState();
  const [cart, setCart] = useState({});
  const [user, setUser] = useState();

  /****************helper funcs*******************/
  //checks whether object is empty or not.
  function isEmpty(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  //counting occurences of ids in array.
  const countOccurences = (items) => {
    return items.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
  };
  //should create new function with the amounts ordered.
  const newFoodObj = (obj, data) => {
    let arr = [...Object.keys(obj)];
    let newObj = [];
    for (let i = 0; i < arr.length; i++) {
      newObj.push({
        ...data.find((elem) => elem._id === arr[i]),
        amount: obj[arr[i]]
      });
    }
    return newObj;
  };
  /***********************************************/

  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = await Axios.get(
        'http://localhost:5000/users/getUserInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      setUser(user.data.user);
      const { soup, drinks, bread } = user.data.user;
    } catch (err) {
      console.log(err);
    }
  };
  //effect for getting user.
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      const { bread, drinks, soup } = user;
      setCartItems({ bread, drinks, soup });
    }
  }, [user]);

  useEffect(() => {
    if (cartItems && foodData.soups !== undefined) {
      const cartObj = {
        soups: newFoodObj(countOccurences(cartItems.soup), foodData.soups),
        bread: newFoodObj(countOccurences(cartItems.bread), foodData.breads),
        drinks: newFoodObj(countOccurences(cartItems.drinks), foodData.drinks)
      };
      setCart(cartObj);
      //här finns grejerna. gör allt.
      return;
    }
    return;
  }, [cartItems, foodData]);

  return (
    <Container>
      {cart ? (
        <>
          <Cart cart={cart} />
        </>
      ) : (
        'loading...'
      )}
    </Container>
  );
}
