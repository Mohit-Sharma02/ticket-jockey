import { connect } from "react-redux"

import Search from "./Search"
import {
  getSearchEventsByFilters,
  getSearchEventsTotalNum,
  getIsFetching,
  getSearchEventsFilters,
  getManagedSkyBoxEventsDup,
  getSkyBoxVenueId,
  getTMasterVenueId,
  getNoSkyboxEvents
} from "../../reducers"
import {
  fetchEventsByKeywordRequest,
  fetchEventsByKeywordClear,
  createManagedEventsRequest,
  addSearchFilter,
  selectModalSkyboxEvents,
  saveFiltersChange,
  searchSkyboxVenueIdRequest,
  setSkyBoxVenueId,
  setTMasterVenueId,
  clearSearchEvents,
  closeModalSkyBoxEventsNotFounded
} from "../../actions/events"
import { createManagedVenueRequest } from "../../actions/venues"
import { saveSelectEvent, clearSelectEvent } from "../../actions/tickets"
import { appReceiveAlert } from "../../actions/app"

const SearchContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    events: getSearchEventsByFilters(state),
    skyBoxVenueId: getSkyBoxVenueId(state),
    tMasterVenueId: getTMasterVenueId(state),
    totalEventsNum: getSearchEventsTotalNum(state),
    searchEventFilters: getSearchEventsFilters(state),
    skyBoxEventsDup: getManagedSkyBoxEventsDup(state),
    noSkyboxEvents: getNoSkyboxEvents(state)
  }),
  {
    saveSelectEvent,
    clearSelectEvent,
    saveFiltersChange,
    createManagedEventsRequest,
    createManagedVenueRequest,
    addSearchFilter,
    selectModalSkyboxEvents,
    fetchEventsByKeywordRequest,
    fetchEventsByKeywordClear,
    appReceiveAlert,
    searchSkyboxVenueIdRequest,
    setSkyBoxVenueId,
    setTMasterVenueId,
    clearSearchEvents,
    closeModalSkyBoxEventsNotFounded
  }
)(Search)

export default SearchContainer
