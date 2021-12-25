const authReducer = (state: any = { authData: null }, action: any) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('user', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case 'SIGNUP':
      localStorage.setItem('user', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case 'SIGNIN':
      localStorage.setItem('user', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case 'LOGOUT':
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return { ...state };
  }
};
export default authReducer;
