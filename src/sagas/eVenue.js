import { call, put, takeEvery, take } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/eVenue"
import * as userActions from "../actions/users"
import * as api from "../api/eVenue"

//E-venue
function* createEVenueSaga(action) {
  const eVenue = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.createEVenue, [eVenue])

    success
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating E-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating E-Venue!"
          })
        )
    const { data } = yield call(api.fetchEVenue)
    yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error))
    } else if (error.response.status === 401) {
      error.message = error.response.data.message
      yield put(appActions.appReceiveError(error))
      const { data } = yield call(api.fetchEVenue)
      yield put(actions.fetchEVeuneSuccess(data))
    } else {
      yield put(appActions.appReceiveError(error))
    }
  } finally {
  }
}

function* fetchEVenueSaga(action) {
  const { searchStartDate, searchEndDate, emailExists } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.fetchEVenue,
      searchStartDate,
      searchEndDate,
      emailExists
    )
    yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

// function* fetchEVenuePagingSaga(action) {
//   const venueRequest = action.payload
//   try {
//     yield put(appActions.appStartFetching())

//     const { data } = yield call(api.fetchEVenueByPaging, venueRequest)
//     yield put(
//       actions.fetchEVeunePagingSuccess({
//         totalRow: data.total_rows,
//         venueInfo: data.rows,
//         page: data.page
//       })
//     )
//   } catch (error) {
//     if (error.response.status === 403)
//       yield put(userActions.userAuthorizationFailure(error))
//     else yield put(appActions.appReceiveError(error))
//   } finally {
//     yield put(appActions.appStopFetching())
//   }
// }

function* deleteEVenueSaga(action) {
  const { venueId } = action.payload
  try {
    const {
      data: { ok }
    } = yield call(api.deleteEVenue, venueId)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting E-Venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting E-Venue!"
          })
        )
    const { data } = yield call(api.fetchEVenue)
    yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* updateEVenueBlacklistSaga(action) {
  const { venueId, is_blackList } = action.payload

  try {
    const { data: hasSucceed } = yield call(
      api.updateBlacklistEvenue,
      is_blackList,
      venueId
    )
    // yield put(eventStatisticsActions.fetchEventMonitorRequest())
    hasSucceed
      ? yield put(
          appActions.appReceiveAlert({
            message: "Evenue Successfully Updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updation of evenue! "
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else if (error.response.status === 401) {
      error.message = error.response.data.message
      yield put(appActions.appReceiveError(error))
    } else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* updateEVenueSaga(action) {
  const newVenue = action.payload
  newVenue.venueId = newVenue.url.split(".")[1]

  try {
    const {
      data: { ok }
    } = yield call(api.updateEVenue, newVenue, newVenue.venueId)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating E-venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating E-venue!"
          })
        )
    const { data } = yield call(api.fetchEVenue)
    yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* watchVenuesSaga() {
  yield takeEvery(actions.createEVenueRequest, createEVenueSaga)

  yield takeEvery(actions.fetchEVenueRequest, fetchEVenueSaga)

  yield takeEvery(actions.deleteEVenueRequest, deleteEVenueSaga)

  yield takeEvery(actions.updateEVenueRequest, updateEVenueSaga)
  yield takeEvery(
    actions.updateIsBlackListEvenueRequest,
    updateEVenueBlacklistSaga
  )
}

export default watchVenuesSaga
