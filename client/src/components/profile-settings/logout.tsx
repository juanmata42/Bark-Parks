import './logout.scss';
import React from 'react';
import gif from '../../assets/loading-dog.gif';
import { useNavigate } from 'react-router-dom';
const LogOut = (): JSX.Element => {
  const navigate = useNavigate();
  setTimeout(() => {
    localStorage.removeItem('user');
    navigate('/');
  }, 3000);
  return (
    <div className="logOut-container">
      <h1 className="logOut-title">Keep discovering!</h1>
      <img alt="dog walking gif" className="logOut-gif" src={gif} />
    </div>
  );
};
export default LogOut;
