import { createAction } from "redux-actions"

export const FETCH_BOARDCASTING_STATUS = "FETCH_BOARDCASTING_STATUS"
export const fetchBoradcastingStatus = createAction(FETCH_BOARDCASTING_STATUS)

export const SET_BOARDCASTING_STATUS = "SET_BOARDCASTING_STATUS"
export const setBoardCastingStatus = createAction(SET_BOARDCASTING_STATUS)

//Broadcast all listings
export const BROADCAST_LISTING_REQUEST = "BROADCAST_LISTING_REQUEST"
export const broadcastListingRequest = createAction(BROADCAST_LISTING_REQUEST)

//UnBroadcast all listings
export const UNBROADCAST_LISTING_REQUEST = "UNBROADCAST_LISTING_REQUEST"
export const unBroadcastListingRequest = createAction(
  UNBROADCAST_LISTING_REQUEST
)
