import * as api from '../api/api';

// Action Creators
export const updateUser = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    const data = await api.updateUser(body, jwt);
    dispatch({ type: 'UPDATE_USER', payload: data });
    let userStorage = JSON.parse(localStorage.getItem('user') || '{}');
    userStorage.data = data;
    userStorage.data.token = jwt;
    localStorage.setItem('user', JSON.stringify(userStorage));
  } catch (error) {
    console.log(error);
  }
};
export const getUserById =
  (id: string, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.getUserById(id, jwt);
      dispatch({ type: 'FETCH_AUTH_USER', payload: data });
      let userStorage = JSON.parse(localStorage.getItem('user') || '{}');
      userStorage.data.user = data;
      userStorage.data.token = jwt;
      localStorage.setItem('user', JSON.stringify(userStorage));
    } catch (error) {
      console.log(error);
    }
  };
export const deleteUser =
  (userId: string, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.deleteUser(userId, jwt);
      localStorage.removeItem('user');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
export const logOut = () => async (dispatch: any) => {
  try {
    localStorage.removeItem('user');
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
export const addFriend = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    const data = await api.addFriend(body, jwt);
    dispatch({ type: 'ADD_FRIEND', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteFriend =
  (body: any, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.deleteFriend(body, jwt);
      dispatch({ type: 'DELETE_FRIEND', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const tellLocation=
  (body: any, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.tellLocation(body, jwt);
      dispatch({ type: 'TELL_LOCATION', payload: data });
    } catch (error) {
      console.log(error);
    }
  }
export const favDogspot =
  (body: any, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.favDogspot(body, jwt);
      dispatch({ type: 'FAV_DOGSPOT', payload: data });
    } catch (error) {
      console.log(error);
    }
  }