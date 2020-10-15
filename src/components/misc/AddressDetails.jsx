import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
import Axios from 'axios';
import { Switch, List, InputItem, WhiteSpace } from 'antd-mobile';

const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Button = styled.button`
  margin: 10px 0 0 10px;
  background-color: ${(props) => props.theme.mainButtonBg};
  font-size: 15px;
  padding: 6px;
  color: ${(props) => props.theme.mainButtonColor};
  border-radius: 3px;
`;

const SubTitle = styled.div``;
const SubContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export default function AddressDetails({ title, goBack, userDetails }) {
  const { userData } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState();
  const [street, setStreet] = useState();
  const [zipCode, setZipCode] = useState();

  const [portCode, setPortCode] = useState();
  const [floor, setFloor] = useState();

  const [user, setUser] = useState();
  useEffect(() => {
    setUser(userData.user);
    if (userDetails) {
      const { name, street, zipCode, portCode, floor } = userDetails;
      setName(name);
      setStreet(street);
      setZipCode(zipCode);
      setPortCode(portCode);
      setFloor(floor);
    }
    //get information from db and set state,
  }, []);
  const save = async (user) => {
    //save infromation from state to db.
    const authToken = localStorage.getItem('auth-token');
    const payload = {
      userId: user.id,
      name,
      street,
      zipCode,
      portCode,
      floor
    };

    try {
      await Axios.post(
        'http://localhost:5000/users/addAdressDetails',
        payload,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Header goBack={goBack} title={'Leveransaddress'} />
      <List renderHeader={() => 'Namn'}>
        <InputItem
          onChange={(value) => setName(value)}
          value={name}
          placeholder='Zlatan Ibrahimovic'
        ></InputItem>
      </List>
      <List renderHeader={() => 'Address'}>
        <InputItem
          onChange={(value) => setStreet(value)}
          value={street}
          placeholder='Blommensbergsvägen 190'
          data-seed='logId'
        ></InputItem>
      </List>
      <List renderHeader={() => 'Postnummer'}>
        <InputItem
          onChange={(value) => setZipCode(value)}
          value={zipCode}
          placeholder='126 52 Aspudden'
          data-seed='logId'
        ></InputItem>
      </List>
      <SubContainer>
        <SubTitle>bor du i lägenhet?</SubTitle>
        <Switch checked={checked} onChange={() => setChecked(!checked)} />
      </SubContainer>

      {checked && (
        <div>
          {' '}
          <List renderHeader={() => 'Portkod'}>
            <InputItem
              onChange={(value) => setPortCode(value)}
              value={portCode}
              placeholder='2335'
            ></InputItem>
          </List>
          <List renderHeader={() => 'Våning'}>
            <InputItem
              onChange={(value) => setFloor(value)}
              value={floor}
              placeholder='2'
              data-seed='logId'
            ></InputItem>
          </List>
        </div>
      )}

      <Button onClick={() => save(user)}>Spara inställningar</Button>
    </Container>
  );
}
