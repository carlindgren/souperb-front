import React from 'react';
import styled from 'styled-components';

const CircleStyling = styled.div`
  width: 26%;
  height: 46.8%;
  border-radius: 50%;
`;

export default function Circle({ p }) {
  return (
    <CircleStyling
      style={{ backgroundColor: p ? 'black' : 'white' }}
    ></CircleStyling>
  );
}
