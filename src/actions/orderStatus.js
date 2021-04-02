import { createAction } from "redux-actions"

// for Order Status Listing
export const FETCH_ORDER_STATUS_REQUEST = "FETCH_ORDER_STATUS_REQUEST"
export const fetchOrderStatusRequest = createAction(FETCH_ORDER_STATUS_REQUEST)

export const FETCH_ORDER_STATUS_SUCCESS = "FETCH_ORDER_STATUS_SUCCESS"
export const fetchOrderStatusSuccess = createAction(FETCH_ORDER_STATUS_SUCCESS)
