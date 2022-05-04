import { createSelector } from "reselect";

const getAuth = (store) => store.auth;

export const getUserId = createSelector(
  [getAuth],
  (auth) => auth?.data?.sub?.id
);
