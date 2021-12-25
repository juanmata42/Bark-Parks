import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tellLocation } from '../../../actions/user';
import './BarkBtn.scss';
const BarkBtn = ({ id }: { id: string }): JSX.Element => {
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);

  const barkFriends = () => {
    const bark = new Audio(
      user.bark ||
        'https://soundbible.com/mp3/Dog%20Woof-SoundBible.com-457935112.mp3'
    );
    bark.play();
    if (user) {
      dispatch(
        tellLocation({ userId: user._id, location: id }, userStorage.data.token)
      );
    }
    console.log(`going to park ${id}`);
  };

  return (
    <button className="barkBtn" onClick={() => barkFriends()}>
      <svg
        width={60.238}
        height={35.922}
        viewBox="0 0 13.557 9.504"
        xmlns="http://www.w3.org/2000/svg"
        className="header-icon filter-brown notifications-checkbox"
      >
        <path d="M9.882 5.968h3.675v.735H9.882zM9.16 4.35l3.187-1.829.366.638-3.187 1.83zM7.842 3.19L9.667 0l.638.364-1.825 3.19zM5.84 6.704L7.31 4.13l-1.838-2.94L2.14 4.917.328 4.499l.477 1.91L0 7.307l5.156 2.196 2.52-2.8zM3.818 5.6a.551.551 0 110-1.102.551.551 0 010 1.102z" />
      </svg>
    </button>
  );
};
export default BarkBtn;
