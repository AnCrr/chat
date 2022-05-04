import { createAction } from "../helpers";
import { SOCKET_ADD_MESSAGE, SOCKET_DIALOG } from "./constants";

export const socketAddMessage = (data) =>
  createAction(SOCKET_ADD_MESSAGE, data);

export const socketDialog = (data) => createAction(SOCKET_DIALOG, data);
