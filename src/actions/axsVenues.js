import { createAction } from "redux-actions"

export const FETCH_AXS_VENUE_PAGING_REQUEST = "FETCH_AXS_VENUE_PAGING_REQUEST"
export const FETCH_AXS_VENUE_PAGING_SUCCESS = "FETCH_AXS_VENUE_PAGING_SUCCESS"

export const fetchAxsVenuePagingRequest = createAction(
  FETCH_AXS_VENUE_PAGING_REQUEST
)
export const fetchAxsVeunePagingSuccess = createAction(
  FETCH_AXS_VENUE_PAGING_SUCCESS
)

export const FETCH_AXS_VENUE_SEARCH_REQUEST = "FETCH_AXS_VENUE_SEARCH_REQUEST"
export const FETCH_AXS_VENUE_SEARCH_SUCCESS = "FETCH_AXS_VENUE_SEARCH_SUCCESS"

export const fetchAxsVenueSearchRequest = createAction(
  FETCH_AXS_VENUE_SEARCH_REQUEST
)
export const fetchAxsVeuneSearchSuccess = createAction(
  FETCH_AXS_VENUE_SEARCH_SUCCESS
)

export const CREATE_AXS_VENUE_REQUEST = "CREATE_AXS_VENUE_REQUEST"
export const CREATE_AXS_VENUE_SUCCESS = "CREATE_AXS_VENUE_SUCCESS"
export const CREATE_AXS_VENUE_FAILURE = "CREATE_AXS_VENUE_FAILURE"

export const createAxsVenueRequest = createAction(CREATE_AXS_VENUE_REQUEST)

export const createAxsVenueSuccess = createAction(CREATE_AXS_VENUE_SUCCESS)

export const createAxsVenueFailure = createAction(CREATE_AXS_VENUE_FAILURE)

export const SEARCH_SKYBOX_AXS_VENUE_REQUEST =
  "SEARCH_SKYBOX__AXS_VENUE_REQUEST"
export const SEARCH_SKYBOX_AXS_VENUE_FAILED = "SEARCH_SKYBOX_AXS_VENUE_FAILED"

export const searchSkyboxAxsVenueRequest = createAction(
  SEARCH_SKYBOX_AXS_VENUE_REQUEST
)

export const searchSkyboxAxsVenueFailure = createAction(
  SEARCH_SKYBOX_AXS_VENUE_FAILED
)

export const OPEN_SKYBOX_AXS_VENUE_DUP_MODAL = "OPEN_SKYBOX_AXS_VENUE_DUP_MODAL"

export const OpenSkyboxAxsVenueDupModal = createAction(
  OPEN_SKYBOX_AXS_VENUE_DUP_MODAL
)

export const SELECT_MODAL_SKYBOX_AXS_VENUE = "SELECT_MODAL_SKYBOX_AXS_VENUE"

export const selectSkyboxAxsVenue = createAction(SELECT_MODAL_SKYBOX_AXS_VENUE)

export const CLOSE_MODAL_SKYBOX_AXS_VENUE = "CLOSE_MODAL_SKYBOX_AXS_VENUE"

export const closeSkyboxAxsVenueModal = createAction(
  CLOSE_MODAL_SKYBOX_AXS_VENUE
)

export const CLEAR_AXS_VENUES = "CLEAR_AXS_VENUES"

export const clearAxsVenues = createAction(CLEAR_AXS_VENUES)

export const SEARCH_SKYBOX_AXS_VENUE_MODAL_CLOSE =
  "SEARCH_SKYBOX_AXS_VENUE_MODAL_CLOSE"

export const closeModalSkyBoxAxsVenue = createAction(
  SEARCH_SKYBOX_AXS_VENUE_MODAL_CLOSE
)

export const DELETE_AXS_VENUE_REQUEST = "DELETE_AXS_VENUE_REQUEST"
export const DELETE_AXS_VENUE_SUCCESS = "DELETE_AXS_VENUE_SUCCESS"
export const DELETE_AXS_VENUE_FAILURE = "DELETE_AXS_VENUE_FAILURE"

export const deleteAxsVenueRequest = createAction(DELETE_AXS_VENUE_REQUEST)
export const deleteAxsVenueSuccess = createAction(DELETE_AXS_VENUE_SUCCESS)

export const FETCH_AXS_VENUE_REQUEST = "FETCH_AXS_VENUE_REQUEST"
export const FETCH_AXS_VENUE_SUCCESS = "FETCH_AXS_VENUE_SUCCESS"

export const fetchAxsVenueRequest = createAction(FETCH_AXS_VENUE_REQUEST)
export const fetchAxsVeuneSuccess = createAction(FETCH_AXS_VENUE_SUCCESS)

export const UPDATE_AXS_VENUE_REQUEST = "UPDATE_AXS_VENUE_REQUEST"
export const UPDATE_AXS_VENUE_SUCCESS = "UPDATE_AXS_VENUE_SUCCESS"

export const updateAxsVenueRequest = createAction(UPDATE_AXS_VENUE_REQUEST)
export const updateAxsVenueSuccess = createAction(UPDATE_AXS_VENUE_SUCCESS)

// export const UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_REQUEST =
//     "UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_REQUEST"
// export const UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_SUCCESS =
//     "UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_SUCCESS"

// export const updatePriceMarkUpPctForAxsVenueRequest = createAction(
//     UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_REQUEST
// )
// export const updatePriceMarkUpPctForAxsVenueSuccess = createAction(
//     UPDATE_PRICE_MARKUP_PCT_AXS_VENUE_SUCCESS
// )
