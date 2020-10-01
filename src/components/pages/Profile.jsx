import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [user, setUser] = useState();
  const getUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    try {
      const user = await Axios.get(
        'http://localhost:5000/users/getUserInformation',
        {
          headers: { 'x-auth-token': authToken }
        }
      );
      setUser(user.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(); // works
  }, []);
  console.log(user);
  return (
    <div>
      <h1>Din Profil</h1>
      {user && user.displayName}
    </div>
  );
}
