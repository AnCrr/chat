import { createAction } from "../helpers";
import { USER_SET } from "./constants";

export const setUser = (data) => createAction(USER_SET, data);
