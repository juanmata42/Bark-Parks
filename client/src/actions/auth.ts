import * as api from '../api/api';

export const signin = (formData: any) => async (dispatch: any) => {
  try {
    const data = await api.signIn(formData);
    dispatch({ type: 'SIGNIN', data });
    localStorage.setItem('user', JSON.stringify({ data }));
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData: any) => async (dispatch: any) => {
  try {
    const data = await api.signUp(formData);
    dispatch({ type: 'SIGNUP', data });
    localStorage.setItem('user', JSON.stringify({ data }));
  } catch (error) {
    console.log(error);
  }
};
