import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

import { getDateAndTime } from '../../HelperFunctions/HelperFunctions';
import { HQ } from '../../StaticContent/StaticContent';
import Accordion from '../misc/Accordion';
const OrderText = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  border-radius: 12px;
  width: 80%;
  margin: 0 auto;
`;

const MapContainer = styled.section``;
const Subtitle = styled.h1`
  text-align: center;
`;
const Ul = styled.ul`
  padding: 5px;
`;
const SpanTitle = styled.strong`
  color: gray;
  font-weight: bold;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-around;
  span {
    width: 15%;
    text-align: start;
  }
`;
const Text = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.mainBg};
`;
const DeliveryText = styled(Text)``;
const TakeAwayText = styled(Text)``;
const SubContainer = styled.section`
  padding: 0 10px;
  margin: 0 auto;
  max-width: 800px;
`;
const MapTitle = styled.p`
  margin: 0;
  text-align: center;
`;

const Container = styled.main`
  padding-bottom: 65px;
  h3 {
    color: ${(props) => props.theme.mainBg};
  }
`;
export default function TrackYourOrder() {
  const [latlng, setLatlng] = useState(); // [lat,lng]
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const orderDoc = await Axios.get(
        'http://localhost:5000/users/getOrderInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      setOrder(orderDoc.data.order);
      const { latlng } = orderDoc.data.order[0].deliveryDetails;
      setLatlng(latlng);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  const history = useHistory();

  return (
    <>
      {order && (
        <Container>
          <Header
            title={'Överblick'}
            color={'#436F8A'}
            goBack={() => history.push('/profile')}
          />
          <SubContainer>
            {order[0].orderType === 'delivery' && (
              <>
                <Subtitle>
                  Här kan du se en liten överblick över din order
                </Subtitle>
                {order[0].deploymentReady && (
                  <Subtitle>Din soppa är nu på väg till dig!</Subtitle>
                )}
                <Accordion
                  title={'Orderinformation'}
                  content={
                    <Container>
                      <DeliveryText>
                        Soppan kommer att levereras till{' '}
                        {order[0].deliveryDetails.name} på addressen{' '}
                        {order[0].deliveryDetails.street}
                        {', '}
                        {getDateAndTime(order[0].orderTime)}
                      </DeliveryText>
                      <h3>Orderdetaljer</h3>
                      <OrderText>
                        <Ul>
                          <Li>
                            <SpanTitle>Produkt</SpanTitle>
                            <SpanTitle>Antal</SpanTitle>
                            <SpanTitle>Pris</SpanTitle>
                          </Li>
                          <hr></hr>
                          {order[0].cartItems.map((i) => (
                            <Li key={i._id}>
                              <span>{i.name} </span>
                              <span>{i.quantity}</span>

                              <span>{i.price} kr</span>
                            </Li>
                          ))}
                          <Li>
                            <span>Totalt</span>
                            <span> </span>
                            <span> {order[0].orderPrice}kr</span>
                          </Li>
                        </Ul>
                      </OrderText>
                    </Container>
                  }
                />

                <MapContainer>
                  <MapTitle>kartan visar vart soppan ska levereras</MapTitle>
                  <Map latlng={latlng} />{' '}
                </MapContainer>
              </>
            )}
            {order[0].orderType === 'takeAway' && (
              <>
                <Subtitle>
                  Här kan du se en liten överblick över din order
                </Subtitle>
                {order[0].deploymentReady && (
                  <Subtitle>Din soppa är nu redo att hämtas upp!</Subtitle>
                )}

                <Accordion
                  title={'Orderinformation'}
                  content={
                    <Container>
                      <TakeAwayText>
                        Din soppa går att hämta upp hos på hos {HQ.name} på{' '}
                        {HQ.adress}
                      </TakeAwayText>
                    </Container>
                  }
                />
                <div>
                  <MapTitle>Kartan visar var du hämtar upp din soppa</MapTitle>
                  <Map />
                </div>
              </>
            )}
          </SubContainer>
        </Container>
      )}
    </>
  );
}
