import { connect } from "react-redux"

import Toastr from "./Toastr"
import { getAlertMsg } from "../../reducers"
import { appClearAlert } from "../../actions/app"

const ToastrModalContainer = connect(
  state => ({
    alertMsg: getAlertMsg(state)
  }),
  {
    appClearAlert
  }
)(Toastr)

export default ToastrModalContainer
