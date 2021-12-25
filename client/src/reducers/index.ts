import { combineReducers } from 'redux';
import posts from './posts';
import groups from './groups';
import shelters from './shelters';
import users from './users';
import dogspots from './dogspots';
import user from './user';
import authReducer from './auth';
export default combineReducers({
  posts: posts,
  groups: groups,
  users: users,
  shelters: shelters,
  dogspots: dogspots,
  user: user,
  authReducer: authReducer,
});
