import * as actions from "../actions/events"
import { VIP, PARKING, TOUR, PRACTICE } from "../constants/events"
import { deleteItemFromStateById } from "./utils"

const initialSearchEvents = {
  events: [],
  totalEventsNum: 0,
  filterEvents: [],
  filters: {
    [`${PARKING}`]: true,
    [`${PRACTICE}`]: true,
    [`${TOUR}`]: false,
    [`${VIP}`]: false
  },
  skyBoxVenueId: "",
  tMasterVenueId: ""
}

const initialState = {
  searchEvents: initialSearchEvents,
  managedEvents: {
    events: [],
    skyBoxEventsDup: {},
    noSkyBoxEvents: []
  },
  managedEventsQueue: {
    ids: [],
    dict: {}
  },
  eventDetailsLog: {},
  rePricingEventLog: {},
  pricePoint: {
    pricePointList: []
  },
  secondaryMarketList: [],
  blackListedData: [],
  availableOffers: []
}

const filterEventsByKeywords = (filters, events) => {
  const keywords = Object.entries(filters).reduce((accu, [key, value]) => {
    if (value) accu.push(key)

    return accu
  }, [])

  return events.filter(
    ({ eventName }) =>
      !keywords.some(keyword =>
        eventName.toLowerCase().includes(keyword.toLowerCase())
      )
  )
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR_SEARCH_EVENTS:
      return {
        ...state,
        searchEvents: initialSearchEvents
      }
    case actions.FETCH_EVENTS_BY_KEYWORD_SUCCESS:
      const { events, totalEventsNum } = action.payload
      return {
        ...state,
        searchEvents: {
          ...state.searchEvents,
          events,
          totalEventsNum,
          filterEvents: filterEventsByKeywords(
            state.searchEvents.filters,
            events
          ),
          skyBoxVenueId: "",
          tMasterVenueId: ""
        }
      }
    case actions.FFETCH_EVENTS_BY_KEYWORD_CLEAR:
      return {
        ...initialState,
        searchEvents: {
          ...initialState.searchEvents,
          filters: state.searchEvents.filters
        }
      }
    case actions.FETCH_MANAGED_EVENTS_SUCCESS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          events: action.payload
        }
      }
    case actions.FETCH_MANAGED_EVENTS_FILTER_SUCCESS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          events: action.payload
        }
      }
    case actions.FETCH_EVENT_BY_EVENTID_SUCCESS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          events: action.payload
        }
      }
    case actions.CLEAR_MANAGED_EVENTS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          events: { eventInfo: [] }
        }
      }
    case actions.SHOW_MODAL_SKYBOX_EVENTS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          skyBoxEventsDup: action.payload
        }
      }
    case actions.SELECT_MODAL_SKYBOX_EVENTS:
      return {
        ...state,
        managedEvents: { ...state.managedEvents, skyBoxEventsDup: {} }
      }
    case actions.SHOW_MODAL_NO_SKYBOX_EVENTS:
      return {
        ...state,
        managedEvents: {
          ...state.managedEvents,
          noSkyBoxEvents: action.payload
        }
      }
    case actions.CLOSE_MODAL_NO_SKYBOX_EVENTS:
      return {
        ...state,
        managedEvents: { ...state.managedEvents, noSkyBoxEvents: [] }
      }
    case actions.SAVE_SEARCH_EVENT_FILTERS_CHANGE:
      const newFilters = { ...state.searchEvents.filters, ...action.payload }
      return {
        ...state,
        searchEvents: {
          ...state.searchEvents,
          filters: newFilters,
          filterEvents: filterEventsByKeywords(
            newFilters,
            state.searchEvents.events
          ),
          tMasterVenueId: ""
        }
      }
    case actions.ADD_SEARCH_FILTER:
      return {
        ...state,
        searchEvents: {
          ...state.searchEvents,
          filters: {
            ...state.searchEvents.filters,
            ...action.payload
          }
        }
      }
    case actions.SET_SKYBOX_VENUE_ID:
      return {
        ...state,
        searchEvents: {
          ...state.searchEvents,
          skyBoxVenueId: action.payload
        }
      }
    case actions.SET_TMASTER_VENUE_ID:
      return {
        ...state,
        searchEvents: {
          ...state.searchEvents,
          tMasterVenueId: action.payload
        }
      }
    case actions.FETCH_MANAGED_EVENTS_QUEUE_SUCCESS:
      return {
        ...state,
        managedEventsQueue: action.payload
      }
    case actions.ADD_MANAGED_EVENT_FROM_QUEUE_SUCCESS:
      return {
        ...state,
        managedEventsQueue: deleteItemFromStateById(state.managedEventsQueue)(
          action.payload
        )
      }
    case actions.FETCH_EVENT_DETAILS_LOG_SUCCESS:
      return {
        ...state,
        eventDetailsLog: action.payload
      }
    case actions.FETCH_RE_PRICE_EVENT_LOG_SUCCESS:
      return {
        ...state,
        rePriceEventLog: action.payload
      }
    case actions.FETCH_PRICE_POINT_SUCCESS:
      return {
        ...state,
        pricePoint: action.payload
      }
    case actions.FETCH_SECONDARY_MARKET_LOGS_SUCCESS:
      return {
        ...state,
        secondaryMarketList: action.payload
      }
    case actions.FETCH_BLACKLIST_PRICE_SECTION_SUCCESS:
      return {
        ...state,
        blackListedData: action.payload
      }
    case actions.FETCH_AVAILABLE_OFFER_SUCCESS:
      return {
        ...state,
        availableOffers: action.payload
      }
    default:
      return state
  }
}

export default events
export const getBlacListInfo = state => state.blackListedData
export const getSearchEvents = state => state.searchEvents["events"]
export const getSkyBoxVenueId = state => state.searchEvents["skyBoxVenueId"]
export const getTMasterVenueId = state => state.searchEvents["tMasterVenueId"]
export const getSearchEventsTotalNum = state =>
  state.searchEvents["totalEventsNum"]
export const getSearchEventsFilters = state => state.searchEvents["filters"]
export const getSearchEventsByFilters = state =>
  state.searchEvents["filterEvents"]

export const getManagedEvents = state => state.managedEvents["events"]
export const getManagedEventById = state => state.managedEvents["events"]
export const getManagedSkyBoxEventsDup = state =>
  state.managedEvents["skyBoxEventsDup"]
export const getNoSkyboxEvents = state => state.managedEvents["noSkyBoxEvents"]

export const getManagedEventsQueue = state => state.managedEventsQueue["dict"]

export const getEventDetailsLog = state => state.eventDetailsLog

export const getRePriceEventLog = state => state.rePriceEventLog

export const getPricePointList = state => state.pricePoint

export const getSecondaryMargetList = state => state.secondaryMarketList
export const getAvailableOffers = state => state.availableOffers
