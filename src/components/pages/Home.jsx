import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import FoodContext from '../../context/FoodContext';
import Spinner from 'react-spinkit';
import SoupDetails from './SoupDetails/SoupDetails.jsx';
import Slider from '../misc/Slider';
const ImgWrapper = styled.div`
  & :hover {
    cursor: pointer;
    filter: grayscale(80%);
  }

  width: 25vw;
  display: flex;
  flex-direction: column;
  margin: 10px 10px 10px 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 1200px) {
    width: 40vw;
  }
  @media (max-width: 550px) {
    width: 90vw;
  }
`;

const Img = styled.img`
  max-width: 100%;
  max-height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: ${(props) => props.theme.mainBg};
  justify-content: center;
  margin-bottom: 60px;
  /* margin-top: 10px; */
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SoupElem = styled.div``;

export default function Home() {
  const { foodData } = useContext(FoodContext);
  const [soup, setSoup] = useState(null);

  const onSoupClick = (id) => {
    //find soup obj by id.from context.
    const clickedSoup = foodData.soups.find((soup) => soup._id === id);
    setSoup(clickedSoup);
  };

  const goBack = () => {
    setSoup(null);
  };

  let soups = foodData.soups;

  if (soup) {
    return (
      <div>
        <SoupDetails goBack={goBack} soup={soup} />
      </div>
    );
  }
  if (soups !== undefined) {
    return (
      <>
        <Slider />
        <Container className='container'>
          {soups.map(({ _id: id, imgUrl: url }) => (
            <SoupElem
              className='SoupElem'
              onClick={() => onSoupClick(id)}
              key={id}
            >
              <ImgWrapper>
                <Img src={url}></Img>
              </ImgWrapper>
            </SoupElem>
          ))}
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
