import { PROMISE_STATUSES, PROMISE_TYPE } from "./constants";

export const createAction = (type, payload) => ({ type, payload });

const actionPending = (name) => {
  return { type: PROMISE_TYPE, status: PROMISE_STATUSES.PENDING, name };
};

const actionResolved = (name, payload) => {
  return {
    type: PROMISE_TYPE,
    status: PROMISE_STATUSES.RESOLVED,
    name,
    payload,
  };
};
const actionRejected = (name, error) => ({
  type: PROMISE_TYPE,
  status: PROMISE_STATUSES.REJECTED,
  name,
  error,
});

export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    let payload = await promise;
    dispatch(actionResolved(name, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};

export const promiseReducer = (state = {}, { type, name, status, error }) => {
  if (type === PROMISE_TYPE) {
    return {
      ...state,
      [name]: { status, error },
    };
  }
  return state;
};

export const getPromise = (store) => store.promise;

export const isFetching = (status) => status === PROMISE_STATUSES.PENDING;
