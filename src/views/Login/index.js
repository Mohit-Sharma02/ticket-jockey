import { connect } from "react-redux"

import { getHasLoggedIn, getIsFetching, getErrorMsg } from "../../reducers"
import { userAuthorizationRequest } from "../../actions/users"
import Login from "./Login"
import { appReceiveAlert } from "../../actions/app"

const mapStateToProps = state => ({
  hasLoggedIn: getHasLoggedIn(state),
  isFetching: getIsFetching(state),
  errorMsg: getErrorMsg(state)
})

const mapDispatchToProps = dispatch => ({
  userAuthorizationRequest: user => dispatch(userAuthorizationRequest(user)),
  appReceiveAlert
})

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)

export default LoginContainer
