import * as api from '../api/api';

// Action Creators
export const getShelters = () => async (dispatch: any) => {
  try {

    const data = await api.getShelters();
    dispatch({ type: 'FETCH_ALL_SHELTERS', payload: data });

  } catch (error) {
    console.log(error);
  }
};
