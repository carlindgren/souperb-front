import React from 'react';
import { Accordion, WhiteSpace } from 'antd-mobile';

//import some antd stuff
import Header from '../misc/HeaderInfo';
import styled from 'styled-components';

const Container = styled.main`
  background-color: ${(props) => props.theme.mainBg};
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Content = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    text-align: center;
    width: 80vw;
  }
`;
export default function FAQ({ goBack }) {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Container>
      <Header goBack={goBack} title={'FAQ'}></Header>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Accordion
          accordion
          openAnimation={{}}
          className='my-accordion'
          onChange={onChange}
        >
          <WhiteSpace size={'xl'} />
          <Accordion.Panel header='Hur fungerar tjänsten?' className='pad'>
            <Content>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since{' '}
              </p>
            </Content>
          </Accordion.Panel>
          <WhiteSpace size={'xl'} />

          <Accordion.Panel
            header='Vilka betalmöjligheter finns?'
            className='pad'
          >
            <Content>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since{' '}
              </p>
            </Content>
          </Accordion.Panel>
          <WhiteSpace size={'xl'} />

          <Accordion.Panel
            header='Vi levererar till dessa platser'
            className='pad'
          >
            <Content>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since{' '}
              </p>
            </Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </Container>
  );
}
