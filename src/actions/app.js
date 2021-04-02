import { createAction } from "redux-actions"

export const APP_START_FETCHING = "APP_START_FETCHING"
export const APP_STOP_FETCHING = "APP_STOP_FETCHING"

export const APP_RECEIVE_ERROR = "APP_RECEIVE_ERROR"
export const APP_CLEAR_ERROR = "APP_CLEAR_ERROR"

export const APP_RECEIVE_ALERT = "APP_RECEIVE_ALERT"
export const APP_CLEAR_ALERT = "APP_CLEAR_ALERT"

export const EVENT_START_FETCHING = "EVENT_START_FETCHING"
export const EVENT_STOP_FETCHING = "EVENT_STOP_FETCHING"

export const BLACKLIST_START_FETCHING = "BLACKLIST_START_FETCHING"
export const BLACKLIST_STOP_FETCHING = "BLACKLIST_STOP_FETCHING"

export const ADDBLACKLIST_START_FETCHING = "ADDBLACKLIST_START_FETCHING"
export const ADDBLACKLIST_STOP_FETCHING = "ADDBLACKLIST_STOP_FETCHING"

export const RESETPASSWORD_START_FETCHING = "RESETPASSWORD_START_FETCHING"
export const RESETPASSWORD_STOP_FETCHING = "RESETPASSWORD_STOP_FETCHING"

export const UPDATE_PROFILE_START_FETCHING = "UPDATE_PROFILE_START_FETCHING"
export const UPDATE_PROFILE_STOP_FETCHING = "UPDATE_PROFILE_STOP_FETCHING"

export const appStartFetching = createAction(APP_START_FETCHING)
export const appStopFetching = createAction(APP_STOP_FETCHING)

export const eventStartFetching = createAction(EVENT_START_FETCHING)
export const eventStopFetching = createAction(EVENT_STOP_FETCHING)

export const blackListStartFetching = createAction(BLACKLIST_START_FETCHING)
export const blackListStopFetching = createAction(BLACKLIST_STOP_FETCHING)

export const addBlackListStartFetching = createAction(
  ADDBLACKLIST_START_FETCHING
)
export const addBlackListStopFetching = createAction(ADDBLACKLIST_STOP_FETCHING)

export const resetPasswordStartFetching = createAction(
  RESETPASSWORD_START_FETCHING
)
export const resetPasswordStopFetching = createAction(
  RESETPASSWORD_STOP_FETCHING
)

export const updateProfileStartFetching = createAction(
  UPDATE_PROFILE_START_FETCHING
)
export const updateProfileStopFetching = createAction(
  UPDATE_PROFILE_STOP_FETCHING
)

export const appReceiveError = createAction(APP_RECEIVE_ERROR)
export const appClearError = createAction(APP_CLEAR_ERROR)

export const appReceiveAlert = createAction(APP_RECEIVE_ALERT)
export const appClearAlert = createAction(APP_CLEAR_ALERT)

//WebSocket
export const INIT_WEB_SOCKET_REQUEST = "INIT_WEB_SOCKET_REQUEST"
export const initWebSocketRequest = createAction(INIT_WEB_SOCKET_REQUEST)
export const INIT_WEB_SOCKET_SUCCESS = "INIT_WEB_SOCKET_SUCCESS"
export const initWebSocketSuccess = createAction(INIT_WEB_SOCKET_SUCCESS)

//Firebase
export const INIT_FIREBASE_REQUEST = "INIT_FIREBASE_REQUEST"
export const initFirebaseRequest = createAction(INIT_FIREBASE_REQUEST)
export const CLOSE_FIREBASE = "CLOSE_FIREBASE"
export const closeFirebase = createAction(CLOSE_FIREBASE)

export const OPEN_WEB_SOCKET = "OPEN_WEB_SOCKET"
export const openWebSocket = createAction(OPEN_WEB_SOCKET)

export const CLOSE_WEB_SOCKET = "CLOSE_WEB_SOCKET"
export const closeWebSocket = createAction(CLOSE_WEB_SOCKET)

export const RECEIVE_MESSAGE_FROM_WEB_SOCKET = "RECEIVE_MESSAGE_FROM_WEB_SOCKET"
export const receiveMessageFromWebSocket = createAction(
  RECEIVE_MESSAGE_FROM_WEB_SOCKET
)
