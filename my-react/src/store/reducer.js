const initialState = {
  list: [],
};

// 纯函数
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "ADD":
      return { ...state, list: [...state.list, actions.payload] };
    case "DELETE":
      return {
        ...state,
        list: state.list.filter((item) => item !== actions.payload),
      };
    case "UPDATE":
      return {
        ...state,
        list: state.list.map((item) =>
          item === actions.payload ? "update!" : item
        ),
      };
    default:
      return state;
  }
};

export default reducer;
