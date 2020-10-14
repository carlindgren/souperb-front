import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ShoppingCartOutlined,
  LeftOutlined,
  CodeSandboxCircleFilled
} from '@ant-design/icons';
import Axios from 'axios';
import { message, Modal } from 'antd';
import UserContext from '../../../context/UserContext';
import FoodContext from '../../../context/FoodContext';
import { useHistory } from 'react-router-dom';
import Sides from '../../misc/Sides';

const GoBackContainer = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.mainButtonBg};
  border-radius: 10px;
  top: 20px;
  left: 20px;
  border: 0.3px solid white;
  * {
    top: 10px;
    font-weight: bold;
    font-size: 25px;
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 70px;
  right: 10px;
  width: 120px;
  height: 40px;
  background-color: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
  border-radius: 8px;
  * {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  width: 100%;
`;
const ImgContainer = styled.div`
  width: 100vw;
  height: 50vh;
  overflow: hidden;
  > img  {
    width: 100%;
  }
`;
const Text = styled.section`
  padding: 10px;
`;
export default function Details({ soup, goBack }) {
  const { userData, setUserData } = useContext(UserContext);
  const { foodData, setFoodData } = useContext(FoodContext);
  const { user } = userData;
  //modal
  const [visible, setVisible] = useState();

  const [amount, setAmount] = useState({});

  const history = useHistory();

  const createObject = (arr1, arr2) => {
    //let arr = [...arr1, ...arr2];
    const arrOfObj = [];

    arr1.map((elem, i) => {
      arrOfObj.push({ id: arr1[i], amount: 0, typeOfProd: 'drinks' });
    });
    arr2.map((elem, i) => {
      arrOfObj.push({ id: arr2[i], amount: 0, typeOfProd: 'bread' });
    });
    return arrOfObj;
  };

  //setting up amount to an object of side IDs.
  useEffect(() => {
    setAmount(
      createObject(
        foodData.drinks.map((elem) => elem._id),
        foodData.breads.map((elem) => elem._id)
      )
    );
  }, [foodData]);

  //handling decrease in sides to the order.
  const handleDecrement = (id, kind) => {
    let obj = amount;
    var foundIndex = amount.findIndex((x) => x.id == id);
    if (obj[foundIndex].amount > 0) {
      obj[foundIndex].amount = obj[foundIndex].amount - 1;
      let quantity = obj[foundIndex].amount;

      setAmount((cs) => [...obj]);

      if (kind === 'drink') {
        const found = foodData.drinks.find((elem) => elem._id == id);
        let sideName = found.name;
        let sidePrice = found.price;
        removeSide(user.id, id, kind, sideName, sidePrice, quantity);
      }

      if (kind == 'bread') {
        const found = foodData.breads.find((elem) => elem._id == id);
        let sideName = found.name;
        let sidePrice = found.price;
        removeSide(user.id, id, kind, sideName, sidePrice, quantity);
      }
    }
  };

  //handling increas in sides to order.
  const handleIncrement = (id, kind) => {
    //find name and price send to addSide
    if (kind === 'drink') {
      const found = foodData.drinks.find((elem) => elem._id == id);
      let sideName = found.name;
      let sidePrice = found.price;

      addSide(user.id, id, kind, sideName, sidePrice);
    }
    if (kind == 'bread') {
      const found = foodData.breads.find((elem) => elem._id == id);
      let sideName = found.name;
      let sidePrice = found.price;

      addSide(user.id, id, kind, sideName, sidePrice);
    }
    let obj = amount;
    let foundIndex = amount.findIndex((x) => x.id == id);
    obj[foundIndex].amount = obj[foundIndex].amount + 1;
    //add to db here

    //works
    setAmount((cs) => [...obj]);
  };
  //popup when adding soup
  const success = (prompt) => {
    message.success(prompt);
  };

  const showModal = () => {
    setVisible(true);
  };
  const removeSide = async (
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const addSide = async (userId, productId, typeOfProd, name, price) => {
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
      const res = await Axios.post(
        'http://localhost:5000/users/cart',
        payload,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  //close modal on ok click
  const handleOk = async (userID) => {
    //await addSides(userID);
    //push to cart, if logged in else, register
    //reset state.
    setAmount(
      createObject(
        foodData.drinks.map((elem) => elem._id),
        foodData.breads.map((elem) => elem._id)
      )
    );
    //setBreadOrder([]);
    //setDrinksOrder([]);
    setVisible(false);
    history.push('/cartpage');
  };
  //close modal on cancel
  const handleCancel = () => {
    setVisible(false);
  };
  //new way of adding soup to users individual Cart.
  const addSoup = async (userId) => {
    try {
      const authToken = localStorage.getItem('auth-token');

      //verbose, works for now.
      const payload = {
        userId: userId,
        productId: soup._id,
        quantity: 1,
        typeOfProd: 'Soup',
        name: soup.name,
        price: soup.price
      };

      const cart = await Axios.post(
        'http://localhost:5000/users/cart',
        payload,
        { headers: { 'x-auth-token': authToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (user) => {
    if (user) {
      addSoup(user.id);
      success('added soup to cart');
    } else {
      history.push('/login');
    }
    //open modal for beverage and bread here
    showModal();
    //later on register, or when logging in. remove stuff from localstorage.
  };

  return (
    <Container>
      <ImgContainer>
        <GoBackContainer>
          <LeftOutlined onClick={goBack} />
        </GoBackContainer>
        <img src={soup.imgUrl} />
      </ImgContainer>
      <Text>
        <h1>{soup.name}</h1>
        <h3>Beskrivning</h3>
        <p>{soup.description}</p>
      </Text>

      <Button onClick={() => addToCart(user)}>
        {' '}
        <ShoppingCartOutlined />
        Add To Cart
      </Button>
      <Modal
        title='Tillbehör'
        visible={visible}
        onOk={() => handleOk(user)}
        onCancel={handleCancel}
      >
        <Sides
          amount={amount}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          kind='drink'
          title='Dryck'
          sides={foodData.drinks}
        />
        <Sides
          amount={amount}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          kind='bread'
          title='Bröd'
          sides={foodData.breads}
        />
      </Modal>
    </Container>
  );
}
