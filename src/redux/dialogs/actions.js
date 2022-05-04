import {
  DIALOGS_SUCCESS,
  DIALOGS_COUNT_SUCCESS,
  USERS_SUCCESS,
} from "./constants";
import {
  fetchDialogs,
  fetchDialogsCount,
  fetchFindUsers,
} from "../../api/dialogs";
import { createAction, actionPromise } from "../helpers";

const setDialogs = (data) => createAction(DIALOGS_SUCCESS, data);
const setDialogsCount = (data) => createAction(DIALOGS_COUNT_SUCCESS, data);
const setUsers = (data) => createAction(USERS_SUCCESS, data);

export const getDialogs = (params) => async (dispatch) => {
  const res = await dispatch(actionPromise("dialogs", fetchDialogs(params)));

  if (res) {
    dispatch(setDialogs(res));
  }

  return res;
};

export const getDialogsCount = (params) => async (dispatch) => {
  const res = await dispatch(actionPromise("count", fetchDialogsCount(params)));

  if (!isNaN(res)) {
    dispatch(setDialogsCount(res));
  }
  return res;
};

export const getUsers = () => async (dispatch) => {
  const res = await dispatch(actionPromise("users", fetchFindUsers()));

  if (res) {
    dispatch(setUsers(res));
  }
  return res;
};
