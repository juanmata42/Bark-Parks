export default (state: any = { user: {} }, action: any) => {
  switch (action.type) {
    case 'UPDATE_AUTH_USER':
      return { ...state, user: action.payload };
    case 'DELETE_AUTH_USER':
      return state;
    case 'FETCH_AUTH_USER':
      return { ...state, user: action.payload };
    case 'SEND_FR_REQUEST':
      return { ...state, user: action.payload };
    case 'ACCEPT_FR_USER':
      return { ...state, user: action.payload };
    case 'REJECT_FR_USER':
      return { ...state, user: action.payload };
    case 'REJECT_INVITE_USER':
      return { ...state, user: action.payload };
    case 'ADD_FRIEND':
      return { ...state, user: action.payload };
    case 'DELETE_FRIEND':
      return { ...state, user: action.payload };
    case 'TELL_LOCATION':
      return { ...state, user: action.payload };
    case 'FAV_DOGSPOT':
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};
