import { connect } from "react-redux"
import EmailManageMent from "./EmailManagement"

import {
  fetchEmailManagementRequest,
  deleteEmailManagementRequest,
  updateEmailManagementRequest,
  createEmailManagementRequest
} from "../../actions/emailManagement"
import { resetEmailPasswordRequest } from "../../actions/listings"
import {
  getEmailManagement,
  getIsFetching,
  getErrorMsg,
  getIsResetPasswordFetching
} from "../../reducers"
import { appReceiveAlert } from "../../actions/app"

const EmailManagementContainer = connect(
  state => ({
    emailManagements: getEmailManagement(state),
    isFetching: getIsFetching(state),
    errorMsg: getErrorMsg(state),
    isResetPasswordFetching: getIsResetPasswordFetching(state)
  }),
  {
    fetchEmailManagementRequest,
    deleteEmailManagementRequest,
    updateEmailManagementRequest,
    createEmailManagementRequest,
    resetEmailPasswordRequest,
    appReceiveAlert
  }
)(EmailManageMent)

export default EmailManagementContainer
