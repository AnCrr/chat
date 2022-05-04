import { MESSAGES_SUCCESS, MESSAGES_COUNT_SUCCESS } from "./constants";
import { SOCKET_ADD_MESSAGE } from "../socket/constants";

const initialState = {
  data: [],
  count: null,
};

const sortByCreatedAt = (arr) => {
  return [...arr].sort((a, b) => a.createdAt - b.createdAt);
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS: {
      const { payload } = action;
      const {
        params: { queryParams },
      } = payload;

      let result = payload.data;

      if (queryParams.skip) {
        result = [...state.data, ...payload.data];
      }

      return {
        ...state,
        data: sortByCreatedAt(result),
      };
    }
    case SOCKET_ADD_MESSAGE: {
      const newState = { ...state };
      const hasMessage = state.data.some(
        (item) => item._id === action.payload._id
      );

      if (!hasMessage) {
        newState.data = [...newState.data, action.payload];
        newState.count = newState.count + 1;
      }

      return { ...newState };
    }
    case MESSAGES_COUNT_SUCCESS:
      return { ...state, count: action.payload };
    default:
      return state;
  }
};
