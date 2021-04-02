import { takeEvery, call, put } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/globalConfig"
import * as userActions from "../actions/users"
import * as api from "../api/globalConfig"

const formatedData = globals => {
  return Object.keys(globals).map(key => ({
    keyName: key,
    value: globals[key]
  }))
}

function* fetchGlobalConfigsSaga() {
  try {
    const { data } = yield call(api.fetchGlobals)

    yield put(actions.fetchGlobalConfigSuccess(formatedData(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* deleteGlobalConfigsSaga(action) {
  try {
    const { data: ok } = yield call(api.deleteGlobalConfigs, action.payload)
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting a global configration!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message:
              "Something went wrong with deleting a global configration! "
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* updateGlobalConfigsSaga(action) {
  let globalKey = action.payload
  try {
    const { data: ok } = yield call(api.updateGlobalConfig, globalKey)
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a global configration!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message:
              "Something went wrong with updating a global configration! "
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* addGlobalConfigsSaga(action) {
  try {
    yield call(api.addGlobalConfigs, action.payload)
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* watchGlobalConfigSaga() {
  yield takeEvery(actions.fetchGlobalConfigRequest, fetchGlobalConfigsSaga)
  yield takeEvery(actions.deleteGlobalConfigRequest, deleteGlobalConfigsSaga)
  yield takeEvery(actions.updateGlobalConfigRequest, updateGlobalConfigsSaga)
  yield takeEvery(actions.addGlobalConfigRequest, addGlobalConfigsSaga)
}

export default watchGlobalConfigSaga
