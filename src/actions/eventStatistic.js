import { createAction } from "redux-actions"

// for Order Status Listing
export const FETCH_EVENT_STATISTIC_REQUEST = "FETCH_EVENT_STATISTIC_REQUEST"
export const fetchEventStatisticRequest = createAction(
  FETCH_EVENT_STATISTIC_REQUEST
)

export const FETCH_EVENT_STATISTIC_SUCCESS = "FETCH_EVENT_STATISTIC_SUCCESS"
export const fetchEventStatisticSuccess = createAction(
  FETCH_EVENT_STATISTIC_SUCCESS
)

export const FETCH_EVENT_MONITOR_REQUEST = "FETCH_EVENT_MONITOR_REQUEST"
export const FETCH_EVENT_MONITOR_SUCCESS = "FETCH_EVENT_MONITOR_SUCCESS"

export const fetchEventMonitorRequest = createAction(
  FETCH_EVENT_MONITOR_REQUEST
)

export const fetchEventMonitorSuccess = createAction(
  FETCH_EVENT_MONITOR_SUCCESS
)
