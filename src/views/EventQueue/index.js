import { connect } from "react-redux"

import {
  updateIsBlackListRequest,
  FetchBlackListPriceSectionRequest,
  updateIsMonitorRequest,
  addBlackListPriceSectionRequest
} from "../../actions/events"

import {
  getIsFetching,
  getIsBlackListFetching,
  getIsAddBlackListFetching,
  getEventMonitor,
  getBlacListInfo
} from "../../reducers"

import { fetchEventMonitorRequest } from "../../actions/eventStatistic"

import EventQueue from "./EventQueue"

const EventQueueContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    isBlackListingFetching: getIsBlackListFetching(state),
    eventMonitor: getEventMonitor(state),
    blackListInfo: getBlacListInfo(state),
    isAddBlackListFetching: getIsAddBlackListFetching(state)
  }),
  {
    updateIsBlackListRequest,
    FetchBlackListPriceSectionRequest,
    updateIsMonitorRequest,
    addBlackListPriceSectionRequest,
    fetchEventMonitorRequest
  }
)(EventQueue)

export default EventQueueContainer
