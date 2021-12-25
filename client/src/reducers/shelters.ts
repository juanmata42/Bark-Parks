export default (
  state: any = {
    shelters: [],
  },
  action: any
) => {
  switch (action.type) {
    case 'FETCH_ALL_SHELTERS':
      return { ...state, shelters: action.payload };
    case 'CREATE_SHELTER':
      return { ...state, shelters: action.payload };
    default:
      return { ...state };
  }
};
