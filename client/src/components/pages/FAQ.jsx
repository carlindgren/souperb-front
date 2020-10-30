import React from 'react';
import Accordion from '../misc/Accordion';
import Header from '../misc/HeaderInfo';
import styled from 'styled-components';

const Container = styled.main`
  justify-content: center;
  max-width: 800px;
  width: 90vw;
  margin: 0 auto;
`;

const P = styled.p`
  color: ${(props) => props.theme.mainBg};
  padding: 5px 10px;
`;

export default function FAQ({ goBack }) {
  const accContent = [
    {
      title: 'Vi levererar hit',
      content:
        'Etiam ut augue mi. Ut mollis viverra urna a rhoncus. Maecenas tincidunt ex augue, id ullamcorper ante bibendum sed. Cras et finibus massa, non posuere mauris. Duis ut mi at risus rutrum tristique eget eget lorem',
      id: 1
    },
    {
      title: 'Hur fungerar tjänsten?',
      content:
        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sed dolor rutrum enim semper porttitor ut et magna. Vestibulum pretium tincidunt leo vel suscipit.',
      id: 2
    },
    {
      title: 'Vilka betalmöjligheter finns det?',
      content:
        'Donec rutrum odio fermentum lorem ullamcorper hendrerit et nec elit. Praesent posuere sit amet magna eu gravida. Aenean facilisis pretium rhoncus. Proin pretium quis tellus sed dictum. Cras sit amet enim in est fringilla feugiat at id justo. In sit amet sapien consequat, hendrerit orci vitae, elementum nulla. Cras luctus erat eu massa commodo porttitor. Etiam vel consectetur velit. Suspendisse at enim erat. Sed molestie odio ipsum, ut tristique arcu condimentum nec.',
      id: 3
    }
  ];
  return (
    <div>
      <Header goBack={goBack} title={'FAQ'}></Header>
      <Container>
        {accContent.map(({ title, content, id }) => (
          <Accordion key={id} title={title} content={<P>{content}</P>} />
        ))}
      </Container>
    </div>
  );
}
