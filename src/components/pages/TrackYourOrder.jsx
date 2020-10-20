import React from 'react';
import Map from '../misc/Map/Map';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
const GoBack = styled.button``;
export default function TrackYourOrder() {
  const history = useHistory();
  return (
    <div>
      <GoBack onClick={() => history.push('/profile')}>Tillbaka</GoBack>
      <Map />
    </div>
  );
}
