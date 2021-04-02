import * as actions from "../actions/axsVenues"

const initialState = {
  axsVenues: {
    axsVenues: {},
    searchAxsVenue: [],
    eventsByAxsVenue: {},
    skyBoxAxsVenueDup: []
  }
}

const axsVenues = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_AXS_VENUE_SUCCESS:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, axsVenues: action.payload }
      }
    case actions.SEARCH_SKYBOX_AXS_VENUE_FAILED:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, searchAxsVenue: [action.payload] }
      }
    case actions.SEARCH_SKYBOX_AXS_VENUE_MODAL_CLOSE:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, searchAxsVenue: [] }
      }
    case actions.OPEN_SKYBOX_AXS_VENUE_DUP_MODAL:
      return {
        ...state,
        axsVenues: {
          ...state.axsVenues,
          skyBoxAxsVenueDup: action.payload
        }
      }
    case actions.SELECT_MODAL_SKYBOX_AXS_VENUE:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, skyBoxAxsVenueDup: [] }
      }
    case actions.CLOSE_MODAL_SKYBOX_AXS_VENUE:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, skyBoxAxsVenueDup: [] }
      }

    case actions.FETCH_AXS_VENUE_PAGING_SUCCESS:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, axsVenues: action.payload }
      }

    case actions.CLEAR_AXS_VENUES:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, axsVenues: { axsVenueInfo: [] } }
      }

    case actions.FETCH_AXS_VENUE_SEARCH_SUCCESS:
      return {
        ...state,
        axsVenues: { ...state.axsVenues, axsVenues: action.payload }
      }

    default:
      return state
  }
}

export default axsVenues

export const getAxsVenues = state => state.axsVenues["axsVenues"]
export const getSearchAxsVenueData = state => state.axsVenues["searchAxsVenue"]
export const getSkyBoxAxsVenuesDup = state =>
  state.axsVenues["skyBoxAxsVenueDup"]
