import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  border-radius: 8px;
  background-color: green;
  margin: 10px;
  height: 100px;
`;
export default function Orders({ orders }) {
  console.log(orders && orders);
  return (
    <>
      <div>antal Order: {orders && orders.length}</div>
      {orders &&
        orders.map((elem) => (
          <Container>
            <div>{elem.orderType}</div>
            <ul>{elem.cartItems[0].name}</ul>
            <div>{elem.orderPrice}</div>
            <div>{elem.orderTime}</div>
          </Container>
        ))}
    </>
  );
}
