import './App.scss';
import React, { useEffect } from 'react';
import { getDogspots } from './actions/dogspots';
import { getShelters } from './actions/shelters';
import { getUserById } from './actions/user';
import { getGroups } from './actions/groups';
import { getUsers } from './actions/users';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/core/layout/layout';
import About from './components/about/about';
import Auth from './components/auth/auth';
import BarkParks from './components/bark-parks/bark-parks';
import LocalShelters from './components/local-shelters/local-shelters';
import ProfileSettings from './components/profile-settings/profile-settings';
import LogOut from './components/profile-settings/logout';
import Friends from './components/social/friends/friends';
import Groups from './components/social/groups/groups';
import Kennel from './components/kennel/kennel';
import { useDispatch } from 'react-redux';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  let userStorage = JSON.parse(localStorage.getItem('user') || '{}');
  let user: any;
  if (userStorage.data) {
    user = userStorage.data.user;
  }
  useEffect(() => {
    dispatch(getDogspots());
    dispatch(getShelters());
    dispatch(getUsers());
    dispatch(getGroups());
    if (user) {
      userStorage = JSON.parse(localStorage.getItem('user') || '{}');
      user = userStorage.data.user;
      dispatch(getUserById(user._id, userStorage.data.token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BarkParks />} />
          <Route path="/bark-parks" element={<BarkParks />} />
          <Route path="/kennel" element={<Kennel />} />
          <Route path="/local-shelters" element={<LocalShelters />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/about" element={<About />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
