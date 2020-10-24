import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
import CartSum from '../misc/CartSum';
import { MdDirectionsBike, MdDirectionsWalk } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import moment from 'moment';
import { CreditCardOutlined } from '@ant-design/icons';
import { TimePicker, Steps, Button, message } from 'antd';
import CartContext from '../../context/CartContext';
import { useHistory } from 'react-router-dom';
const DeliveryTitle = styled.h1``;
const DeliveryTypeContainer = styled.section``;
const PayDetails = styled.div`
  position: relative;
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
const ButtonSection = styled.div`
  position: fixed;
  bottom: 70px;
`;
const Container = styled.main`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  max-width: 800px;
  background-color: ${(props) => props.theme.mainBg};
`;
const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.mainButtonColor};
`;
const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const P = styled.p`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  cursor: pointer;
`;
const StepsContainer = styled.section`
  padding: 10px;
  margin-bottom: 60px;
`;
const StepsContent = styled.div`
  margin-top: 10px;
  padding: 20px 0;

  background-color: ${(props) => props.theme.mainCardBg};
  border-radius: 9px;
`;

export default function PaymentPage({
  goBack,
  totalCartValue,
  sideValue,
  soupValue,
  deliveryFee,
  discount,
  userDetails
}) {
  const format = 'HH:mm';
  const history = useHistory();
  let date = new Date();
  const { Step } = Steps;
  const { setCartItems } = useContext(CartContext);
  const stepsTakeAway = [
    {
      title: 'Välj en tid',
      content: 'time'
    },
    {
      title: 'Beställ',
      content: 'sum'
    }
  ];
  const stepsDelivery = [
    {
      title: 'Leveranstid',
      content: 'time'
    },
    {
      title: 'Betalmetod',
      content: 'paymentMethod'
    },
    {
      title: 'Leveransaddress',

      content: 'adress'
    },
    {
      title: 'Betala',
      content: 'sum'
    }
  ];

  const disabledHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23];
  const [user, setUser] = useState();
  const [value, setValue] = useState(null);
  const [current, setCurrent] = useState(0);
  const [deliveryType, setDeliveryType] = useState('takeAway');
  const onChange = (value) => {
    setValue(value);
  };
  const next = () => {
    if (value) {
      setCurrent(current + 1);
      return;
    }
    message.error('du måste fylla i en tid');
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const order = async (userId) => {
    //get user and add 1 to boughtSoups.
    try {
      const authToken = localStorage.getItem('auth-token');
      const payload = {
        userId,
        orderType: deliveryType,
        orderTime: value,
        orderPrice: totalCartValue
      };
      const order = await Axios.put(
        'http://localhost:5000/users/order',
        payload,
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      if (order.data.msg) {
        message.error('Det verkar som att du redan väntar på en soppa');
        history.push('/profile');
      } else {
        history.push('/profile');
        setCartItems(0);
        message.success('din order är nu beställd.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = await Axios.get(
        'http://localhost:5000/users/getuserInformation',
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
    getUser();
  }, []);

  return (
    <Container>
      <Header title='Checkout' goBack={goBack}></Header>
      <DeliveryTypeContainer>
        <h1>Leveransalternativ</h1>
        <P
          style={{
            color: deliveryType === 'takeAway' ? '#438a5e' : 'black',
            borderTop: deliveryType === 'takeAway' ? '1px solid #438a5e' : '',
            borderBottom: deliveryType === 'takeAway' ? '1px solid #438a5e' : ''
          }}
          onClick={() => setDeliveryType('takeAway')}
        >
          <span>
            <MdDirectionsWalk /> Jag hämtar soppan själv{' '}
          </span>
          <span>{deliveryType === 'takeAway' && <AiOutlineCheck />}</span>
        </P>
        <P
          style={{
            color: deliveryType === 'delivery' ? '#438a5e' : 'black',
            borderTop: deliveryType === 'delivery' ? '1px solid #438a5e' : '',
            borderBottom: deliveryType === 'delivery' ? '1px solid #438a5e' : ''
          }}
          onClick={() => setDeliveryType('delivery')}
        >
          <span>
            <MdDirectionsBike /> Jag vill att soppan budas ut{' '}
          </span>
          <span>{deliveryType === 'delivery' && <AiOutlineCheck />}</span>
        </P>
        {/* underneath, steps container  delivery*/}
      </DeliveryTypeContainer>
      {deliveryType === 'delivery' && (
        <StepsContainer>
          <Steps current={current}>
            {stepsDelivery.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <StepsContent className='steps-content'>
            {stepsDelivery[current].content === 'time' && (
              <Content>
                <Title>När ska soppan levereras?</Title>
                <TimePicker
                  defaultValue={moment(date.getHours(), format)}
                  minuteStep={30}
                  value={value}
                  onChange={onChange}
                  format={format}
                  disabledHours={() => disabledHours}
                />
              </Content>
            )}
            {userDetails && stepsDelivery[current].content === 'paymentMethod' && (
              <PayDetails>
                <CreditCardOutlined style={{ color: '#F5F1DA' }} />
                <span className='text'>
                  {userDetails.preferedPayment
                    ? userDetails.preferedPayment
                    : 'ingen betalmetod inlagd'}
                </span>
                <span onClick={() => console.log('clicked')} className='change'>
                  ÄNDRA
                </span>
              </PayDetails>
            )}

            {stepsDelivery[current].content === 'adress' && (
              <div>
                {' '}
                form field with option of writing address and filling in your
                own from profile if there is any
              </div>
            )}
            {stepsDelivery[current].content === 'sum' && (
              <Content>
                <CartSum
                  sideValue={sideValue}
                  soupValue={soupValue}
                  total={totalCartValue}
                  discount={discount}
                />
              </Content>
            )}
          </StepsContent>
          <ButtonSection className='steps-action'>
            {current < stepsDelivery.length - 1 && (
              <Button
                className='primartBtn'
                type='primary'
                onClick={() => next()}
              >
                Nästa
              </Button>
            )}
            {current === stepsDelivery.length - 1 && (
              <Button
                className='primartBtn'
                type='primary'
                onClick={() => order(user._id)}
              >
                Betala
              </Button>
            )}
            {current > 0 && (
              <Button
                className='prevBtn'
                style={{ margin: '0 8px' }}
                onClick={() => prev()}
              >
                Tillbaka
              </Button>
            )}
          </ButtonSection>
        </StepsContainer>
      )}
      {/* underneath, stepscontainer takeAway. */}
      {deliveryType === 'takeAway' && (
        <StepsContainer>
          <Steps current={current}>
            {stepsTakeAway.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <StepsContent className='steps-content'>
            {stepsTakeAway[current].content === 'time' ? (
              <Content>
                <Title>När vill du hämta din soppa?</Title>
                <TimePicker
                  style={{ width: '150px' }}
                  defaultValue={moment(date.getHours(), format)}
                  minuteStep={30}
                  value={value}
                  onChange={onChange}
                  format={format}
                  disabledHours={() => disabledHours}
                />
              </Content>
            ) : (
              <Content>
                <CartSum
                  sideValue={sideValue}
                  soupValue={soupValue}
                  total={totalCartValue}
                  discount={discount}
                />
              </Content>
            )}
          </StepsContent>
          <ButtonSection className='steps-action'>
            {current < stepsTakeAway.length - 1 && (
              <Button type='primary' onClick={() => next()}>
                Nästa
              </Button>
            )}
            {current === stepsTakeAway.length - 1 && (
              <Button type='primary' onClick={() => order(user._id)}>
                Beställ
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Tillbaka
              </Button>
            )}
          </ButtonSection>
        </StepsContainer>
      )}
    </Container>
  );
}
