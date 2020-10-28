import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';
import { SizeContextProvider } from 'antd/lib/config-provider/SizeContext';
import { IdcardFilled } from '@ant-design/icons';

const Subtitle = styled.h1`
  text-align: center;
`;
const H3 = styled.h3`
  text-align: center;
`;

const SubContainer = styled.section`
  padding: 0 10px;
`;
const MapTitle = styled.p`
  margin: 0;
  text-align: center;
`;
const OrderContainer = styled.section`
  cursor: pointer;
`;
const Container = styled.main`
  padding-bottom: 65px;
`;
export default function TrackYourOrder() {
  const [latlng, setLatlng] = useState(); // [lat,lng]
  const [order, setOrder] = useState();
  const [showOrderInfo, setShowOrderInfo] = useState(false);
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
          <Header title={'Överblick'} goBack={() => history.push('/profile')} />
          <SubContainer>
            {order[0].orderType === 'delivery' && (
              <>
                <Subtitle>
                  Här kan du se en liten överblick över din order
                </Subtitle>

                <OrderContainer
                  onClick={() => setShowOrderInfo(!showOrderInfo)}
                >
                  <H3>Orderinformation</H3>
                  {showOrderInfo && <div>orderInfo</div>}
                </OrderContainer>
                <div>
                  <MapTitle>kartan visar vart soppan ska levereras</MapTitle>
                  <Map latlng={latlng} />{' '}
                </div>
              </>
            )}
            {order[0].orderType === 'takeAway' && (
              <>
                <Subtitle>
                  Här kan du se en liten överblick över din order
                </Subtitle>

                <OrderContainer
                  onClick={() => setShowOrderInfo(!showOrderInfo)}
                >
                  <H3>Orderinformation</H3>
                  {showOrderInfo && <div>orderInfo</div>}
                </OrderContainer>

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
