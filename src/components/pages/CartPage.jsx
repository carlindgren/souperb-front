import React, { useEffect, useContext, useState } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import FoodContext from '../../context/FoodContext';
import Cart from '../misc/Cart';
import PaymentPage from './PaymentPage';
import styled from 'styled-components';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartContext from '../../context/CartContext';
const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  margin-bottom: 60px;
`;
const EmptyCart = styled.main`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  > :first-child {
    font-size: 80px;
  }
`;

export default function ShoppingCart() {
  const { foodData } = useContext(FoodContext);
  const { userData } = useContext(UserContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [cart, setCart] = useState();
  //set to false - only dev state
  const [isPayment, setIsPayment] = useState(true);
  //counting..
  const [totalValue, setTotalValue] = useState();
  const [soupValue, setSoupValue] = useState(0);
  const [sideValue, setSideValue] = useState(0);

  const getCart = async (userId) => {
    const authToken = localStorage.getItem('auth-token');
    const payload = {
      userId
    };
    try {
      const cart = await Axios.get('http://localhost:5000/users/getCart', {
        payload,
        headers: { 'x-auth-token': authToken }
      });
      if (cart.data.cart.length !== 0) {
        setCart(cart.data.cart[0].products);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //effect for getting user.
  useEffect(() => {
    if (userData.user) {
      const { id } = userData.user;
      getCart(id);
    }
  }, [userData]);
  const countTotal = (arr) => {
    let total = 0;
    arr.forEach((elem) => {
      total += elem.price * elem.quantity;
    });
    setTotalValue(total);
  };
  const countSide = (arr) => {
    let total = 0;
    arr.forEach((elem) => {
      if (elem.typeOfProd === 'drink' || elem.typeOfProd === 'bread') {
        total += elem.price * elem.quantity;
      }
    });
    setSideValue(total);
  };
  const countSoup = (arr) => {
    let total = 0;
    arr.forEach((elem) => {
      if (elem.typeOfProd === 'soup') {
        total += elem.price * elem.quantity;
      }
    });
    setSoupValue(total);
  };
  //useEffect, count order on cart update and set state.
  useEffect(() => {
    if (cart) {
      countTotal(cart);
      countSoup(cart);
      countSide(cart);
    }
  }, [cart]);
  const increase = async (userId, productId, typeOfProd, name, price) => {
    const authToken = localStorage.getItem('auth-token');

    const payload = {
      userId,
      productId,
      typeOfProd,
      quantity: 1,
      name,
      price
    };
    try {
      await Axios.post('http://localhost:5000/users/cart', payload, {
        headers: { 'x-auth-token': authToken }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (userId, productId) => {
    const authToken = localStorage.getItem('auth-token');
    const payload = {
      userId,
      productId
    };

    try {
      await Axios.post('http://localhost:5000/users/deleteCartItem', payload, {
        headers: { 'x-auth-token': authToken }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = (userId, prod, type) => {
    remove(userId, prod.productId);

    let newCart = cart.filter((elem) => elem.productId !== prod.productId); // should return array of objs with everything but removed item.
    const count = (cart) => {
      let num = 0;
      cart.forEach((elem) => (num += elem.quantity));
      return num;
    };
    console.log(newCart);
    setCartItems(count(newCart));
    setCart(newCart);
  };
  const increaseOrder = (userId, prod, type) => {
    //works, doesnt rerender page.
    increase(userId, prod.productId, type, prod.name, prod.price, 1);
    setCartItems(cartItems + 1);
    /*******thoughts***** */

    let obj = cart;

    let foundIndex = obj.findIndex((x) => x.productId === prod.productId);
    obj[foundIndex].quantity = obj[foundIndex].quantity + 1;
    //add to db here

    //works

    setCart((cs) => [...obj]);

    /******************* */
    //rerender here
  };

  const decrease = async (
    userId,
    productId,
    typeOfProd,
    name,
    price,
    quantity
  ) => {
    const authToken = localStorage.getItem('auth-token');
    const payload = {
      userId,
      productId,
      typeOfProd,
      quantity,
      name,
      price
    };
    try {
      const res = await Axios.post(
        'http://localhost:5000/users/removeFromCart',
        payload,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseOrder = (userId, prod, type) => {
    decrease(userId, prod.productId, type, prod.name, prod.price, 1);
    setCartItems(cartItems - 1);
    /**********thoughts******** */

    let obj = cart;
    let foundIndex = obj.findIndex((x) => x.productId === prod.productId);

    if (obj[foundIndex].quantity > 1) {
      obj[foundIndex].quantity = obj[foundIndex].quantity - 1;
      //add to db here

      setCart((cs) => [...obj]);
    }
    /************************ */
  };

  const goToPayment = () => {
    setIsPayment(true);
  };
  const goBack = () => {
    setIsPayment(false);
  };

  if (isPayment) {
    return (
      <Container>
        <PaymentPage
          sideValue={sideValue}
          soupValue={soupValue}
          deliveryFee={39}
          totalCartValue={totalValue}
          goBack={goBack}
        />
      </Container>
    );
  }

  return (
    <Container className='topContainer'>
      {cart ? (
        <>
          <Cart
            increaseOrder={increaseOrder}
            decreaseOrder={decreaseOrder}
            removeItem={removeItem}
            sideValue={sideValue}
            soupValue={soupValue}
            totalCartValue={totalValue}
            cart={cart}
            goToPayment={goToPayment}
          />
        </>
      ) : (
        <EmptyCart>
          <ShoppingCartOutlined />
          <span>Ooops.. Det verkar som att din varukorg är tom.</span>
        </EmptyCart>
      )}
    </Container>
  );
}
