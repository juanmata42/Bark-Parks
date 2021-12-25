export default (state: any = { posts: [] }, action: any) => {
  switch (action.type) {
    case 'FETCH_ALL_POSTS':
      return { ...state, posts: action.payload };
    case 'CREATE_POST':
      return { ...state, posts: action.payload };
    case 'DELETE_POST':
      return {
        ...state,
        posts: action.payload,
      };
    /* this will not be used on V1 
    case 'LIKE':
      return posts; */
    default:
      return { ...state };
  }
};
