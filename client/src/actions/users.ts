import * as api from '../api/api';

// Action Creators
export const getUsers = () => async (dispatch: any) => {
  try {
    const data = await api.getUsers();
    dispatch({ type: 'FETCH_USERS', payload: data });
  } catch (error) {
    console.log(error);
  }
};
