import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
`;
const Title = styled.h1``;
const Content = styled.section``;
export default function PaymentPage({ goBack, totalCartValue }) {
  const [user, setUser] = useState();

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
      <Content>{/* preffered payment method, change available. */}</Content>
      <Content>{/* userAddress. if none, set userAddress */}</Content>
      <Content>{/* userAddress. if none, set userAddress */}</Content>
      <Content>
        {/*delivery alternative. takeaway och delivery. change in cost if takeaway.  */}
      </Content>
      <Content>{totalCartValue}</Content>
    </Container>
  );
}
