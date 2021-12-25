import './profile-settings.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUser } from '../../actions/user';
import { useNavigate } from 'react-router-dom';
const ProfileSettings = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // use this to take data from store const user = useSelector((state: any) => state.authReducer.authData.user);
  const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  if (
    userStorage &&
    Object.keys(userStorage).length === 0 &&
    Object.getPrototypeOf(userStorage) === Object.prototype
  ) {
    return <div>ERROR 404: NO USER FOUND</div>;
  }
  const user = userStorage.data.user;

  const initialState = {
    profilePhoto: user.profilePhoto,
    name: user.name,
    description: user.description,
    bark: user.bark,
    notifications: user.notifications,
    userId: user._id,
  };
  const [form, setForm] = useState(initialState);
  const handleChange = (e: any): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const barkFriends = () => {
    const bark = new Audio(user.bark);
    bark.play();
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(form, userStorage.data.token));
    navigate(`/kennel`);
  };
  const deleteThisUser = () => {
    dispatch(deleteUser(userStorage.data.user._id, userStorage.data.token));
    navigate(`/kennel`);
  };
  return (
    <div className="settings-container">
      <button
        className="id-copy"
        onClick={() => {
          navigator.clipboard.writeText(user._id);
        }}
      >
        {user.name}#id
      </button>
      <form
        autoComplete="off"
        className="info-container"
        onSubmit={handleSubmit}
      >
        <img
          src={user.profilePhoto}
          alt="profilePhoto"
          className="profilePhoto"
        />
        <input
          type="text"
          name="profilePhoto"
          id="profilePhotoLink"
          className="profilePhotoLink"
          placeholder={user.profilePhoto || 'profilePhotoLink'}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          id="name"
          className="settings__name"
          placeholder={user.name || 'Name'}
          onChange={handleChange}
        />
        <textarea
          name="description"
          id="description"
          className="settings__description"
          placeholder={user.description || 'Tell us about yourself'}
          onChange={handleChange}
        />
        <div className="bark-block">
          <input
            className="bark-link"
            id="bark-link"
            type="text"
            name="bark"
            placeholder={user.bark || 'bark-audio-link'}
            onChange={handleChange}
          />
          <div className="barkBtn" onClick={() => barkFriends()}>
            <svg
              width={60.238}
              height={35.922}
              viewBox="0 0 13.557 9.504"
              xmlns="http://www.w3.org/2000/svg"
              className="header-icon filter-brown"
            >
              <path d="M9.882 5.968h3.675v.735H9.882zM9.16 4.35l3.187-1.829.366.638-3.187 1.83zM7.842 3.19L9.667 0l.638.364-1.825 3.19zM5.84 6.704L7.31 4.13l-1.838-2.94L2.14 4.917.328 4.499l.477 1.91L0 7.307l5.156 2.196 2.52-2.8zM3.818 5.6a.551.551 0 110-1.102.551.551 0 010 1.102z" />
            </svg>
          </div>
        </div>
        {/*
        for v2 if time enough
        <div className="notifications-block">
          <label htmlFor="notifications">
            Notifications
            {user.notifications ? (
              <input
                type="checkbox"
                name="notifications"
                id="notifications"
                checked
                onChange={handleChange}
              />
            ) : (
              <input
                type="checkbox"
                name="notifications"
                id="notifications"
                onChange={handleChange}
              />
            )}
            <svg
              className="header-icon"
              width="60"
              height="100"
              viewBox="60 150 424 600"
              fillRule="evenodd"
            >
              <g>
                <path d="M143.548 388.221c22.737 50.44 15.792 102.75-15.51 116.87-31.303 14.12-75.11-15.31-97.845-65.74-22.737-50.43-15.793-102.745 15.51-116.863 31.303-14.114 75.108 15.317 97.845 65.733zM452.97 388.221c-22.738 50.44-15.793 102.75 15.512 116.87 31.303 14.12 75.106-15.31 97.846-65.74 22.734-50.43 15.789-102.745-15.513-116.863-31.301-14.114-75.108 15.317-97.845 65.733zM276.6 287.128c11.655 54.069-6.11 103.763-39.678 111.003-33.566 7.23-70.225-30.74-81.878-84.804-11.653-54.068 6.112-103.764 39.679-110.997 33.567-7.236 70.224 30.729 81.877 84.798zM319.082 287.174c-11.644 54.068 6.109 103.767 39.674 110.997 33.568 7.24 70.226-30.73 81.878-84.797 11.654-54.069-6.11-103.765-39.678-110.998-33.568-7.234-70.225 30.729-81.874 84.798zM234.587 467.871c-8.192 14.15-46.156 60.99-72.414 76.97-26.256 15.98-58.792 39.38-53.332 93.11 5.457 53.74 60.575 76.74 96.86 74.7 36.286-2.03 104.699-8.71 153.542-1.94 48.842 6.77 110.487 1.64 124.923-49.81 14.436-51.45-17.85-84.23-43.044-102.83-25.193-18.59-67.265-74.2-80.227-99.73-12.96-25.52-78.927-72.26-126.308 9.53z" />
              </g>
            </svg>
          </label>
        </div> */}
        <button className="settings__submit" type="submit">
          Update Info
        </button>
      </form>
      <button className="deleteUser" onClick={deleteThisUser}>
        Delete Account
      </button>
    </div>
  );
};
export default ProfileSettings;
