import { createAction } from "redux-actions"

export const FETCH_EVENTS_LOG_REQUEST = "FETCH_EVENTS_LOG_REQUEST"
export const fetchEventsLogRequest = createAction(FETCH_EVENTS_LOG_REQUEST)

export const FETCH_EVENTS_LOG_SUCCESS = "FETCH_EVENTS_LOG_SUCCESS"
export const fetchEventsLogSuccess = createAction(FETCH_EVENTS_LOG_SUCCESS)

export const FETCH_LOG_DETAILS_REQUEST = "FETCH_LOG_DETAILS_REQUEST"
export const fetchEventsLogDetailsRequest = createAction(
  FETCH_LOG_DETAILS_REQUEST
)

export const FETCH_LOG_DETAILS_SUCCESS = "FETCH_LOG_DETAILS_SUCCESS"
export const fetchEventsLogDetailsSuccess = createAction(
  FETCH_LOG_DETAILS_SUCCESS
)

export const FETCH_MEDIUM_TERM_LOG_REQUEST = "FETCH_MEDIUM_TERM_LOG_REQUEST"
export const fetchMediumTermEventsLogRequest = createAction(
  FETCH_MEDIUM_TERM_LOG_REQUEST
)

export const FETCH_MEDIUM_TERM_LOG_SUCCESS = "FETCH_MEDIUM_TERM_LOG_SUCCESS"
export const fetchMediumTermEventsLogSuccess = createAction(
  FETCH_MEDIUM_TERM_LOG_SUCCESS
)

export const FETCH_LONG_TERM_LOG_REQUEST = "FETCH_LONG_TERM_LOG_REQUEST"
export const fetchLongTermEventsLogRequest = createAction(
  FETCH_LONG_TERM_LOG_REQUEST
)

export const FETCH_LONG_TERM_LOG_SUCCESS = "FETCH_LONG_TERM_LOG_SUCCESS"
export const fetchLongTermEventsLogSuccess = createAction(
  FETCH_LONG_TERM_LOG_SUCCESS
)

export const FETCH_VIEW_LOG_SUCCESS = "FETCH_VEIW_LOG_SUCCESS"
export const fetchViewLogSuccess = createAction(FETCH_VIEW_LOG_SUCCESS)

export const FETCH_VIEW_LOG_REQUEST = "FETCH_VIEW_LOG_REQUEST"
export const fetchViewLogRequest = createAction(FETCH_VIEW_LOG_REQUEST)

// For downLoading Log of intanceId
export const FETCH_INSTANCE_LOG_REQUEST = "FETCH_INSTANCE_LOG_REQUEST"
export const fetchInstanceLogRequest = createAction(FETCH_INSTANCE_LOG_REQUEST)

export const FETCH_INSTANCE_LOG_SUCCESS = "FETCH_INSTANCE_LOG_SUCCESS"
export const fetchInstanceLogSuccess = createAction(FETCH_INSTANCE_LOG_SUCCESS)

// For downLoading Log of intanceId for Failed
export const FETCH_FAILED_EVENT_LOG_REQUEST = "FETCH_FAILED_EVENT_LOG_REQUEST"
export const fetchFailedEventLogRequest = createAction(
  FETCH_FAILED_EVENT_LOG_REQUEST
)

export const FETCH_FAILED_EVENT_LOG_SUCCESS = "FETCH_FAILED_EVENT_LOG_SUCCESS"
export const fetchFailedEventLogSuccess = createAction(
  FETCH_FAILED_EVENT_LOG_SUCCESS
)

export const FETCH_EVENT_LOG_INFO_REQUEST = "FETCH_EVENT_LOG_INFO_REQUEST"
export const fetchEventsLogInfoRequest = createAction(
  FETCH_EVENT_LOG_INFO_REQUEST
)

export const FETCH_EVENT_LOG_INFO_SUCCESS = "FETCH_EVENT_LOG_INFO_SUCCESS"
export const fetchEventsLogInfoSuccess = createAction(
  FETCH_EVENT_LOG_INFO_SUCCESS
)
