import * as actions from "../actions/tickets"
import {
  FETCH_VALID_LISTINGS_SUCCESS,
  FETCH_TRACKED_LISTINGS_SUCCESS,
  FETCH_SOLD_LISTINGS_SUCCESS
} from "../actions/listings"

const initalState = {
  selectedEvent: {},
  summary: {},
  groups: {},
  pctVenueAvail: null,
  tickets: {},
  validListings: {},
  soldListings: {},
  trackedListings: {}
}

const ticketsByEvent = (state = initalState, action) => {
  switch (action.type) {
    case actions.FETCH_TICKETS_BY_EVENTID_SUCCESS:
      return { ...state, ...action.payload }
    case actions.FETCH_TICKETS_BY_EVENTID_CLEAR:
      return (state = initalState)
    case actions.SAVE_SELECT_EVENT:
      return { ...state, selectedEvent: action.payload }
    case actions.CLEAR_SELECT_EVENT:
      return { ...state, selectedEvent: {} }
    case FETCH_VALID_LISTINGS_SUCCESS:
      return { ...state, validListings: action.payload }
    case FETCH_TRACKED_LISTINGS_SUCCESS:
      return { ...state, trackedListings: action.payload }
    case FETCH_SOLD_LISTINGS_SUCCESS:
      return { ...state, soldListings: action.payload }
    default:
      return state
  }
}

export default ticketsByEvent

export const getTicketsSummary = state => state.summary
export const getTicketsGroups = state => state.groups
export const getTickets = state => state.tickets
export const getSelectedTicket = state => state.selectedEvent
export const getValidListings = state => state.validListings
export const getTrackedListings = state => state.trackedListings
export const getSoldListings = state => state.soldListings
export const getPctVenueAvail = state => state.pctVenueAvail
