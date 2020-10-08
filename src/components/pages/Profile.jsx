import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import { CreditCardOutlined, HomeOutlined } from '@ant-design/icons';
import AddressDetails from '../misc/AddressDetails';
import PaymentMethod from '../misc/PaymentMethod';
//import Change from '../misc/Change';
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

  //should set prefered payment method.
  //use useeffect for this to update in db.
  const [paymentMethod, setPaymentMethod] = useState();

  //checks wheter user clicked link
  const [changePaymentPage, setChangePaymentPage] = useState(false);
  const [changeAddressPage, setChangeAddressPage] = useState(false);

  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const userObj = await Axios.get(
        'http://localhost:5000/users/getUserInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      const { user } = userObj.data;
      setUser(user);
      const { preferedPayment } = user;
      console.log(preferedPayment);
      if (user.preferedPayment) {
        console.log('reached');
        setPaymentMethod(user.preferedPayment);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(); // works
  }, []);

  /****** */
  const addPreferedPayment = async (userID) => {
    try {
      const id = userID;
      const authToken = localStorage.getItem('auth-token');
      const preferedPayment = paymentMethod;

      const paymentObj = {
        preferedPayment,
        id
      };
      const updatedUser = await Axios.post(
        'http://localhost:5000/users/addPreferedPayment',
        paymentObj,
        { headers: { 'x-auth-token': authToken } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  /********* */
  useEffect(() => {
    //if paymentmethod changed, update db.

    if (userData.user) {
      //get id from context instead.
      addPreferedPayment(userData.user.id);
    }
  }, [paymentMethod]);

  const goBack = () => {
    if (changePaymentPage) {
      setChangePaymentPage(!changePaymentPage);
    }
    if (changeAddressPage) {
      setChangeAddressPage(!changeAddressPage);
    }
  };

  const onChangePayment = (label) => {
    setPaymentMethod(label);
  };

  if (user && changePaymentPage) {
    return (
      <PaymentMethod
        paymentMethod={paymentMethod}
        onChangePayment={onChangePayment}
        paymentMethod={paymentMethod}
        goBack={goBack}
      />
    );
  }
  if (user && changeAddressPage) {
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
              {/*   <Change
                onClick={setChangePaymentPage(!changePaymentPage)}
                title={'Change'}
              /> */}
              <span
                onClick={() => setChangePaymentPage(!changePaymentPage)}
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
                onClick={() => setChangeAddressPage(!changeAddressPage)}
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
