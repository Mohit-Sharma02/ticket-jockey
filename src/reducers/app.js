import {
  APP_START_FETCHING,
  APP_STOP_FETCHING,
  EVENT_START_FETCHING,
  EVENT_STOP_FETCHING,
  APP_CLEAR_ERROR,
  APP_RECEIVE_ERROR,
  APP_RECEIVE_ALERT,
  APP_CLEAR_ALERT,
  INIT_WEB_SOCKET_SUCCESS,
  RESETPASSWORD_STOP_FETCHING,
  RESETPASSWORD_START_FETCHING,
  UPDATE_PROFILE_START_FETCHING,
  UPDATE_PROFILE_STOP_FETCHING,
  BLACKLIST_START_FETCHING,
  BLACKLIST_STOP_FETCHING,
  ADDBLACKLIST_START_FETCHING,
  ADDBLACKLIST_STOP_FETCHING
} from "../actions/app"

const initMsg = {
  type: "",
  message: ""
}

const app = (
  state = {
    fetching: false,
    eventFetching: false,
    blackListFetching: false,
    addBlackListFetching: false,
    resetPasswordFetching: false,
    updateProfileFetching: false,
    errorMsg: initMsg,
    alertMsg: initMsg,
    webSocket: null
  },
  action
) => {
  switch (action.type) {
    case APP_START_FETCHING:
      return { ...state, fetching: true }
    case APP_STOP_FETCHING:
      return { ...state, fetching: false }
    case EVENT_START_FETCHING:
      return { ...state, eventFetching: true }
    case EVENT_STOP_FETCHING:
      return { ...state, eventFetching: false }
    case BLACKLIST_START_FETCHING:
      return { ...state, blackListFetching: true }
    case BLACKLIST_STOP_FETCHING:
      return { ...state, blackListFetching: false }
    case ADDBLACKLIST_START_FETCHING:
      return { ...state, addBlackListFetching: true }
    case ADDBLACKLIST_STOP_FETCHING:
      return { ...state, addBlackListFetching: false }
    case RESETPASSWORD_START_FETCHING:
      return { ...state, resetPasswordFetching: true }
    case RESETPASSWORD_STOP_FETCHING:
      return { ...state, resetPasswordFetching: false }
    case UPDATE_PROFILE_START_FETCHING:
      return { ...state, updateProfileFetching: true }
    case UPDATE_PROFILE_STOP_FETCHING:
      return { ...state, updateProfileFetching: false }

    case APP_RECEIVE_ERROR:
      return {
        ...state,
        errorMsg: action.payload
      }
    case APP_CLEAR_ERROR:
      return { ...state, errorMsg: initMsg }
    case APP_RECEIVE_ALERT:
      return { ...state, alertMsg: action.payload }
    case APP_CLEAR_ALERT:
      return { ...state, alertMsg: initMsg }
    case INIT_WEB_SOCKET_SUCCESS:
      return { ...state, webSocket: action.payload }
    default:
      return state
  }
}

export default app

export const getIsFetching = state => state.fetching
export const getIsEventFetching = state => state.eventFetching
export const getIsBlackListFetching = state => state.blackListFetching
export const getIsAddBlackListFetching = state => state.addBlackListFetching
export const getIsResetPasswordFetching = state => state.resetPasswordFetching
export const getIsUpdateProfileFetching = state => state.updateProfileFetching
export const getErrorMsg = state => state.errorMsg
export const getAlertMsg = state => state.alertMsg
export const getWebSocket = state => state.webSocket
