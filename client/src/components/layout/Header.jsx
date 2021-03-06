import React, { useState, useEffect } from 'react';
import AuthOption from '../auth/AuthOptions';
import styled from 'styled-components';
const StyledHeader = styled.header`
  height: 50px;
  background-color: ${(props) => props.theme.mainBg};
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    padding: 0 1rem;
    margin: 0;
    color: white;
    font-size: 0.8rem;
  }

  @media (max-width: 550px) {
    font-size: 0.8rem;
  }
`;

const InputContainer = styled.div`
  margin-left: 10px;
  > input {
    border: none;
    border-bottom: 1px solid black;
    border-radius: 4px;

    height: 20px;
    outline: none;
    text-align: center;
    &:focus {
      color: red;
      border-bottom: 1px solid red;
    }
    @media screen and (max-width: 992px) {
      display: hidden;
    }
  }
`;

export default function Header() {
  const address = localStorage.getItem('user-address');
  const [input, setInput] = useState(address);

  useEffect(() => {
    localStorage.setItem('user-address', input);
  }, [input]);
  return (
    <StyledHeader>
      <InputContainer>
        <label htmlFor='register-address'></label>
        <input
          id='register-address'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </InputContainer>
      <AuthOption />
    </StyledHeader>
  );
}
