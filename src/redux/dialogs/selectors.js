import { createSelector } from "reselect";
import { getPromise } from "../helpers";

const getDialogs = (store) => store.dialogs;

export const getDialogsData = createSelector(
  [getDialogs],
  (dialogs) => dialogs?.data
);

export const getDialogsTotalCount = createSelector(
  [getDialogs],
  (dialogs) => dialogs?.count
);

export const getDialogsStatus = createSelector(
  [getPromise],
  (promise) => promise?.dialogs?.status || ""
);

export const getUsersData = createSelector(
  [getDialogs],
  (dialogs) => dialogs?.users
);
