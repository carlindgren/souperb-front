import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: ${(props) => props.theme.mainBg};
  margin: 0;
  padding: 10px;
`;

const Li = styled.li`
  padding: 8px;
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
  background: ${(props) =>
    props.clicked ? props.theme.secondaryBg : props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
  &:hover {
    background: ${(props) => props.theme.secondaryBg};
  }
`;

export default function SortMenu({ filterOptions, onClick, searchTerm }) {
  //properties would be an array of all existing sub menus.
  //on sourt filter out them.
  return (
    <Container>
      <Ul>
        <Li clicked={searchTerm === '' && true} onClick={() => onClick('')}>
          Alla Soppor
        </Li>
        {filterOptions &&
          filterOptions.map((elem, id) => (
            <Li
              clicked={searchTerm === elem ? true : false}
              onClick={() => onClick(elem)}
              key={id}
            >
              {elem}
            </Li>
          ))}
      </Ul>
    </Container>
  );
}
