import {
  FETCH_EVENTS_LOG_SUCCESS,
  FETCH_LOG_DETAILS_SUCCESS,
  FETCH_LONG_TERM_LOG_SUCCESS,
  FETCH_MEDIUM_TERM_LOG_SUCCESS,
  FETCH_VIEW_LOG_SUCCESS,
  FETCH_INSTANCE_LOG_SUCCESS,
  FETCH_FAILED_EVENT_LOG_SUCCESS,
  FETCH_EVENT_LOG_INFO_SUCCESS
} from "../actions/logs"

const logs = (
  state = {
    eventsLogs: {
      shortTerm: [],
      nearTerm: [],
      mediumTerm: [],
      longTerm: []
    },
    viewLog: {},
    eventDetailLogs: {},
    logDownloaded: null,
    failedEventLogDetails: {},
    eventsLogInfo: {}
  },
  action
) => {
  switch (action.type) {
    case FETCH_EVENTS_LOG_SUCCESS:
      return {
        ...state,
        eventsLogs: action.payload
      }
    case FETCH_LOG_DETAILS_SUCCESS:
      return {
        ...state,
        nearLogs: action.payload
      }
    case FETCH_MEDIUM_TERM_LOG_SUCCESS:
      return {
        ...state,
        mediumTermLogs: action.payload
      }
    case FETCH_LONG_TERM_LOG_SUCCESS:
      return {
        ...state,
        longTermLogs: action.payload
      }
    case FETCH_VIEW_LOG_SUCCESS:
      return {
        ...state,
        viewLog: action.payload
      }
    case FETCH_INSTANCE_LOG_SUCCESS:
      return { ...state, logDownloaded: action.payload }
    case FETCH_FAILED_EVENT_LOG_SUCCESS:
      return { ...state, failedEventLogDetails: action.payload }
    case FETCH_EVENT_LOG_INFO_SUCCESS:
      return { ...state, eventsLogInfo: action.payload }
    default:
      return state
  }
}

export default logs
export const getEventsLog = state => state.eventsLogs
export const getShortTermLogs = state => state.shortTermLogs
export const getNearLogs = state => state.nearLogs
export const getMediumTermLogs = state => state.mediumTermLogs
export const getLongTermLogs = state => state.longTermLogs
export const getEventLogDetails = state => state.eventDetailLogs
export const getViewLog = state => state.viewLog
export const getDownLoadedInstanceLog = state => state.logDownloaded
export const getFailedEventLog = state => state.failedEventLogDetails
export const getEventsLogInfo = state => state.eventsLogInfo
