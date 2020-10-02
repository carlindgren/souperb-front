import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingCartOutlined,LeftOutlined  } from '@ant-design/icons';
import Axios from 'axios';
import { message, Modal } from 'antd';
import UserContext from '../../../context/UserContext';
import FoodContext from '../../../context/FoodContext';

import Sides from '../../misc/Sides';

const GoBackContainer = styled.div`
position: fixed;
top: 80px;
left: 20px;
`


const Button = styled.button`
width: 120px;
height: 40px;
  background-color: green;
  border-radius: 8px;
`;
const Container = styled.div`
  width: 100%;
`;
const ImgContainer = styled.div`
  width: 100vw;
  height: 30vh;
  overflow: hidden;
  > img  {
    max-width: 100vw;
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
  const [drinksOrder, setDrinksOrder] = useState([]);
  const [breadOrder, setBreadOrder] = useState([]);

  const createObject = (arr1, arr2) => {
    let arr = [...arr1, ...arr2];
    const obj = {};

    for (const key of arr) {
      obj[key] = 0;
    }
    return obj;
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
  //functionality for removing specific key from an array of keys,
  const removeFromArr = (arr, id) => {
    const index = arr.indexOf(id);
    if (index > -1) {
      arr.splice(index, 1);
    }
  };
  //handling decrease in sides to the order.
  const handleDecrement = (id, kind) => {
    console.log('remove 1 of kind:' + kind + ' with id of: ' + id);
    console.log(id + ' id');

    if (kind === 'bread') {
      removeFromArr(breadOrder, id);
      setAmount((cs) => ({ ...cs, [id]: cs[id] - 1 }));
    } else {
      removeFromArr(drinksOrder, id);
      setAmount((cs) => ({ ...cs, [id]: cs[id] - 1 }));
    }
  };
  //handling increas in sides to order.
  const handleIncrement = (id, kind) => {
    console.log('add 1 of kind:' + kind + ' with id of: ' + id);

    if (kind === 'bread') {
      setBreadOrder(breadOrder.concat(id));
      setAmount((cs) => ({ ...cs, [id]: cs[id] + 1 }));
    } else {
      setDrinksOrder(drinksOrder.concat(id));
      setAmount((cs) => ({ ...cs, [id]: cs[id] + 1 }));
    }
  };
  //popup when adding soup
  const success = (prompt) => {
    message.success(prompt);
  };

  const showModal = () => {
    setVisible(true);
  };

  const addSides = async (userID) => {
    try {
      const authToken = localStorage.getItem('auth-token');
      //first add drinks to drinks array,

      const drinksArray = drinksOrder;
      const breadArray = breadOrder;

      const addDrinkObj = {
        userID,
        drinksArray
      };

      const addBreadObj = {
        userID,
        breadArray
      };
      //second add bread to breads array,
      const res = await Axios.post(
        'http://localhost:5000/users/addBread',
        addBreadObj,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      console.log(res);
      const res2 = await Axios.post(
        'http://localhost:5000/users/addDrinks',
        addDrinkObj,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      console.log(res2);
    } catch (err) {
      console.log(err);
    }
  };
  //close modal on ok click
  const handleOk = async (userID) => {
    addSides(userID);
    //push to cart, if logged in else, register
    //reset state.
    setAmount(
      createObject(
        foodData.drinks.map((elem) => elem._id),
        foodData.breads.map((elem) => elem._id)
      )
    );
    setBreadOrder([]);
    setDrinksOrder([]);

    setVisible(false);
  };
  //close modal on cancel
  const handleCancel = () => {
    setVisible(false);
  };

  const addSoup = async (userID) => {
    try {
      const authToken = localStorage.getItem('auth-token');
      const soupID = soup._id;
      const addSoupObj = {
        soupID,
        userID
      };
      const updatedUser = await Axios.post(
        'http://localhost:5000/users/addsoup',
        addSoupObj,
        { headers: { 'x-auth-token': authToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (userID) => {
    if (userID) {
      addSoup(userID);
      success('added soup to cart');
    } else {
      localStorage.setItem('soup', soup._id);
      success('added soup localstorage - no user found');
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

      <Button onClick={() => addToCart(user.id)}>
        {' '}
        <ShoppingCartOutlined />
        Add To Cart
      </Button>
      <Modal
        title='Sides'
        visible={visible}
        onOk={() => handleOk(user.id)}
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
