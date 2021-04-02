import { connect } from "react-redux"
import TimeDetail from "./TimeDetails"
import { getClockTimer, getIsFetching, getUserInfo } from "../../reducers"
import { appReceiveAlert } from "../../actions/app"
import {
  fetchClockTimerRequest,
  updateAdminClockTimerRequest,
  createTimerRequest,
  deleteUserRequest
} from "../../actions/clockTime"

const TimeDetailContainer = connect(
  state => ({
    clockTimerList: getClockTimer(state),
    isFetching: getIsFetching(state),
    userInfo: getUserInfo(state)
  }),
  {
    fetchClockTimerRequest,
    updateAdminClockTimerRequest,
    createTimerRequest,
    deleteUserRequest,
    appReceiveAlert
  }
)(TimeDetail)

export default TimeDetailContainer
