import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3500' });

/* this might not be needed
API.interceptors.request.use((req:) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
}); */

// generic route calls
export const getDogspots = async () => {
  const { data } = await API.get('/dogspots');
  return data;
};
export const getShelters = async () => {
  const { data } = await API.get('/shelters');
  return data;
};
export const postShelter = async (body: object) => {
  const { data } = await API.post('/shelters', body);
  return data;
};
// user auth route calls
export const signUp = async (body: object) => {
  const { data } = await API.post('/signup', body);
  return data;
};
export const signIn = async (body: object) => {
  const { data } = await API.post('/signin', body);
  return data;
};
// authenticated route calls
// related directly to user
export const updateUser = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/update', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const deleteUser = async (id: string, jwt: string) => {
  const { data } = await API.delete(`/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
// related to Posts
export const getPosts = async (body: object, jwt: string) => {
  const { data } = await API.get('/user/post/all', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const createPost = async (body: object, jwt: string) => {
  const { data } = await API.post('/user/post/create', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const deletePost = async (
  postid: string,
  userid: string,
  jwt: string
) => {
  const { data } = await API.delete(`/user/post/delete/${postid}/${userid}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
/* this will not be used on V1
export const likePost = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/post/like', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
}; */
// related to dogspots
export const createDogSpot = async (body: object, jwt: string) => {
  const { data } = await API.post('/user/dogspot/create', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const rateDogspot = async (body: object) => {
  const { data } = await API.patch('/user/dogspot/rate', body);
  return data;
};
export const favDogspot = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/dogspot/fav', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const tellLocation = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/dogspot/location', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
// related to groups

export const getGroups = async () => {
  const { data } = await API.get('/groups');
  return data;
};
export const createGroup = async (body: object, jwt: string) => {
  const { data } = await API.post('/user/group/create', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const deleteGroup = async (body: object, jwt: string) => {
  const { data } = await API.delete('/user/group/delete', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const joinGroup = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/group/join', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const leaveGroup = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/group/leave', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const inviteUser = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/group/invite', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const rejectInvite = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/group/reject', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const editMeetups = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/group/meetups', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const getGroupById = async (userTargetId: string, jwt: string) => {
  const { data } = await API.get(`/group/${userTargetId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
// related to users interactions
export const getUserById = async (userTargetId: string, jwt: string) => {
  const { data } = await API.get(`/user/${userTargetId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const addFriend = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/addfriend', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};

export const sendFriendRequest = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/sendfriendrequest', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const acceptFriendRequest = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/acceptfriendrequest', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const rejectFriendRequest = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/rejectfriendrequest', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const deleteFriend = async (body: object, jwt: string) => {
  const { data } = await API.patch('/user/deletefriend', body, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
export const getUsers = async () => {
  const { data } = await API.get('/users');
  return data;
};
