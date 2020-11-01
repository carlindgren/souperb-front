import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
import { MdDirectionsBike, MdDirectionsWalk } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import moment from 'moment';
import OrderDetails from '../misc/OrderDetails';
import { CreditCardOutlined } from '@ant-design/icons';
import { TimePicker, Steps, Button, message, Select, Form, Input } from 'antd';
import CartContext from '../../context/CartContext';
import { useHistory } from 'react-router-dom';

const DeliveryTypeContainer = styled.section``;
const PayDetails = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > span {
    padding-left: 10px;
    font-size: 20px;
  }
  .text {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;
const AdressDetails = styled(PayDetails)``;
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

const FormContainer = styled.section`
  width: 85%;
`;
const FillBtn = styled.button`
  color: ${(props) => props.theme.mainButtonColor};
  background-color: ${(props) => props.theme.mainButtonBg};
  padding: 5px;
  border-radius: 4px;
  margin-bottom: 4px;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg};
  }
`;

export default function PaymentPage({
  goBack,
  totalCartValue,
  sideValue,
  soupValue,
  deliveryFee,
  discount,
  userDetails,
  cart
}) {
  const { Option } = Select;
  const format = 'HH:mm';
  const history = useHistory();
  let date = new Date();
  const { Step } = Steps;
  const { setCartItems } = useContext(CartContext);
  const [form] = Form.useForm();

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
      title: 'Tid',
      content: 'time'
    },
    {
      title: 'Betalmetod',
      content: 'paymentMethod'
    },
    {
      title: 'Address',

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
  const [inputValues, setInputValues] = useState({
    name: undefined,
    street: undefined,
    zipCode: undefined,
    phoneNumber: undefined,
    portCode: undefined,
    floor: undefined
  });
  const [deliveryType, setDeliveryType] = useState('takeAway');
  const [paymentMethod, setPaymentMethod] = useState(
    userDetails.preferedPayment || undefined
  );
  const handleChange = (value) => {
    setPaymentMethod(value);
  };
  const onChange = (value) => {
    setValue(value);
  };
  const next = (current) => {
    if (stepsDelivery[current].content === 'time' && !value) {
      message.error('du måste fylla i en tid');
      return;
    }
    if (stepsDelivery[current].content === 'adress') {
      const { street, name, zipCode, phoneNumber } = inputValues;

      if (!street || !name || !zipCode || !phoneNumber) {
        message.error('Fyll i några fält till');
        return;
      }
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const delivery = (value) => {
    setCurrent(0);
    setDeliveryType(value);
  };

  const onInputChange = (e, inputType) => {
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [inputType]: value }));
  };

  const fillFields = () => {
    setInputValues({
      ...userDetails.adress,
      phoneNumber: '0' + userDetails.phoneNumber
    });
  };
  const getLatLng = async () => {
    try {
      if (inputValues.street) {
        const doc = await Axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${inputValues.street}%2C+Stockholm&apiKey=ZJN5huejZ9HJIoIDJv4bErkkwITySR_j3PIRdK0PefQ`
        );

        const { lat, lng } = doc.data.items[0].position;
        return [lat, lng];
      }
    } catch (err) {
      console.log(err);
    }
  };
  const order = async (userId) => {
    //get latlng from adress.

    try {
      const latlng = await getLatLng(inputValues.street);

      const authToken = localStorage.getItem('auth-token');
      const payload = {
        userId,
        orderType: deliveryType,
        orderTime: value,
        orderPrice: totalCartValue,
        phoneNo: userDetails.phoneNumber,
        portCode: inputValues.portCode,
        floor: inputValues.floor,
        street: inputValues.street,
        latlng,
        name: inputValues.name,
        cartItems: cart
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
          onClick={() => delivery('takeAway')}
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
          onClick={() => delivery('delivery')}
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
                  placeholder={'Välj en tid'}
                  value={value}
                  onChange={onChange}
                  format={format}
                  disabledHours={() => disabledHours}
                />
              </Content>
            )}
            {userDetails && stepsDelivery[current].content === 'paymentMethod' && (
              <PayDetails>
                <Title>Vilken betalmetod vill du använda?</Title>
                <Select
                  defaultValue={
                    (paymentMethod && paymentMethod) || 'Välj Betalmetod'
                  }
                  style={{ width: 160 }}
                  onChange={handleChange}
                >
                  <Option value='Swish'>
                    <CreditCardOutlined /> Swish
                  </Option>
                  <Option value='Kort'>
                    <CreditCardOutlined /> Kort
                  </Option>
                  <Option value='Klarna'>
                    <CreditCardOutlined /> Klarna
                  </Option>
                </Select>
              </PayDetails>
            )}

            {stepsDelivery[current].content === 'adress' && (
              <AdressDetails>
                <Title>
                  Vart ska soppan ta vägen? hem till dig eller kanske till en
                  vän
                </Title>
                <FormContainer>
                  <div>
                    <FillBtn onClick={() => fillFields()}>
                      Fyll i från profil
                    </FillBtn>
                  </div>
                  <>
                    <Form layout={'vertical'} form={form}>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            Mottagarens namn
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.name}
                          onChange={(e) => onInputChange(e, 'name')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            Mottagarens telefonnummer
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.phoneNumber}
                          onChange={(e) => onInputChange(e, 'phoneNumber')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            Mottagarens adress
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.street}
                          onChange={(e) => onInputChange(e, 'street')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            Mottagarens postNr
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.zipCode}
                          onChange={(e) => onInputChange(e, 'zipCode')}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            portkod (optional)
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.portCode}
                          onChange={(e) => onInputChange(e, 'portCode')}
                          tooltip='Endast om du bor i lägenhet'
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <label style={{ color: 'white' }}>
                            Våning (optional)
                          </label>
                        }
                      >
                        <Input
                          value={inputValues.floor}
                          onChange={(e) => onInputChange(e, 'floor')}
                          tooltip='Endast om du bor i lägenhet'
                        />
                      </Form.Item>
                    </Form>
                  </>
                </FormContainer>
              </AdressDetails>
            )}
            {stepsDelivery[current].content === 'sum' && (
              <>
                <OrderDetails
                  phoneNumber={inputValues.phoneNumber}
                  deliveryAdress={inputValues.street}
                  name={inputValues.name}
                  total={totalCartValue}
                />
              </>
            )}
          </StepsContent>
          <ButtonSection className='steps-action'>
            {current < stepsDelivery.length - 1 && (
              <Button
                className='primartBtn'
                type='primary'
                onClick={() => next(current)}
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
                  placeholder={'Välj en tid'}
                  value={value}
                  onChange={onChange}
                  format={format}
                  disabledHours={() => disabledHours}
                />
              </Content>
            ) : (
              <>
                <OrderDetails total={totalCartValue} />
              </>
            )}
          </StepsContent>
          <ButtonSection className='steps-action'>
            {current < stepsTakeAway.length - 1 && (
              <Button type='primary' onClick={() => next(current)}>
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
