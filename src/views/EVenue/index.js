import { connect } from "react-redux"

import EVenue from "./EVenue"
import {
  fetchEVenueRequest,
  deleteEVenueRequest,
  updateEVenueRequest,
  createEVenueRequest,
  updateIsBlackListEvenueRequest,
  setSelectedVenue
} from "../../actions/eVenue"
import { getEVenues, getIsFetching, getErrorMsg } from "../../reducers"
import { appReceiveAlert } from "../../actions/app"

const EVenueContainer = connect(
  state => ({
    eVenues: getEVenues(state),
    isFetching: getIsFetching(state),
    errorMsg: getErrorMsg(state)
  }),
  {
    fetchEVenueRequest,
    deleteEVenueRequest,
    updateEVenueRequest,
    createEVenueRequest,
    updateIsBlackListEvenueRequest,
    appReceiveAlert,
    setSelectedVenue
  }
)(EVenue)

export default EVenueContainer
