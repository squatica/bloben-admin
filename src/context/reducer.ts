// tslint:disable-next-line:cyclomatic-complexity
const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'isLogged':
      return {
        ...state,
        isLogged: action.payload,
      };
    case 'version':
      return {
        ...state,
        version: action.payload,
      };
    case 'user':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
