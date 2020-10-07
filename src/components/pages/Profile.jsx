import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import { CreditCardOutlined, HomeOutlined } from '@ant-design/icons';

import AddressDetails from '../misc/AddressDetails';
import PaymentMethod from '../misc/PaymentMethod';

const Title = styled.h1`
  text-align: center;
  margin: 0;
`;
const Subtitle = styled.h2`
  padding: 0 5px;
`;
const Content = styled.div`
  > span {
    padding-left: 10px;
    font-size: 20px;
  }
`;

const SubContainer = styled.div`
  position: relative;
`;
export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [user, setUser] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [changePayment, setChangePayment] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const payment = null;
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(); // works
  }, []);

  const goBack = () => {
    if (changePayment) {
      setChangePayment(!changePayment);
    }
    if (changeAddress) {
      setChangeAddress(!changeAddress);
    }
  };

  if (user && changePayment) {
    return <PaymentMethod paymentMethod={paymentMethod} goBack={goBack} />;
  }
  if (user && changeAddress) {
    return <AddressDetails goBack={goBack} />;
  }
  return (
    <div>
      {user ? (
        <>
          <Title>{user.displayName}</Title>
          <SubContainer>
            <Subtitle>Betalmetod</Subtitle>
            <Content>
              <CreditCardOutlined className='icon' />{' '}
              <span className='text'>
                {' '}
                {paymentMethod ? paymentMethod : 'ingen betalmetod inlagd'}
              </span>
              <span
                onClick={() => setChangePayment(!changePayment)}
                className='change'
              >
                CHANGE
              </span>
            </Content>
          </SubContainer>
          <SubContainer>
            <Subtitle>Leveransadress</Subtitle>
            <Content>
              <HomeOutlined />
              <span className='text'>Leveransadress</span>
              <span
                onClick={() => setChangeAddress(!changeAddress)}
                className='change'
              >
                CHANGE
              </span>
            </Content>
          </SubContainer>
        </>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}
