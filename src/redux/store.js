import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { authReducer } from "./auth/reducer";
import { dialogsReducer } from "./dialogs/reducer";
import { messagesReducer } from "./messages/reducer";
import { promiseReducer } from "./helpers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
  combineReducers({
    auth: authReducer,
    promise: promiseReducer,
    dialogs: dialogsReducer,
    messages: messagesReducer,
  }),
  enhancer
);
