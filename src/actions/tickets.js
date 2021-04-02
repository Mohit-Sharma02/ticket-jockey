import { createAction } from "redux-actions"

export const FFETCH_TICKETS_BY_EVENTID_REQUEST =
  "FFETCH_TICKETS_BY_EVENTID_REQUEST"
export const FFETCH_TICKETS_BY_EVENTID_STOP_REQUEST =
  "FFETCH_TICKETS_BY_EVENTID_STOP_REQUEST"
export const FETCH_TICKETS_BY_EVENTID_FAILURE =
  "FETCH_TICKETS_BY_EVENTID_FAILURE"
export const FETCH_TICKETS_BY_EVENTID_SUCCESS =
  "FETCH_TICKETS_BY_EVENTID_SUCCESS"
export const FETCH_TICKETS_BY_EVENTID_CLEAR = "FETCH_TICKETS_BY_EVENTID_CLEAR"

export const fetchTicketsByEventIdRequest = createAction(
  FFETCH_TICKETS_BY_EVENTID_REQUEST
)
export const fetchTicketsByEventIdFailure = createAction(
  FETCH_TICKETS_BY_EVENTID_FAILURE
)
export const fetchTicketsByEventIdSuccess = createAction(
  FETCH_TICKETS_BY_EVENTID_SUCCESS
)

export const fetchTicketsByEventIdClear = createAction(
  FETCH_TICKETS_BY_EVENTID_CLEAR
)

export const fetchTicketsByEventIdStopRequest = createAction(
  FFETCH_TICKETS_BY_EVENTID_STOP_REQUEST
)

//Selected event
export const SAVE_SELECT_EVENT = "SAVE_SELECT_EVENT"
export const CLEAR_SELECT_EVENT = "CLEAR_SELECT_EVENT"

export const saveSelectEvent = createAction(SAVE_SELECT_EVENT)
export const clearSelectEvent = createAction(CLEAR_SELECT_EVENT)
