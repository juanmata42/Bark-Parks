export default (
  state: any = {
    groups: [],
  },
  action: any
) => {
  switch (action.type) {
    case 'FETCH_GROUP':
      return { ...state, groups: action.payload };
    case 'CREATE_GROUP':
      return { ...state, groups: action.payload };
    case 'JOIN_GROUP':
      return { ...state, groups: action.payload };
    case 'LEAVE_GROUP':
      return { ...state, groups: action.payload };
    case 'INVITE_GROUP':
      return { ...state, groups: action.payload };
    case 'REJECT_INVITE_GROUP':
      return { ...state, groups: action.payload };
    case 'EDIT_MEETUPS':
      return { ...state, groups: action.payload };
    case 'GET_GROUPS':
      return { ...state, groups: action.payload };
    default:
      return { ...state };
  }
};
