import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: ${(props) => props.theme.mainBg};
  margin: 0;
  padding: 10px;
`;

const Li = styled.li`
  padding: 8px;
  border-radius: 30px;
  cursor: pointer;
  background: ${(props) => props.theme.mainButtonBg};
  color: ${(props) => props.theme.mainButtonColor};
`;

export default function SortMenu({ filterOptions, onClick }) {
  //properties would be an array of all existing sub menus.
  //on sourt filter out them.
  return (
    <Container>
      <Ul>
        <Li onClick={() => onClick('')}>Alla Soppor</Li>
        {filterOptions &&
          filterOptions.map((elem, id) => (
            <Li onClick={() => onClick(elem)} key={id}>
              {elem}
            </Li>
          ))}
      </Ul>
    </Container>
  );
}
