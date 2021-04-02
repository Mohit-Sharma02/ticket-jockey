import { createAction } from "redux-actions"

//MANAGED_venue events
export const CREATE_E_VENUE_REQUEST = "CREATE_E_VENUE_REQUEST"
export const CREATE_E_VENUE_SUCCESS = "CREATE_E_VENUE_SUCCESS"
export const CREATE_E_VENUE_FAILURE = "CREATE_E_VENUE_FAILURE"

export const createEVenueRequest = createAction(CREATE_E_VENUE_REQUEST)

export const createEVenueSuccess = createAction(CREATE_E_VENUE_SUCCESS)

export const createEVenueFailure = createAction(CREATE_E_VENUE_FAILURE)

// export const CLEAR_E_VENUES = "CLEAR_E_VENUES"

// export const clearEVenues = createAction(CLEAR_E_VENUES)

// export const FETCH_E_VENUE_SEARCH_REQUEST = "FETCH_E_VENUE_SEARCH_REQUEST"
// export const FETCH_E_VENUE_SEARCH_SUCCESS = "FETCH_E_VENUE_SEARCH_SUCCESS"

// export const fetchEVenueSearchRequest = createAction(
//   FETCH_E_VENUE_SEARCH_REQUEST
// )
// export const fetchEVeuneSearchSuccess = createAction(
//   FETCH_E_VENUE_SEARCH_SUCCESS
// )

export const UPDATE_BLACKLIST_EVENUE_REQUEST = "UPDATE_BLACKLIST_EVENUE_REQUEST"

export const updateIsBlackListEvenueRequest = createAction(
  UPDATE_BLACKLIST_EVENUE_REQUEST
)

export const DELETE_E_VENUE_REQUEST = "DELETE_E_VENUE_REQUEST"
export const DELETE_E_VENUE_SUCCESS = "DELETE_E_VENUE_SUCCESS"
export const DELETE_E_VENUE_FAILURE = "DELETE_E_VENUE_FAILURE"

export const deleteEVenueRequest = createAction(DELETE_E_VENUE_REQUEST)
export const deleteEVenueSuccess = createAction(DELETE_E_VENUE_SUCCESS)

export const FETCH_E_VENUE_REQUEST = "FETCH_E_VENUE_REQUEST"
export const FETCH_E_VENUE_SUCCESS = "FETCH_E_VENUE_SUCCESS"

export const fetchEVenueRequest = createAction(FETCH_E_VENUE_REQUEST)
export const fetchEVeuneSuccess = createAction(FETCH_E_VENUE_SUCCESS)

export const UPDATE_E_VENUE_REQUEST = "UPDATE_E_VENUE_REQUEST"
export const UPDATE_E_VENUE_SUCCESS = "UPDATE_E_VENUE_SUCCESS"

export const updateEVenueRequest = createAction(UPDATE_E_VENUE_REQUEST)
export const updateEVenueSuccess = createAction(UPDATE_E_VENUE_SUCCESS)

export const SET_SELECTED_VENUE = "SET_SELECTED_VENUE"
export const setSelectedVenue = createAction(SET_SELECTED_VENUE)
