export default (state: any = { users: [] }, action: any) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload };
    default:
      return { ...state };
  }
};
