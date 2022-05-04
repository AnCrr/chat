import { jwtDecode } from "../../libs";
import { USER_SET } from "./constants";

const initialState = {
  data: {},
  token: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET:
      localStorage.setItem("authToken", action.payload);
      return {
        ...state,
        token: action.payload,
        data: jwtDecode(action.payload),
      };
    default:
      return state;
  }
};
