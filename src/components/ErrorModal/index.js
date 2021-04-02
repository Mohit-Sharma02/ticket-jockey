import { connect } from "react-redux"

import ErrorModal from "./ErrorModal"
import { getErrorMsg } from "../../reducers"
import { appClearError } from "../../actions/app"

const mapStateToProps = state => ({
  errorMsg: getErrorMsg(state)
})

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(appClearError())
})

const ErrorModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal)

export default ErrorModalContainer
