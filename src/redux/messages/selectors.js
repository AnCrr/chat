import { createSelector } from "reselect";
import { getPromise } from "../helpers";

const getMessages = (store) => store.messages;

export const getMessagesData = createSelector(
  [getMessages],
  (messages) => messages?.data
);

export const getMessagesCountData = createSelector(
  [getMessages],
  (messages) => messages?.count
);

export const getMessagesStatus = createSelector(
  [getPromise],
  (promise) => promise?.messages?.status || ""
);
