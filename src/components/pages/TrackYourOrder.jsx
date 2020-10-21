import React from 'react';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../misc/HeaderInfo';

export default function TrackYourOrder() {
  const history = useHistory();
  return (
    <div>
      <Header
        title={'Följ din order'}
        goBack={() => history.push('/profile')}
      />
      <Map />
    </div>
  );
}
