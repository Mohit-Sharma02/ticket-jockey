import * as actions from "../actions/venues"

const initialState = {
  managedVenues: {
    venues: {},
    eventsByVenue: {}, //keyword(venue) --> managedEvents
    searchVenue: [],
    skyBoxVenueDup: []
  }
}

const venues = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MANAGED_VENUE_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      }
    case actions.SEARCH_SKYBOX_VENUE_FAILED:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, searchVenue: [action.payload] }
      }
    case actions.SEARCH_SKYBOX_VENUE_MODAL_CLOSE:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, searchVenue: [] }
      }
    case actions.OPEN_SKYBOX_VENUE_DUP_MODAL:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          skyBoxVenueDup: action.payload
        }
      }
    case actions.SELECT_MODAL_SKYBOX_VENUE:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, skyBoxVenueDup: [] }
      }
    case actions.CLOSE_MODAL_SKYBOX_VENUE:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, skyBoxVenueDup: [] }
      }
    case actions.FETCH_MANAGED_VENUE_PAGING_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      }
    case actions.CLEAR_MANAGED_VENUES:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: { venueInfo: [] } }
      }
    case actions.FETCH_MANAGED_VENUE_SEARCH_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      }

    default:
      return state
  }
}

export default venues

export const getManagedVenues = state => state.managedVenues["venues"]
export const getSearchVenueData = state => state.managedVenues["searchVenue"]
export const getSkyBoxVenuesDup = state => state.managedVenues["skyBoxVenueDup"]
