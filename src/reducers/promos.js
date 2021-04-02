import {
  FETCH_PROMOS_SUCCESS,
  FETCH_EVENT_PROMOS_SUCCESS,
  FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS
} from "../actions/promos"

const promos = (
  state = {
    ids: [],
    dict: {},
    eventPromos: [],
    availablePromos: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_PROMOS_SUCCESS:
      return action.payload
    case FETCH_EVENT_PROMOS_SUCCESS:
      return { ...state, eventPromos: action.payload }
    case FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS:
      return { ...state, availablePromos: action.payload }
    default:
      return state
  }
}

export default promos
export const getPromos = state => state.dict
export const getEventPromos = state => state.eventPromos
export const getAvailablePromos = state => state.availablePromos
