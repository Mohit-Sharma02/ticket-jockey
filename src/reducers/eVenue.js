import * as actions from "../actions/eVenue"

const initialState = {
  eVenues: {
    evenues: {},
    eventsByEVenue: {}
  },
  selectedEvenue: {}
}

const eVenues = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_E_VENUE_SUCCESS:
      return {
        ...state,
        eVenues: { ...state.eVenues, evenues: action.payload }
      }

    case actions.SET_SELECTED_VENUE:
      return {
        ...state,
        selectedEvenue: action.payload
      }

    default:
      return state
  }
}

export default eVenues

export const getEVenues = state => state.eVenues["evenues"]
export const getSelectedEVenue = state => state.selectedEvenue
