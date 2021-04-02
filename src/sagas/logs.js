import { takeLatest, takeEvery, call, put } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/logs"
import * as userActions from "../actions/users"
import * as api from "../api/logs"

function* fetchEventsLogSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEventsLog, action.payload)
    yield put(actions.fetchEventsLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchLogDetailsSaga(action) {
  const { instanceId, eventId } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchLogDetails, instanceId, eventId)

    yield put(actions.fetchEventsLogDetailsSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchMediumTermLogSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchMediumTermLog)

    yield put(actions.fetchMediumTermEventsLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchLongTermLogSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchLongTermLog, action.payload)
    yield put(actions.fetchLongTermEventsLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchViewLogSaga(action) {
  const { type, date, time } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchViewLog, type, date, time)

    yield put(actions.fetchViewLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchDownLoadLogSaga(action) {
  const { type, date, time, instanceId } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.downloadInstanceDetailsLog,
      type,
      date,
      time,
      instanceId
    )

    yield put(actions.fetchInstanceLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchFailedEventLogSaga(action) {
  const { type, date, time, instanceTimestamp, instanceId } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.getFailedEventDetailsLog,
      type,
      date,
      time,
      instanceTimestamp,
      instanceId
    )

    yield put(actions.fetchFailedEventLogSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchEventsLogInfoSaga(action) {
  const { startDate, endDate } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEventsLogInfo, startDate, endDate)
    yield put(actions.fetchEventsLogInfoSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchLogsSaga() {
  yield takeEvery(actions.fetchEventsLogRequest, fetchEventsLogSaga)
  yield takeEvery(actions.fetchEventsLogDetailsRequest, fetchLogDetailsSaga)
  yield takeEvery(
    actions.fetchMediumTermEventsLogRequest,
    fetchMediumTermLogSaga
  )
  yield takeEvery(actions.fetchLongTermEventsLogRequest, fetchLongTermLogSaga)
  yield takeEvery(actions.fetchViewLogRequest, fetchViewLogSaga)
  yield takeEvery(actions.fetchInstanceLogRequest, fetchDownLoadLogSaga)
  yield takeEvery(actions.fetchFailedEventLogRequest, fetchFailedEventLogSaga)
  yield takeLatest(actions.fetchEventsLogInfoRequest, fetchEventsLogInfoSaga)
}

export default watchLogsSaga
