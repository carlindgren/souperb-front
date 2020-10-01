import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
export default function Cart({ cart }) {
  return (
    <div>
      <CartItem title='Soppor' cart={cart.soups} />
      <h2>Tillbehör</h2>
      <CartItem title='Dryck' cart={cart.drinks} />
      <CartItem title='Bröd' cart={cart.bread} />
    </div>
  );
}
