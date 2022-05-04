import {
  fetchSendMessage,
  fetchMessages,
  fetchMessagesCount,
} from "../../api/messages";
import { actionPromise, createAction } from "../helpers";
import { MESSAGES_SUCCESS, MESSAGES_COUNT_SUCCESS } from "./constants";

const setMessages = (data, params) =>
  createAction(MESSAGES_SUCCESS, { data, params });
const setMessagesCount = (data) => createAction(MESSAGES_COUNT_SUCCESS, data);

export const sendMessage = (params) => async (dispatch) => {
  const res = await dispatch(
    actionPromise("messages", fetchSendMessage(params))
  );

  return res;
};

export const getMessages = (params) => async (dispatch) => {
  const res = await dispatch(actionPromise("messages", fetchMessages(params)));

  if (res) {
    dispatch(setMessages(res, params));
  }
  return res;
};

export const getMessagesCount = (params) => async (dispatch) => {
  const res = await dispatch(
    actionPromise("count", fetchMessagesCount(params))
  );

  if (!isNaN(res)) {
    dispatch(setMessagesCount(res));
  }
  return res;
};
