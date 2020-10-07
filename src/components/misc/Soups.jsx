import React from 'react';
import styled from 'styled-components';

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
const SoupElem = styled.div``;

export default function Soups({ soups, onClick }) {
  return (
    <>
      {soups.map(({ _id: id, imgUrl: url }) => (
        <SoupElem className='SoupElem' onClick={() => onClick(id)} key={id}>
          <ImgWrapper>
            <Img src={url}></Img>
          </ImgWrapper>
        </SoupElem>
      ))}
    </>
  );
}
