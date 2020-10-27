import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

export default function TrackYourOrder() {
  const [latlng, setLatlng] = useState(); // [lat,lng]
  const getOrder = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const orderDoc = await Axios.get(
        'http://localhost:5000/users/getOrderInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );

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
    <div>
      <Header
        title={'Följ din order'}
        goBack={() => history.push('/profile')}
      />
      <Map latlng={latlng} />
    </div>
  );
}
