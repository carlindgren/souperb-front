import styled from 'styled-components';

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
    background-color: ${(props) => props.theme.mainButtonBg};
    border-radius: 8px;
    padding: 0.3rem;
    > input:focus {
      border: 1px solid #268ee4;
      box-shadow: inset 0px 0px 5px rgba(38, 142, 228, 0.5);
      outline: none;
    }
    > input[type='submit'] {
      padding: 0.3rem 0.5rem;
      border: 1px solid #6aa051;
      border-radius: 8px;
      background-color: #c8ecb7;
      font-size: 1.1rem;
    }
  }
`;
