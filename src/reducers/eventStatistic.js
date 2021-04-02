import * as actions from "../actions/eventStatistic"

const initalState = {
  eventStatisticListing: [],
  eventMonitorListing: []
}

const eventStatistic = (state = initalState, action) => {
  switch (action.type) {
    case actions.FETCH_EVENT_STATISTIC_SUCCESS:
      return { ...state, eventStatisticListing: action.payload }
    case actions.FETCH_EVENT_MONITOR_SUCCESS:
      return { ...state, eventMonitorListing: action.payload }
    default:
      return state
  }
}

export default eventStatistic

export const getEventStatistic = state => state.eventStatisticListing
export const getEventMonitor = state => state.eventMonitorListing
