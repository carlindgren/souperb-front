import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

import { Switch, List, InputItem, WhiteSpace } from 'antd-mobile';

const Container = styled.div`
  padding: 0 20px;
`;

const SubTitle = styled.div``;
const SubContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const InputContainer = styled.div``;
export default function AddressDetails({ title, goBack }) {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [zipCode, setZipCode] = useState();

  const [port, setPort] = useState();
  const [floor, setFloor] = useState();
  return (
    <Container>
      <Header goBack={goBack} title={'Leveransaddress'} />
      <List renderHeader={() => 'Namn'}>
        <InputItem
          onChange={(value) => setName(value)}
          value={name}
          /* ...getFieldProps('control') */
          placeholder='Zlatan Ibrahimovic'
        ></InputItem>
      </List>
      <List renderHeader={() => 'Address'}>
        <InputItem
          onChange={(value) => setAdress(value)}
          value={adress}
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
              onChange={(value) => setPort(value)}
              value={port}
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
    </Container>
  );
}
