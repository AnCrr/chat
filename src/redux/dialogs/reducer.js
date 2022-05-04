import {
  DIALOGS_SUCCESS,
  DIALOGS_COUNT_SUCCESS,
  USERS_SUCCESS,
} from "./constants";
import { SOCKET_DIALOG } from "../socket/constants";

const initialState = {
  data: [],
  count: null,
  users: [],
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DIALOGS_SUCCESS:
      return { ...state, data: [...state.data, ...action.payload] };
    case DIALOGS_COUNT_SUCCESS:
      return { ...state, count: action.payload };
    case SOCKET_DIALOG: {
      return {
        ...state,
        data: [...state.data, action.payload],
        count: state.count + 1,
      };
    }
    case USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    default:
      return state;
  }
};
