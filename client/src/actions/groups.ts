import * as api from '../api/api';

// Action Creators
export const joinGroup = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: 'JOIN_GROUP',
      payload: await api.joinGroup(body, jwt),
    });
  } catch (error) {
    console.log(error);
  }
};
export const editMeetups =
  (body: object, jwt: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: 'EDIT_MEETUPS',
        payload: await api.editMeetups(body, jwt),
      });
    } catch (error) {
      console.log(error);
    }
  };
export const createGroup =
  (body: object, jwt: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: 'CREATE_GROUP',
        payload: await api.createGroup(body, jwt),
      });
    } catch (error) {
      console.log(error);
    }
  };
export const getGroups = () => async (dispatch: any) => {
  try {
    dispatch({
      type: 'GET_GROUPS',
      payload: await api.getGroups(),
    });
  } catch (error) {
    console.log(error);
  }
};
export const leaveGroup = (body: object, jwt: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: 'LEAVE_GROUP',
      payload: await api.leaveGroup(body, jwt),
    });
  } catch (error) {
    console.log(error);
  }
}
