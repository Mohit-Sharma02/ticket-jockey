import { call, put, takeEvery, take } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/emailManagement"
import * as userActions from "../actions/users"
import * as api from "../api/emailManagement"

//Email-Management
function* createEmailManagementSaga(action) {
  const emailManagement = action.payload.newRow
  const venueId = action.payload.venueId

  try {
    yield call(api.createEmailManagement, emailManagement, venueId)
    yield put(
      appActions.appReceiveAlert({
        message: "Succeed creating Email Management!"
      })
    )

    if (venueId) {
      const { data } = yield call(api.fetchEmailManagement, venueId)
      yield put(actions.fetchEmailManagementSuccess(data))
    } else {
      const { data } = yield call(api.fetchEmailManagement)
      yield put(actions.fetchEmailManagementSuccess(data))
    }
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error))
    } else if (error.response.status === 401) {
      error.message = error.response.data.message
      yield put(appActions.appReceiveError(error))
      const { data } = yield call(api.fetchEmailManagement)
      yield put(actions.fetchEmailManagementSuccess(data))
    } else {
      yield put(appActions.appReceiveError(error))
    }
  } finally {
  }
}

const formatedData = emails => {
  return Object.keys(emails).map(key => ({
    email: key,
    password: emails[key].password,
    name: emails[key].name,
    address: emails[key].address,
    phoneNumber: emails[key].phoneNumber,
    updatedDate: emails[key].updatedDate,
    capOne: emails[key].capOne,
    amex: emails[key].amex,
    comdata: emails[key].comdata,
    citi1: emails[key].citi1,
    citi2: emails[key].citi2,
    lastUpdatedPassword:
      emails[key].lastUpdatedPassword === ""
        ? ""
        : emails[key].lastUpdatedPassword,
    lastUpdatedDate:
      emails[key].lastUpdatedDate === "" ? "" : emails[key].lastUpdatedDate,
    isActive: emails[key].isActive,
    oneTicketStatus:
      emails[key].oneTicketStatus !== undefined
        ? emails[key].oneTicketStatus
        : "",
    error_description:
      emails[key].error_description !== undefined
        ? emails[key].error_description
        : ""
    // SeatScoutsStatus:
    //   emails[key].SeatScoutsStatus !== undefined
    //     ? emails[key].SeatScoutsStatus
    //     : ""
  }))
}

function* fetchEmailManagementSaga(action) {
  var venueId = ""
  if (action.payload) {
    venueId = action.payload.venueId
  }
  console.log("venueId", venueId)
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEmailManagement, venueId)
    console.log("data", data)
    yield put(actions.fetchEmailManagementSuccess(formatedData(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* deleteEmailManagementSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const { data: ok } = yield call(
      api.deleteEmailManagement,
      action.payload.dropRowKeys,
      action.payload.venueId
    )
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting Email Management!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting Email Management!"
          })
        )
    if (action.payload.venueId) {
      const { data } = yield call(
        api.fetchEmailManagement,
        action.payload.venueId
      )
      yield put(actions.fetchEmailManagementSuccess(formatedData(data)))
    } else {
      const { data } = yield call(api.fetchEmailManagement)
      yield put(actions.fetchEmailManagementSuccess(formatedData(data)))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* updateEmailManagementSaga(action) {
  try {
    const { data: ok } = yield call(
      api.updateEmailManagement,
      action.payload.updatedRow,
      action.payload.venueId
    )
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Email Management!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Email Management!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* watchEmailManagementSaga() {
  yield takeEvery(
    actions.createEmailManagementRequest,
    createEmailManagementSaga
  )

  yield takeEvery(actions.fetchEmailManagementRequest, fetchEmailManagementSaga)

  yield takeEvery(
    actions.deleteEmailManagementRequest,
    deleteEmailManagementSaga
  )

  yield takeEvery(
    actions.updateEmailManagementRequest,
    updateEmailManagementSaga
  )
}

export default watchEmailManagementSaga
