import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import styled from 'styled-components';
import { CreditCardOutlined, HomeOutlined } from '@ant-design/icons';
import AddressDetails from '../misc/AddressDetails';
import PaymentMethod from '../misc/PaymentMethod';
import FAQ from './FAQ';
import BoughtSoups from '../misc/BoughtSoups';
import { useHistory } from 'react-router-dom';
//import Change from '../misc/Change';
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
`;
const Title = styled.h1`
  text-align: center;
  margin: 0;
`;
const Subtitle = styled.h2`
  padding: 0 5px;
  color: ${(props) => props.theme.mainButtonColor};
`;
const Content = styled.div`
  margin-bottom: 15px;
  > span {
    padding-left: 10px;
    font-size: 20px;
  }
  .change {
    position: absolute;
    right: 20px;
    top: 10px;
    color: ${(props) => props.theme.mainButtonBg};
    cursor: pointer;
    font-size: 15px;
  }
  .text {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

const Button = styled.button`
  display: block;
  padding: 10px;
  float: right;
  margin-right: 10px;
  font-size: 25px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadow};
  background-color: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
`;
const FAQContainer = styled.section``;
const SubContainer = styled.div`
  position: relative;

  margin: 10px 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.mainCardBg};
`;
const Name = styled.span`
  position: absolute;
  top: 40px;
  left: 50px;
`;
const Adress = styled.span`
  position: absolute;
  top: 65px;
  left: 50px;
`;
const BoughtSoupsContainer = styled.section`
  margin: 0 auto;
`;
export default function Profile() {
  const history = useHistory();

  const { userData, setUserData } = useContext(UserContext);
  const [user, setUser] = useState();
  const [boughtSoups, setBoughtSoups] = useState(0);
  const [activeOrder, setActiveOrder] = useState();
  //should set prefered payment method.
  //use useeffect for this to update in db.

  const [paymentMethod, setPaymentMethod] = useState();

  //checks wheter user clicked link
  const [changePaymentPage, setChangePaymentPage] = useState(false);
  const [changeAddressPage, setChangeAddressPage] = useState(false);
  const [FAQPage, setFAQPage] = useState(false);

  const getActiveOrder = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const order = await Axios.get(
        'http://localhost:5000/users/getOrderInformation',

        { headers: { 'x-auth-token': authToken } }
      );
      if (order) {
        setActiveOrder(order.data.order[order.data.order.length - 1]);
      }
      console.log(activeOrder);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getActiveOrder();
  }, []);
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
      if (preferedPayment !== null) {
        setPaymentMethod(user.preferedPayment);
      }
      setBoughtSoups(user.boughtSoups);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [changeAddressPage]);

  const addPreferedPayment = async (userID) => {
    try {
      const id = userID;
      const authToken = localStorage.getItem('auth-token');
      const preferedPayment = paymentMethod;

      if (preferedPayment !== undefined) {
        const paymentObj = {
          preferedPayment,
          id
        };
        const updatedUser = await Axios.post(
          'http://localhost:5000/users/addPreferedPayment',
          paymentObj,
          { headers: { 'x-auth-token': authToken } }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData.user) {
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
    if (FAQPage) {
      setFAQPage(!FAQPage);
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
    return <AddressDetails userDetails={user.adress} goBack={goBack} />;
  }
  if (user && FAQPage) {
    return <FAQ goBack={goBack} />;
  }
  return (
    <div>
      {user ? (
        <Container>
          <Title>{user.displayName}</Title>
          <SubContainer>
            <Subtitle>Betalmetod</Subtitle>
            <Content>
              <CreditCardOutlined style={{ color: '#F5F1DA' }} />
              <span className='text'>
                {paymentMethod ? paymentMethod : 'ingen betalmetod inlagd'}
              </span>
              <span
                onClick={() => setChangePaymentPage(!changePaymentPage)}
                className='change'
              >
                ÄNDRA
              </span>
            </Content>
          </SubContainer>
          <SubContainer>
            <Subtitle>Leveransadress</Subtitle>
            <Content>
              <HomeOutlined style={{ color: '#F5F1DA' }} />
              <span className='text'>
                {user.adress && user.adress.name !== '' ? (
                  <>
                    <Name>{user.adress.name}</Name>
                    <Adress>{user.adress.street}</Adress>
                  </>
                ) : (
                  <Name>Saknar information..</Name>
                )}
              </span>

              <span
                onClick={() => setChangeAddressPage(!changeAddressPage)}
                className='change'
              >
                ÄNDRA
              </span>
            </Content>
          </SubContainer>
          <FAQContainer>
            <Button onClick={() => setFAQPage(!FAQPage)}>FAQ</Button>
          </FAQContainer>
          {boughtSoups > 0 && (
            <BoughtSoupsContainer>
              <BoughtSoups number={boughtSoups} />
            </BoughtSoupsContainer>
          )}
          {activeOrder && (
            <div>
              <button onClick={() => history.push('/trackOrder')}>
                Track your order
              </button>
              <h2>Du har en aktiv Order</h2>
              <div>Den kommer Att kosta {activeOrder.orderPrice}</div>

              {activeOrder.orderType === 'takeAway' ? (
                <div>Du kan hämta den klockan {activeOrder.orderTime}</div>
              ) : (
                <div>
                  den Kommer att levereras till dig {activeOrder.orderTime}
                </div>
              )}
            </div>
          )}
        </Container>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}
