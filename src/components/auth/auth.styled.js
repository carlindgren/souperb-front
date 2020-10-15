import styled from 'styled-components';

export const Button = styled.input`
  display: block;
  float: right;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 15px;
  background-color: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
`;
export const Form = styled.form`
  > input,
  label {
    display: block;
  }
  > input {
    margin-bottom: 1rem;
  }

  > label {
    margin-bottom: 0.2;
  }
  > input[type='email'],
  input[type='password'],
  input[type='text'] {
    width: 100%;
    font-size: 1.1rem;
    border: 1px solid #c2c2c2;
    background-color: ${(props) => props.theme.mainBg};
    border-radius: 8px;
    padding: 0.3rem;
    > input:focus {
      border: 1px solid #268ee4;
      box-shadow: inset 0px 0px 5px rgba(38, 142, 228, 0.5);
      outline: none;
    }
  }
`;
