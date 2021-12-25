export default (
  state: any = {
    dogspots: [],
  },
  action: any
) => {
  switch (action.type) {
    case 'FETCH_ALL_DOGSPOTS':
      return { ...state, dogspots: action.payload };
    case 'CREATE_DOGSPOT':
      return { ...state, dogspots: action.payload };
    case 'FAV_DOGSPOT':
      return { ...state, dogspots: action.payload };
    case 'RATE_DOGSPOT':
      return { ...state, dogspots: action.payload };
    case 'TELL_LOCATION_DOGSPOT':
      return { ...state, dogspots: action.payload };
    case 'RATE_DOGSPOT':
      return { ...state, dogspots: action.payload };
    default:
      return { ...state };
  }
};
