import React from 'react';

import styled from 'styled-components';
//import '../../../node_modules/antd/lib/radio/style/index.css';
//doesnt add all of the styling.
import Header from '../misc/HeaderInfo';
import { List, Radio, WhiteSpace } from 'antd-mobile';

const Container = styled.div`
  background-color: ${(props) => props.theme.mainBg};
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const data = [
  { value: 0, label: 'Kort' },
  { value: 1, label: 'Swish' },
  { value: 2, label: 'Klarna' }
];

export default function PaymentMethod({
  goBack,
  onChangePayment,
  paymentMethod
}) {
  const RadioItem = Radio.RadioItem;
  return (
    <Container>
      <Header title={'Betalmetoder'} goBack={goBack} />
      <WhiteSpace size='lg' />
      <WhiteSpace size='lg' />
      <List renderHeader={() => 'Välj betalmetod.'}>
        {data.map((i) => (
          <RadioItem
            key={i.value}
            checked={paymentMethod === i.label}
            onChange={() => onChangePayment(i.label)}
          >
            {i.label}
          </RadioItem>
        ))}
      </List>
      <WhiteSpace size='lg' />
    </Container>
  );
}
