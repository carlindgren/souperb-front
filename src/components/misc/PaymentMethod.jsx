import React, { useState } from 'react';

import styled from 'styled-components';
//import '../../../node_modules/antd/lib/radio/style/index.css';
//doesnt add all of the styling.
import Header from '../misc/HeaderInfo';
import { List, Radio, Flex, WhiteSpace } from 'antd-mobile';

const header = styled.header`
  height: 40px;
`;

const Container = styled.div`
  padding: 0 20px;
`;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};

const data = [
  { value: 0, label: 'Kort' },
  { value: 1, label: 'Swish' },
  { value: 2, label: 'Klarna' }
];

export default function PaymentMethod({ goBack, PaymentMethod /*onChange*/ }) {
  const [value, setValue] = useState(0);
  const RadioItem = Radio.RadioItem;

  const onChange = (value) => {
    console.log('checkbox');
    setValue(value);
  };

  return (
    <Container>
      <Header title={'Betalmetoder'} goBack={goBack} />
      <WhiteSpace size='lg' />
      <WhiteSpace size='lg' />
      <List renderHeader={() => 'Välj betalmetod.'}>
        {data.map((i) => (
          <RadioItem
            key={i.value}
            checked={value === i.value}
            onChange={() => onChange(i.value)}
          >
            {i.label}
          </RadioItem>
        ))}
      </List>
      <WhiteSpace size='lg' />
    </Container>
  );
}
