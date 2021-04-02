import { connect } from "react-redux"

import {
  fetchEmailManagementRequest,
  deleteEmailManagementRequest,
  updateEmailManagementRequest,
  createEmailManagementRequest
} from "../../actions/emailManagement"

import { updatePriceMarkUpPctForVenueRequest } from "../../actions/venues"

import { resetEmailPasswordRequest } from "../../actions/listings"
import {
  getEmailManagement,
  getIsFetching,
  getErrorMsg,
  getIsResetPasswordFetching,
  getSelectedEVenue
} from "../../reducers"

import { appReceiveAlert } from "../../actions/app"

import EVenueDetail from "./EVenueDetail"

const EVenueDetailContainer = connect(
  state => ({
    emailManagements: getEmailManagement(state),
    isFetching: getIsFetching(state),
    errorMsg: getErrorMsg(state),
    isResetPasswordFetching: getIsResetPasswordFetching(state),
    selectedEvenue: getSelectedEVenue(state)
  }),
  {
    fetchEmailManagementRequest,
    deleteEmailManagementRequest,
    updateEmailManagementRequest,
    createEmailManagementRequest,
    resetEmailPasswordRequest,
    updatePriceMarkUpPctForVenueRequest,
    appReceiveAlert
  }
)(EVenueDetail)

export default EVenueDetailContainer
