import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
import CartSum from '../misc/CartSum';
import { MdDirectionsBike, MdDirectionsWalk } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
`;
const Title = styled.h1``;
const Content = styled.section``;
const P = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  cursor: pointer;
`;
export default function PaymentPage({
  goBack,
  totalCartValue,
  sideValue,
  soupValue,
  deliveryFee
}) {
  const [user, setUser] = useState();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = Axios.get('/getuserInformation', {
        headers: { 'x-auth-token': authToken }
      });

      setUser(user.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //fetching userInformation for payment details.
    //need paymentinformation, how much to pay and so on.
    getUser();
  }, []);

  return (
    <Container>
      <Header title='Checkout' goBack={goBack}></Header>
      <Content>
        <Title>Leveransalternativ</Title>
        <P
          style={{
            color: deliveryType === 'takeAway' ? '#438a5e' : 'black',
            borderTop: deliveryType === 'takeAway' ? '1px solid #438a5e' : '',
            borderBottom: deliveryType === 'takeAway' ? '1px solid #438a5e' : ''
          }}
          onClick={() => setDeliveryType('takeAway')}
        >
          <div>
            <MdDirectionsWalk /> Jag hämtar soppan själv{' '}
          </div>
          <div>{deliveryType === 'takeAway' && <AiOutlineCheck />}</div>
        </P>
        <P
          style={{
            color: deliveryType === 'delivery' ? '#438a5e' : 'black',
            borderTop: deliveryType === 'delivery' ? '1px solid #438a5e' : '',
            borderBottom: deliveryType === 'delivery' ? '1px solid #438a5e' : ''
          }}
          onClick={() => setDeliveryType('delivery')}
        >
          <div>
            <MdDirectionsBike /> Jag vill att soppan budas ut{' '}
          </div>
          <div>{deliveryType === 'delivery' && <AiOutlineCheck />}</div>
        </P>
      </Content>
      {deliveryType === 'delivery' && (
        <Content>
          <div></div>
          <CartSum
            deliveryFee={deliveryFee}
            sideValue={sideValue}
            soupValue={soupValue}
            total={totalCartValue}
          />
        </Content>
      )}
      {deliveryType === 'takeAway' && (
        <Content>
          <Title>När vill du hämta din soppa?</Title>
        </Content>
      )}
      <Content>{totalCartValue}</Content>
    </Container>
  );
}
