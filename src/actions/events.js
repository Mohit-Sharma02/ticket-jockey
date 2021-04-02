import { createAction } from "redux-actions"

//fetch event info
export const FETCH_EVENT_INFO_BY_EVENTID_REQUEST =
  "FETCH_EVENT_INFO_BY_EVENTID_REQUEST"
export const CANCEL_FETCH_EVENT_INFO_BY_EVENTID_REQUEST =
  "CANCEL_FETCH_EVENT_INFO_BY_EVENTID_REQUEST"
export const fetchEventInfoByEventIdRequest = createAction(
  FETCH_EVENT_INFO_BY_EVENTID_REQUEST
)
export const cancelFetchEventInfoByEventIdRequest = createAction(
  CANCEL_FETCH_EVENT_INFO_BY_EVENTID_REQUEST
)

//search events by keyword
export const FETCH_EVENTS_BY_KEYWORD_REQUEST = "FETCH_EVENTS_BY_KEYWORD_REQUEST"
export const FETCH_EVENTS_BY_KEYWORD_FAILURE = "FETCH_EVENTS_BY_KEYWORD_FAILURE"
export const FETCH_EVENTS_BY_KEYWORD_SUCCESS = "FETCH_EVENTS_BY_KEYWORD_SUCCESS"
export const FFETCH_EVENTS_BY_KEYWORD_CLEAR = "FFETCH_EVENTS_BY_KEYWORD_CLEAR"

export const fetchEventsByKeywordRequest = createAction(
  FETCH_EVENTS_BY_KEYWORD_REQUEST
)
export const fetchEventsByKeywordFailure = createAction(
  FETCH_EVENTS_BY_KEYWORD_FAILURE
)
export const fetchEventsByKeywordSuccess = createAction(
  FETCH_EVENTS_BY_KEYWORD_SUCCESS
)
export const fetchEventsByKeywordClear = createAction(
  FFETCH_EVENTS_BY_KEYWORD_CLEAR
)

export const CLEAR_SEARCH_EVENTS = "CLEAR_SEARCH_EVENTS"
export const clearSearchEvents = createAction(CLEAR_SEARCH_EVENTS)

//Filter search
export const SAVE_SEARCH_EVENT_FILTERS_CHANGE =
  "SAVE_SEARCH_EVENT_FILTERS_CHANGE"
export const saveFiltersChange = createAction(SAVE_SEARCH_EVENT_FILTERS_CHANGE)

export const ADD_SEARCH_FILTER = "ADD_SEARCH_FILTER"
export const addSearchFilter = createAction(ADD_SEARCH_FILTER)

//Skybox event search
export const SEARCH_SKYBOX_EVENTS = "SEARCH_SKYBOX_EVENTS"
export const SHOW_MODAL_SKYBOX_EVENTS = "SHOW_MODAL_SKYBOX_EVENTS"
export const SELECT_MODAL_SKYBOX_EVENTS = "SELECT_MODAL_SKYBOX_EVENTS"
export const SHOW_MODAL_NO_SKYBOX_EVENTS = "SHOW_MODAL_NO_SKYBOX_EVENTS"
export const CLOSE_MODAL_NO_SKYBOX_EVENTS = "CLOSE_MODAL_NO_SKYBOX_EVENTS"

export const SEARCH_SKYBOX_VENUE_ID_REQUEST = "SEARCH_SKYBOX_VENUE_ID_REQUEST"
export const SET_SKYBOX_VENUE_ID = "SET_SKYBOX_VENUE_ID"
export const SET_TMASTER_VENUE_ID = "SET_TMASTER_VENUE_ID"

export const searchSkyBoxEvents = createAction(SEARCH_SKYBOX_EVENTS)

export const setSkyBoxVenueId = createAction(SET_SKYBOX_VENUE_ID)

export const setTMasterVenueId = createAction(SET_TMASTER_VENUE_ID)

export const showModalSkyBoxEvents = createAction(SHOW_MODAL_SKYBOX_EVENTS)

export const selectModalSkyboxEvents = createAction(SELECT_MODAL_SKYBOX_EVENTS)

export const searchSkyboxVenueIdRequest = createAction(
  SEARCH_SKYBOX_VENUE_ID_REQUEST
)

export const showModalSkyBoxEventsNotFounded = createAction(
  SHOW_MODAL_NO_SKYBOX_EVENTS
)

export const closeModalSkyBoxEventsNotFounded = createAction(
  CLOSE_MODAL_NO_SKYBOX_EVENTS
)

//managed events
export const CREATE_MANAGED_EVENTS_REQUEST = "CREATE_MANAGED_EVENTS_REQUEST"
export const CREATE_MANAGED_EVENTS_SUCCESS = "CREATE_MANAGED_EVENTS_SUCCESS"
export const CREATE_MANAGED_EVENTS_FAILURE = "CREATE_MANAGED_EVENTS_FAILURE"

export const createManagedEventsRequest = createAction(
  CREATE_MANAGED_EVENTS_REQUEST
)
export const createManagedEventsSuccess = createAction(
  CREATE_MANAGED_EVENTS_SUCCESS
)
export const createManagedEventsFailure = createAction(
  CREATE_MANAGED_EVENTS_FAILURE
)

export const FETCH_MANAGED_EVENTS_REQUEST = "FETCH_MANAGED_EVENTS_REQUEST"
export const FETCH_MANAGED_EVENTS_SUCCESS = "FETCH_MANAGED_EVENTS_SUCCESS"
export const FETCH_MANAGED_EVENTS_FAILURE = "FETCH_MANAGED_EVENTS_FAILURE"

export const fetchManagedEventsRequest = createAction(
  FETCH_MANAGED_EVENTS_REQUEST
)
export const fetchManagedEventsSuccess = createAction(
  FETCH_MANAGED_EVENTS_SUCCESS
)
export const fetchManagedEventsFailure = createAction(
  FETCH_MANAGED_EVENTS_FAILURE
)

export const FETCH_MANAGED_EVENTS_BY_KEYWORD_REQUEST =
  "FETCH_MANAGED_EVENTS_BY_KEYWORD_REQUEST"

export const fetchManagedEventsByKeywordRequest = createAction(
  FETCH_MANAGED_EVENTS_BY_KEYWORD_REQUEST
)

export const FETCH_MANAGED_EVENTS_BY_FILTER_REQUEST =
  "FETCH_MANAGED_EVENTS_BY_FILTER_REQUEST"

export const fetchManagedEventsFilterRequest = createAction(
  FETCH_MANAGED_EVENTS_BY_FILTER_REQUEST
)

export const FETCH_MANAGED_EVENTS_FILTER_SUCCESS =
  "FETCH_MANAGED_EVENTS_FILTER_SUCCESS"

export const fetchManagedEventsFilterSuccess = createAction(
  FETCH_MANAGED_EVENTS_FILTER_SUCCESS
)

export const FETCH_MANAGED_EVENTS_SEARCH_REQUEST =
  "FETCH_MANAGED_EVENTS_SEARCH_REQUEST"

export const fetchManagedEventsSearchRequest = createAction(
  FETCH_MANAGED_EVENTS_SEARCH_REQUEST
)

export const CLEAR_MANAGED_EVENTS = "CLEAR_MANAGED_EVENTS"

export const clearManagedEvents = createAction(CLEAR_MANAGED_EVENTS)

export const DELETE_MANAGED_EVENTS_REQUEST = "DELETE_MANAGED_EVENTS_REQUEST"
export const DELETE_MANAGED_EVENTS_SUCCESS = "DELETE_MANAGED_EVENTS_SUCCESS"
export const DELETE_MANAGED_EVENTS_FAILURE = "DELETE_MANAGED_EVENTS_FAILURE"

export const deleteManagedEventsRequest = createAction(
  DELETE_MANAGED_EVENTS_REQUEST
)
export const deleteManagedEventsSuccess = createAction(
  DELETE_MANAGED_EVENTS_SUCCESS
)
export const deleteManagedEventsFailure = createAction(
  DELETE_MANAGED_EVENTS_FAILURE
)

export const UPDATE_MANAGED_EVENTS_REQUEST = "UPDATE_MANAGED_EVENTS_REQUEST"
export const UPDATE_MANAGED_EVENTS_SUCCESS = "UPDATE_MANAGED_EVENTS_SUCCESS"

export const updateManagedEventsRequest = createAction(
  UPDATE_MANAGED_EVENTS_REQUEST
)
export const updateManagedEventsSuccess = createAction(
  UPDATE_MANAGED_EVENTS_SUCCESS
)

export const USER_OVERRIDE_AVAI_REQUEST = "USER_OVERRIDE_AVAI_REQUEST"
export const userOverrideAvaiRequest = createAction(USER_OVERRIDE_AVAI_REQUEST)

//managed events queue
export const FETCH_MANAGED_EVENTS_QUEUE_REQUEST =
  "FETCH_MANAGED_EVENTS_QUEUE_REQUEST"
export const fetchManagedEventsQueueRequest = createAction(
  FETCH_MANAGED_EVENTS_QUEUE_REQUEST
)
export const FETCH_MANAGED_EVENTS_QUEUE_SUCCESS =
  "FETCH_MANAGED_EVENTS_QUEUE_SUCCESS"
export const fetchManagedEventsQueueSuccess = createAction(
  FETCH_MANAGED_EVENTS_QUEUE_SUCCESS
)
export const FETCH_MANAGED_EVENTS_QUEUE_FAIL = "FETCH_MANAGED_EVENTS_QUEUE_FAIL"
export const fetchManagedEventsQueueFail = createAction(
  FETCH_MANAGED_EVENTS_QUEUE_FAIL
)

export const DELETE_MANAGED_EVENTS_QUEUE_REQUEST =
  "DELETE_MANAGED_EVENTS_QUEUE_REQUEST"
export const deleteManagedEventsQueueRequest = createAction(
  DELETE_MANAGED_EVENTS_QUEUE_REQUEST
)
export const DELETE_MANAGED_EVENTS_QUEUE_SUCCESS =
  "DELETE_MANAGED_EVENTS_QUEUE_SUCCESS"
export const deleteManagedEventsQueueSuccess = createAction(
  DELETE_MANAGED_EVENTS_QUEUE_SUCCESS
)
export const DELETE_MANAGED_EVENTS_QUEUE_FAIL =
  "DELETE_MANAGED_EVENTS_QUEUE_FAIL"
export const delteManagedEventsQueueFail = createAction(
  DELETE_MANAGED_EVENTS_QUEUE_FAIL
)

export const ADD_MANAGED_EVENT_FROM_QUEUE_REQUEST =
  "ADD_MANAGED_EVENT_FROM_QUEUE_REQUEST"
export const addManagedEventFromQueueRequest = createAction(
  ADD_MANAGED_EVENT_FROM_QUEUE_REQUEST
)
export const ADD_MANAGED_EVENT_FROM_QUEUE_SUCCESS =
  "ADD_MANAGED_EVENT_FROM_QUEUE_SUCCESS"
export const addManagedEventFromQueueSuccess = createAction(
  ADD_MANAGED_EVENT_FROM_QUEUE_SUCCESS
)

//Event Details Listing applied by rules of engine
export const FETCH_EVENT_DETAILS_LOG_REQUEST =
  " FETCH_EVENT_DETAILS_LOG_REQUEST"
export const FETCH_EVENT_DETAILS_LOG_SUCCESS =
  " FETCH_EVENT_DETAILS_LOG_SUCCESS"
export const FETCH_EVENT_DETAILS_LOG_FAILURE =
  " FETCH_EVENT_DETAILS_LOG_FAILURE"
export const fetchEventDetailsLogRequest = createAction(
  FETCH_EVENT_DETAILS_LOG_REQUEST
)
export const fetchEventDetailsLogSuccess = createAction(
  FETCH_EVENT_DETAILS_LOG_SUCCESS
)
export const fetchEventDetailsLogFailure = createAction(
  FETCH_EVENT_DETAILS_LOG_FAILURE
)

//Re Price Event Log applied by rules of engine
export const FETCH_RE_PRICE_EVENT_LOG_REQUEST =
  "FETCH_RE_PRICE_EVENT_LOG_REQUEST"
export const FETCH_RE_PRICE_EVENT_LOG_SUCCESS =
  "FETCH_RE_PRICE_EVENT_LOG_SUCCESS"
export const FETCH_RE_PRICE_EVENT_LOG_FAILURE =
  " FETCH_RE_PRICE_EVENT_LOG_FAILURE"
export const fetchRePriceEventLogRequest = createAction(
  FETCH_RE_PRICE_EVENT_LOG_REQUEST
)
export const fetchRePriceEventLogSuccess = createAction(
  FETCH_RE_PRICE_EVENT_LOG_SUCCESS
)
export const fetchRePriceEventLogFailure = createAction(
  FETCH_RE_PRICE_EVENT_LOG_FAILURE
)

// For PricePoint

export const FETCH_PRICE_POINT_REQUEST = "FETCH_PRICE_POINT_REQUEST"
export const fetchPricePointRequest = createAction(FETCH_PRICE_POINT_REQUEST)

export const FETCH_PRICE_POINT_SUCCESS = "FETCH_PRICE_POINT_SUCCESS"
export const fetchPricePointSuccess = createAction(FETCH_PRICE_POINT_SUCCESS)

// For Secondary Market log

export const FETCH_SECONDARY_MARKET_LOGS_REQUEST =
  "FETCH_SECONDARY_MARKET_LOGS_REQUEST"
export const fetchSecodaryLogsRequest = createAction(
  FETCH_SECONDARY_MARKET_LOGS_REQUEST
)

export const FETCH_SECONDARY_MARKET_LOGS_SUCCESS =
  "FETCH_SECONDARY_MARKET_LOGS_SUCCESS"
export const fetchSecodaryLogsSuccess = createAction(
  FETCH_SECONDARY_MARKET_LOGS_SUCCESS
)

// For PriceMarkupPct
export const UPDATE_PRICE_MARKUP_PCT_REQUEST = "UPDATE_PRICE_MARKUP_PCT_REQUEST"
export const updatePriceMarkUpPctRequest = createAction(
  UPDATE_PRICE_MARKUP_PCT_REQUEST
)

// For getEventByEventId
export const FETCH_EVENT_BY_EVENTID_REQUEST = "FETCH_EVENT_BY_EVENTID_REQUEST"
export const fetchEventByEventIdRequest = createAction(
  FETCH_EVENT_BY_EVENTID_REQUEST
)

export const FETCH_EVENT_BY_EVENTID_SUCCESS = "FETCH_EVENT_BY_EVENTID_SUCCESS"
export const fetchEventByEventIdSuccess = createAction(
  FETCH_EVENT_BY_EVENTID_SUCCESS
)

//is_blackList
export const IS_BLACKLIST_REQUEST = "IS_BLACKLIST_REQUEST"
export const updateIsBlackListRequest = createAction(IS_BLACKLIST_REQUEST)

export const FETCH_BLACKLIST_PRICE_SECTION_REQUEST =
  "FETCH_BLACKLIST_PRICE_SECTION_REQUEST"

export const FetchBlackListPriceSectionRequest = createAction(
  FETCH_BLACKLIST_PRICE_SECTION_REQUEST
)

export const FETCH_BLACKLIST_PRICE_SECTION_SUCCESS =
  "FETCH_BLACKLIST_PRICE_SECTION_SUCCESS"
export const fetchBlackListPriceSectionSuccess = createAction(
  FETCH_BLACKLIST_PRICE_SECTION_SUCCESS
)

export const ADD_BLACKLIST_PRICE_SECTION_REQUEST =
  "ADD_BLACKLIST_PRICE_SECTION_REQUEST"

export const addBlackListPriceSectionRequest = createAction(
  ADD_BLACKLIST_PRICE_SECTION_REQUEST
)

//is_monitor
export const IS_MONITOR_REQUEST = "IS_MONITOR_REQUEST"
export const updateIsMonitorRequest = createAction(IS_MONITOR_REQUEST)

//Available Offer

export const FETCH_AVAILABLE_OFFER_REQUEST = "FETCH_AVAILABLE_OFFER_REQUEST"
export const fetchAvailableOfferRequest = createAction(
  FETCH_AVAILABLE_OFFER_REQUEST
)
export const FETCH_AVAILABLE_OFFER_SUCCESS = "FETCH_AVAILABLE_OFFER_SUCCESS"
export const fetchAvailableOfferSuccess = createAction(
  FETCH_AVAILABLE_OFFER_SUCCESS
)
