import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

export default function TrackYourOrder() {
  const [latlng, setLatlng] = useState([59.34822, 18.063]); // [lat,lng]
  const [street, setStreet] = useState();
  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = await Axios.get(
        'http://localhost:5000/users/getuserinformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      setStreet(user.data.user.adress.street);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //getUser();
  }, []);

  const getLatLng = async () => {
    try {
      if (street) {
        const doc = await Axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${street}%2C+Stockholm&apiKey=ZJN5huejZ9HJIoIDJv4bErkkwITySR_j3PIRdK0PefQ`
        );
        console.log(doc);
        const { lat, lng } = doc.data.items[0].position;
        setLatlng([lat, lng]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    //fetch later.
    //getLatLng();
  }, [street]);
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
