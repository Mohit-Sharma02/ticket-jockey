import { createAction } from "redux-actions"

//MANAGED_venue events
export const CREATE_MANAGED_VENUE_REQUEST = "CREATE_MANAGED_VENUE_REQUEST"
export const CREATE_MANAGED_VENUE_SUCCESS = "CREATE_MANAGED_VENUE_SUCCESS"
export const CREATE_MANAGED_VENUE_FAILURE = "CREATE_MANAGED_VENUE_FAILURE"

export const createManagedVenueRequest = createAction(
  CREATE_MANAGED_VENUE_REQUEST
)

export const createManagedVenueSuccess = createAction(
  CREATE_MANAGED_VENUE_SUCCESS
)

export const createManagedVenueFailure = createAction(
  CREATE_MANAGED_VENUE_FAILURE
)

export const SEARCH_SKYBOX_VENUE_REQUEST = "SEARCH_SKYBOX_VENUE_REQUEST"
export const SEARCH_SKYBOX_VENUE_FAILED = "SEARCH_SKYBOX_VENUE_FAILED"

export const searchSkyboxVenueRequest = createAction(
  SEARCH_SKYBOX_VENUE_REQUEST
)

export const searchSkyboxVenueFailure = createAction(SEARCH_SKYBOX_VENUE_FAILED)

export const OPEN_SKYBOX_VENUE_DUP_MODAL = "OPEN_SKYBOX_VENUE_DUP_MODAL"

export const OpenSkyboxVenueDupModal = createAction(OPEN_SKYBOX_VENUE_DUP_MODAL)

export const SELECT_MODAL_SKYBOX_VENUE = "SELECT_MODAL_SKYBOX_VENUE"

export const selectSkyboxVenue = createAction(SELECT_MODAL_SKYBOX_VENUE)

export const CLOSE_MODAL_SKYBOX_VENUE = "CLOSE_MODAL_SKYBOX_VENUE"

export const closeSkyboxVenueModal = createAction(CLOSE_MODAL_SKYBOX_VENUE)

export const CLEAR_MANAGED_VENUES = "CLEAR_MANAGED_VENUES"

export const clearManagedVenues = createAction(CLEAR_MANAGED_VENUES)

export const FETCH_MANAGED_VENUE_SEARCH_REQUEST =
  "FETCH_MANAGED_VENUE_SEARCH_REQUEST"
export const FETCH_MANAGED_VENUE_SEARCH_SUCCESS =
  "FETCH_MANAGED_VENUE_SEARCH_SUCCESS"

export const fetchManagedVenueSearchRequest = createAction(
  FETCH_MANAGED_VENUE_SEARCH_REQUEST
)
export const fetchManagedVeuneSearchSuccess = createAction(
  FETCH_MANAGED_VENUE_SEARCH_SUCCESS
)

export const SEARCH_SKYBOX_VENUE_MODAL_CLOSE = "SEARCH_SKYBOX_VENUE_MODAL_CLOSE"

export const closeModalSkyBoxVenue = createAction(
  SEARCH_SKYBOX_VENUE_MODAL_CLOSE
)

export const DELETE_MANAGED_VENUE_REQUEST = "DELETE_MANAGED_VENUE_REQUEST"
export const DELETE_MANAGED_VENUE_SUCCESS = "DELETE_MANAGED_VENUE_SUCCESS"
export const DELETE_MANAGED_VENUE_FAILURE = "DELETE_MANAGED_VENUE_FAILURE"

export const deleteManagedVenueRequest = createAction(
  DELETE_MANAGED_VENUE_REQUEST
)
export const deleteManagedVenueSuccess = createAction(
  DELETE_MANAGED_VENUE_SUCCESS
)

export const FETCH_MANAGED_VENUE_REQUEST = "FETCH_MANAGED_VENUE_REQUEST"
export const FETCH_MANAGED_VENUE_SUCCESS = "FETCH_MANAGED_VENUE_SUCCESS"

export const fetchManagedVenueRequest = createAction(
  FETCH_MANAGED_VENUE_REQUEST
)
export const fetchManagedVeuneSuccess = createAction(
  FETCH_MANAGED_VENUE_SUCCESS
)

export const FETCH_MANAGED_VENUE_PAGING_REQUEST =
  "FETCH_MANAGED_VENUE_PAGING_REQUEST"
export const FETCH_MANAGED_VENUE_PAGING_SUCCESS =
  "FETCH_MANAGED_VENUE_PAGING_SUCCESS"

export const fetchManagedVenuePagingRequest = createAction(
  FETCH_MANAGED_VENUE_PAGING_REQUEST
)
export const fetchManagedVeunePagingSuccess = createAction(
  FETCH_MANAGED_VENUE_PAGING_SUCCESS
)

export const UPDATE_MANAGED_VENUE_REQUEST = "UPDATE_MANAGED_VENUE_REQUEST"
export const UPDATE_MANAGED_VENUE_SUCCESS = "UPDATE_MANAGED_VENUE_SUCCESS"

export const updateManagedVenueRequest = createAction(
  UPDATE_MANAGED_VENUE_REQUEST
)
export const updateManagedVenueSuccess = createAction(
  UPDATE_MANAGED_VENUE_SUCCESS
)

export const UPDATE_PRICE_MARKUP_PCT_VENUE_REQUEST =
  "UPDATE_PRICE_MARKUP_PCT_VENUE_REQUEST"
export const UPDATE_PRICE_MARKUP_PCT_VENUE_SUCCESS =
  "UPDATE_PRICE_MARKUP_PCT_VENUE_SUCCESS"

export const updatePriceMarkUpPctForVenueRequest = createAction(
  UPDATE_PRICE_MARKUP_PCT_VENUE_REQUEST
)
export const updatePriceMarkUpPctForVenueSuccess = createAction(
  UPDATE_PRICE_MARKUP_PCT_VENUE_SUCCESS
)
