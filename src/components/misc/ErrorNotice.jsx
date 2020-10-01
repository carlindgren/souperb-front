import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  border-radius: 8px;
  padding: 0.5rem;
  border: 1px solid salmon;
  background-color: lightsalmon;

  > button {
    border-radius: 50%;
    color: white;
    width: 20px;
    height: 20px;
    background-color: red;
  }
`;
export default function ErrorNotice({ message, clearError }) {
  return (
    <ErrorContainer>
      <span>{message}</span>
      <button onClick={clearError}>X</button>
    </ErrorContainer>
  );
}
