import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/eventStatistic"
import * as userActions from "../actions/users"
import * as api from "../api/eventStatistic"
import { dateFormatterWithTZ, dateFormatter } from "../utils"

const formatEventMonitorData = events => {
  var updatedEvents = events.eventsAdded.filter(
    event =>
      event.onSaleDate == undefined ||
      (event.onSaleDate && new Date() > new Date(event.onSaleDate))
  )

  return { eventsAdded: updatedEvents }
}

function* fetchEventStatisticSaga(action) {
  const { startDate, endDate } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEventStatistic, startDate, endDate)
    yield put(actions.fetchEventStatisticSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchEventMonitorSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEventMonitor, action.payload)
    yield put(actions.fetchEventMonitorSuccess(formatEventMonitorData(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchEventStatisticSaga() {
  // for Event Statistic
  yield takeLatest(
    actions.FETCH_EVENT_STATISTIC_REQUEST,
    fetchEventStatisticSaga
  )
  yield takeLatest(actions.FETCH_EVENT_MONITOR_REQUEST, fetchEventMonitorSaga)
}

export default watchEventStatisticSaga
