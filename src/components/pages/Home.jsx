import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import FoodContext from '../../context/FoodContext';
import Spinner from 'react-spinkit';
import SoupDetails from './SoupDetails/SoupDetails.jsx';
import Slider from '../misc/Slider';
import Header from '../layout/Header';
import SortMenu from '../misc/SortMenu';
import Soups from '../misc/Soups';
const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: ${(props) => props.theme.mainBg};
  justify-content: center;
  margin-bottom: 60px;
  /* margin-top: 10px; */
`;

const SpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const { foodData } = useContext(FoodContext);
  const [soup, setSoup] = useState(null);
  const [subs, setSubs] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  /***********helper functions********* */
  //gives back an array of unique sub properties.
  const uniqueSub = (obj) => {
    let arr = [];

    obj.forEach((object) => arr.push(object.sub));
    let flattened = [].concat.apply([], arr);
    return [...new Set(flattened)];
  };
  useEffect(() => {
    if (foodData.soups) {
      setSubs(uniqueSub(foodData.soups));
    }
  }, [foodData.soups]);

  /******************************** */
  const onSoupClick = (id) => {
    //find soup obj by id.from context.
    const clickedSoup = foodData.soups.find((soup) => soup._id === id);
    setSoup(clickedSoup);
  };

  const goBack = () => {
    setSoup(null);
  };
  const filterBtn = (term) => {
    setSearchTerm(term);
  };

  let soups = foodData.soups;
  const filteredSoups = (arr, str) => {
    if (str === '') {
      return arr;
    }
    let filtered = [];
    arr.forEach((obj) => obj.sub.includes(str) && filtered.push(obj));
    return filtered;
  };
  // console.log(soups && filteredSoups(soups, 'Laktosfri')); // works.

  if (soup) {
    return (
      <>
        <SoupDetails goBack={goBack} soup={soup} />
      </>
    );
  }
  if (soups !== undefined) {
    return (
      <>
        <Header />
        <Slider />
        <SortMenu
          searchTerm={searchTerm}
          onClick={filterBtn}
          filterOptions={subs}
        />
        <Container className='container'>
          <Soups
            soups={filteredSoups(soups, searchTerm)}
            onClick={onSoupClick}
          />
        </Container>
      </>
    );
  } else {
    return (
      <SpinnerContainer>
        <Spinner name='pacman' fadeIn='none' />
      </SpinnerContainer>
    );
  }
}
