import * as api from '../api/api';

// Action Creators
export const getDogspots = () => async (dispatch: any) => {
  try {
    const data = await api.getDogspots();
    dispatch({ type: 'FETCH_ALL_DOGSPOTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createDogSpot =
  (body: any, jwt: string) => async (dispatch: any) => {
    try {
      const data = await api.createDogSpot(body, jwt);
      dispatch({ type: 'CREATE_DOGSPOT', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
export const rateDogspot = (body: any) => async (dispatch: any) => {
  try {
    const data = await api.rateDogspot(body);
    dispatch({ type: 'RATE_DOGSPOT', payload: data });
  } catch (error) {
    console.log(error);
  }
};
