import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  border-radius: 8px;
  background-color: green;
  margin: 10px;
  height: 100px;
`;
export default function Orders({ orders }) {
  console.log(orders && orders.length);
  return (
    <>
      <div>antal Order: {orders && orders.length}</div>
      {orders &&
        orders.map((elem) => (
          <Container>
            <div>{elem.orderType}</div>
            <div>{elem._id}</div>
            <div>{elem.orderPrice}</div>
            <div>{elem.orderTime}</div>
          </Container>
        ))}
    </>
  );
}
