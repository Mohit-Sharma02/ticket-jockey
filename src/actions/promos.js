import { createAction } from "redux-actions"

export const FETCH_PROMOS_REQUEST = "FETCH_PROMOS_REQUEST"
export const fetchPromosRequest = createAction(FETCH_PROMOS_REQUEST)
export const FETCH_PROMOS_SUCCESS = "FETCH_PROMOS_SUCCESS"
export const fetchPromosSuccess = createAction(FETCH_PROMOS_SUCCESS)

export const DELETE_PROMOS_REQUEST = "DELETE_PROMOS_REQUEST"
export const deletePromosRequest = createAction(DELETE_PROMOS_REQUEST)

export const ADD_PROMO_REQUEST = "ADD_PROMO_REQUEST"
export const addPromoRequest = createAction(ADD_PROMO_REQUEST)

//For Event promos

export const FETCH_EVENT_PROMOS_REQUEST = "FETCH_EVENT_PROMOS_REQUEST"
export const fetchEventPromosRequest = createAction(FETCH_EVENT_PROMOS_REQUEST)
export const FETCH_EVENT_PROMOS_SUCCESS = "FETCH_EVENT_PROMOS_SUCCESS"
export const fetchEventPromosSuccess = createAction(FETCH_EVENT_PROMOS_SUCCESS)

export const DELETE_EVENT_PROMOS_REQUEST = "DELETE_EVENT_PROMOS_REQUEST"
export const deleteEventPromosRequest = createAction(
  DELETE_EVENT_PROMOS_REQUEST
)

export const ADD_EVENT_PROMO_REQUEST = "ADD_EVENT_PROMO_REQUEST"
export const addEventPromoRequest = createAction(ADD_EVENT_PROMO_REQUEST)

//For Available offers

export const FETCH_AVAILABLE_EVENT_PROMOS_REQUEST =
  "FETCH_AVAILABLE_EVENT_PROMOS_REQUEST"
export const fetchAvailableEventPromosRequest = createAction(
  FETCH_AVAILABLE_EVENT_PROMOS_REQUEST
)
export const FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS =
  "FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS"
export const fetchAvailableEventPromosSuccess = createAction(
  FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS
)
