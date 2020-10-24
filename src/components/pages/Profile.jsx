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
  margin-bottom: 60px;
`;
const Title = styled.h1`
  text-align: center;
  margin: 0;
`;
const Subtitle = styled.h2`
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
    &:hover {
      color: #e39a57;
    }
    font-size: 15px;
  }
  .text {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;
const P = styled.p`
  margin: 0;
  padding: 0;
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
  &:hover {
    background-color: #e39a57;
  }
`;

const FAQBtn = styled(Button)`
  box-shadow: ${(props) => props.theme.shadow};
  display: block;
  float: right;
  margin: 10px 10px 10px 10px;
  font-size: 25px;
  border-radius: 8px;
  padding: 10px;
`;
const TrackBtn = styled(Button)`
  display: block;
  float: right;
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 5px;
`;
const ActiveOrderContainer = styled.section`
  background-color: ${(props) => props.theme.mainCardBg};
  margin: 10px 10px;
  padding: 10px;
  border-radius: 8px;
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
  margin: 5px auto;
`;

export default function Profile() {
  const history = useHistory();

  const { userData } = useContext(UserContext);
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
      const authToken = localStorage.getItem('auth-token');

      if (paymentMethod !== undefined) {
        const paymentObj = {
          preferedPayment: paymentMethod,
          id: userID
        };
        await Axios.post(
          'http://localhost:5000/users/addPreferedPayment',
          paymentObj,
          { headers: { 'x-auth-token': authToken } }
        );
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData.user) {
      addPreferedPayment(userData.user.id);
    }
  }, [paymentMethod, userData.user]);

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
          {activeOrder && activeOrder.active && (
            <ActiveOrderContainer>
              <Subtitle>Du har en aktiv Order</Subtitle>
              <P>Den kommer Att kosta {activeOrder.orderPrice} kr</P>

              {activeOrder.orderType === 'takeAway' ? (
                <P>Du kan hämta den klockan {activeOrder.orderTime}</P>
              ) : (
                <P>den Kommer att levereras till dig {activeOrder.orderTime}</P>
              )}
              <TrackBtn onClick={() => history.push('/trackOrder')}>
                Följ Order
              </TrackBtn>
            </ActiveOrderContainer>
          )}

          {boughtSoups > 0 && (
            <BoughtSoupsContainer>
              <BoughtSoups number={boughtSoups} />
            </BoughtSoupsContainer>
          )}
          <FAQContainer>
            <FAQBtn onClick={() => setFAQPage(!FAQPage)}>FAQ</FAQBtn>
          </FAQContainer>
        </Container>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
}
