import * as api from '../api/api';

// Action Creators
export const getPosts = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    const { data } = await api.getPosts(body, jwt);
    dispatch({ type: 'FETCH_ALL_POSTS', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    const { data } = await api.createPost(body, jwt);
    dispatch({ type: 'CREATE_POST', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost =
  (postid: string, userid: string, jwt: string) => async (dispatch: any) => {
    try {
      const { data } = await api.deletePost(postid, userid, jwt);
      dispatch({ type: 'DELETE_POST', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
/* this will not be used on V1 
export const likePost = (body: any, jwt: string) => async (dispatch: any) => {
  try {
    const { data } = await api.likePost(body, jwt);
    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error);
  }
}; */
