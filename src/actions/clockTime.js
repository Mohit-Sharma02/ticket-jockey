import { createAction } from "redux-actions"

export const FETCH_CLOCKTIMER_REQUEST = "FETCH_CLOCKTIMER_REQUEST"
export const fetchClockTimerRequest = createAction(FETCH_CLOCKTIMER_REQUEST)

export const FETCH_CLOCKTIMER_SUCCESS = "FETCH_CLOCKTIMER_SUCCESS"
export const fetchClockTimerSuccess = createAction(FETCH_CLOCKTIMER_SUCCESS)

export const CREATE_TIMER_REQUEST = "CREATE_TIMER_REQUEST"
export const CREATE_TIMER_SUCCESS = "CREATE_TIMER_SUCCESS"

export const createTimerRequest = createAction(CREATE_TIMER_REQUEST)

export const createTimerSuccess = createAction(CREATE_TIMER_SUCCESS)

export const UPDATE_TIMER_REQUEST = "UPDATE_TIMER_REQUEST"
export const UPDATE_TIMER_SUCCESS = "UPDATE_TIMER_SUCCESS"

export const updateClockTimerRequest = createAction(UPDATE_TIMER_REQUEST)
export const updateClockTimerSuccess = createAction(UPDATE_TIMER_SUCCESS)

export const UPDATE_ADMIN_TIMER_REQUEST = "UPDATE_ADMIN_TIMER_REQUEST"
export const UPDATE_ADMIN_TIMER_SUCCESS = "UPDATE_ADMIN_TIMER_SUCCESS"

export const updateAdminClockTimerRequest = createAction(
  UPDATE_ADMIN_TIMER_REQUEST
)
export const updateAdminClockTimerSuccess = createAction(
  UPDATE_ADMIN_TIMER_SUCCESS
)

export const DELETE_TIME_REQUEST = "DELETE_TIME_REQUEST"
export const DELETE_TIME_SUCCESS = "DELETE_TIME_SUCCESS"

export const deleteUserRequest = createAction(DELETE_TIME_REQUEST)
export const deleteUserSuccess = createAction(DELETE_TIME_SUCCESS)
