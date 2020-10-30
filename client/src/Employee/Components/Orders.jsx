import React from 'react';
import styled from 'styled-components';
import { getDateAndTime } from '../../HelperFunctions/HelperFunctions';
const Title = styled.h2`
  text-align: center;
`;
const Container = styled.section`
  border-radius: 8px;
  background-color: #438a5e;
  margin: 10px;
  * {
    color: #f9f8eb;
  }
  padding: 15px;
`;

const Subtitle = styled.h3`
  text-align: center;
`;
const DeploymentReady = styled(Subtitle)`
  font-size: 20px;
`;
const Time = styled(Subtitle)``;
const Adress = styled(Subtitle)``;
const Button = styled.button`
  padding: 4px;
  border-radius: 5px;
  color: ${(props) => props.theme.mainBg};
  background-color: ${(props) => props.theme.mainButtonBg};
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBg};
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Ul = styled.ul``;
const Li = styled.li`
  display: flex;
  justify-content: space-around;
  span {
    width: 40%;
  }
`;
export default function Orders({ orders, markFinished }) {
  const takeAwayOrders = orders.filter((i) => i.orderType === 'takeAway');
  const deliveryOrders = orders.filter((i) => i.orderType === 'delivery');

  return (
    <>
      <div>antal Order: {orders && orders.length}</div>
      <Title>Take Away</Title>
      {orders &&
        takeAwayOrders.map((elem) => (
          <Container
            style={{ backgroundColor: elem.deploymentReady && '#FDAC61' }}
            key={elem._id}
          >
            {elem.deploymentReady && (
              <DeploymentReady>Redo att hämtas</DeploymentReady>
            )}
            <Time>Kunden hämtar: {getDateAndTime(elem.orderTime)}</Time>

            <Ul>
              <Li>
                <span>Produkt</span>
                <span>Antal</span>
              </Li>
              <hr />
              {elem.cartItems.map((elem) => (
                <Li key={elem._id}>
                  <span> {elem.name}</span> <span>{elem.quantity}</span>
                </Li>
              ))}
            </Ul>
            <BtnContainer
              style={{ visibility: elem.deploymentReady ? 'hidden' : '' }}
            >
              <Button onClick={() => markFinished(elem._id)}>
                Markera som färdig
              </Button>
            </BtnContainer>
          </Container>
        ))}
      <Title>Utkörning</Title>
      {orders &&
        deliveryOrders.map((elem) => (
          <Container
            key={elem._id}
            style={{ backgroundColor: elem.deploymentReady && '#FDAC61' }}
          >
            {elem.deploymentReady && (
              <DeploymentReady>Redo att levereras.</DeploymentReady>
            )}
            <Time>Levereras: {getDateAndTime(elem.orderTime)}</Time>

            <Ul>
              <Li>
                <span>Produkt</span>
                <span>Antal</span>
              </Li>

              <hr />
              {elem.cartItems.map((elem) => (
                <Li key={elem._id}>
                  <span> {elem.name}</span> <span>{elem.quantity}</span>
                </Li>
              ))}
              <Adress>Leveranshänvisningar </Adress>
              <li>Adress: {elem.deliveryDetails.street}</li>
              <li>
                telefonnummer: {elem.deliveryDetails.phoneNo || 'ingen data'}
              </li>
              <li>portkod: {elem.deliveryDetails.portCode || 'ingen data'}</li>
              <li>våning: {elem.deliveryDetails.floor}</li>
            </Ul>
            <BtnContainer
              style={{ visibility: elem.deploymentReady ? 'hidden' : '' }}
            >
              <Button onClick={() => markFinished(elem._id)}>
                Markera som redo att leverera
              </Button>
            </BtnContainer>
          </Container>
        ))}
    </>
  );
}
