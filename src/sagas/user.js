import { call, put, takeEvery } from "redux-saga/effects"

import {
  userAuthorizationFailure,
  userAuthorizationSuccess,
  USER_AUTHORIZATION_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  FETCH_USER_PROFILE_REQUEST,
  fetchUserProfileSuccess
} from "../actions/users"
import {
  appStartFetching,
  appReceiveError,
  appStopFetching
} from "../actions/app"
import { login } from "../api/user"
import { restApiClient } from "../api"
import * as apiUser from "../api/user"
import * as userActions from "../actions/users"
import * as appActions from "../actions/app"

function* userAuthorizationSaga(action) {
  try {
    const { username, password } = action.payload

    yield put(appStartFetching())

    const { data } = yield call(login, {
      password,
      username
    })

    //add username as a parameter of api request
    restApiClient.defaults.params = {
      ...restApiClient.defaults.params,
      username
    }

    yield put(userAuthorizationSuccess(data))
  } catch (error) {
    yield put(appReceiveError(new Error("Email or Password is wrong!")))
    yield put(userAuthorizationFailure())
  } finally {
    yield put(appStopFetching())
  }
}

function* fetchUserProfileSaga(action) {
  try {
    yield put(appStartFetching())
    const { data } = yield call(apiUser.fetchUserProfile, action.payload)
    yield put(fetchUserProfileSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* userUpdateProfileSaga(action) {
  try {
    yield put(appActions.updateProfileStartFetching())
    const { data: ok } = yield call(apiUser.userUpdateProfile, action.payload)
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Account!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Account!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.updateProfileStopFetching())
  }
}

function* watchUserSaga() {
  yield takeEvery(USER_AUTHORIZATION_REQUEST, userAuthorizationSaga)
  yield takeEvery(USER_UPDATE_PROFILE_REQUEST, userUpdateProfileSaga)
  yield takeEvery(FETCH_USER_PROFILE_REQUEST, fetchUserProfileSaga)
}

export default watchUserSaga
