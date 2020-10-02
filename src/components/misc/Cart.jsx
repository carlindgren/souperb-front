import React, { useEffect, useState, useContext } from "react";
import CartItem from "./CartItem";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.main`
  height: 40vh;
  overflow-y: scroll;
`;

export default function Cart({ cart }) {
  return (
    <Container>
      <CartItem title="Soppor" cart={cart.soups} />
      <h2>Tillbehör</h2>
      <CartItem title="Dryck" cart={cart.drinks} />
      <CartItem title="Bröd" cart={cart.bread} />
    </Container>
  );
}
