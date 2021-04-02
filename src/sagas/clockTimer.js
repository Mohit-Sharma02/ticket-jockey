import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/clockTime"
import * as userActions from "../actions/users"
import * as api from "../api/clockTimer"
import { dateFormatterWithTZ, dateFormatter } from "../utils"

const formatTime = data => {
  var newData = []
  if (data.timeEntry && data.timeEntry !== undefined) {
    data.timeEntry.forEach(element => {
      var newCollection = {}
      newCollection["_id"] = data._id
      newCollection[Object.keys(element)[0]] = Object.values(element)[0]
      newCollection[Object.keys(element)[1]] =
        Object.values(element)[1] === "00:00:00"
          ? "-"
          : Object.values(element)[1]
      newCollection[Object.keys(element)[2]] = Object.values(element)[2]
      newData.push(newCollection)
    })
  }
  return newData
}

const getProfilePicture = (id, users) => {
  var profilePicture = ""
  if (users != undefined) {
    users.filter(a => {
      if (a.id.includes(id.split(":")[0])) {
        profilePicture = a.key.profile ? a.key.profile : profilePicture
      }
    })
  }
  return profilePicture
}

const formatAllTime = (data, users) => {
  var newData = []
  if (data && data !== undefined) {
    data.forEach(element => {
      var newCollection = {}
      newCollection["_id"] = element._id
      newCollection["userName"] = element.userName
      newCollection["profile"] = getProfilePicture(element._id, users)
      newCollection["totalHours"] = element.totalHours
        ? element.totalHours
        : "0"
      newCollection["date"] = dateFormatter(element.created_date).split(",")[0]
      newCollection["timeEntry"] = formatAllTimeEntry(element.timeEntry)
      newData.push(newCollection)
    })
  }
  return newData
}

const formatAllTimeEntry = data => {
  var formatedTimeEntry = []
  data.forEach(element => {
    element["id"] = element.clockIn
    formatedTimeEntry.push(element)
  })
  return formatedTimeEntry
}

const formatUsers = data => {
  if (data && data !== undefined) {
    return data.map(user => {
      const { username, firstName, lastName, _id, role, profile } = user.key

      return {
        username: firstName + " " + lastName,
        _id,
        role,
        profile: profile ? profile : ""
      }
    })
  }
}

const formatSearchUser = data => {
  var newUser = []
  if (data && data !== undefined) {
    data.map(user => {
      newUser.push(user.key.firstName + " " + user.key.lastName)
    })
  }
  return newUser
}
function* fetchClockTimerSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const [userTimeDetails, allTimeDetails] = yield all([
      call(
        api.fetchClockTimer,
        action.payload.id && action.payload.id ? action.payload.id : ""
      ),
      call(
        api.fetchAllTimer,
        action.payload.StartDate,
        action.payload.EndDate,
        action.payload.name
      )
    ])
    yield put(
      actions.fetchClockTimerSuccess({
        userTimerInfo: formatTime(userTimeDetails.data.timerInfo),
        totalHours: userTimeDetails.data.totalHours,
        recentClockInTime:
          userTimeDetails.data.recentclockInTime == 0
            ? 0
            : userTimeDetails.data.recentclockInTime,
        timerInfo: formatAllTime(
          allTimeDetails.data.allClockTimerinfo,
          allTimeDetails.data.Users
        ),
        users: formatUsers(allTimeDetails.data.Users),
        usersForSerach: formatSearchUser(allTimeDetails.data.Users)
      })
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* createTimerInstanceSaga(action) {
  const { timer, StartDate, EndDate, name, created_by_admin } = action.payload

  try {
    // yield put(appActions.appStartFetching())
    const { data: ok } = yield call(
      created_by_admin && created_by_admin
        ? api.createNewTimerInstanceByadmin
        : api.createNewTimerInstance,
      created_by_admin && created_by_admin ? timer : action.payload
    )
    if (ok.success == false) {
      yield put(
        appActions.appReceiveAlert({
          message: ok.message
        })
      )
    } else {
      ok
        ? yield put(
            appActions.appReceiveAlert({
              message:
                created_by_admin && created_by_admin
                  ? "Time has been created successfully!"
                  : action.payload.timeEntry.clockOut === "00:00:00"
                  ? "You have successfully clocked in"
                  : "You have successfully clocked out"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with creating Time!"
            })
          )
    }

    const [userTimeDetails, allTimeDetails] = yield all([
      call(api.fetchClockTimer, action.payload._id),
      call(api.fetchAllTimer, StartDate, EndDate, name)
    ])
    yield put(
      actions.fetchClockTimerSuccess({
        userTimerInfo: formatTime(userTimeDetails.data.timerInfo),
        totalHours: userTimeDetails.data.totalHours,
        recentClockInTime:
          userTimeDetails.data.recentclockInTime == 0
            ? 0
            : userTimeDetails.data.recentclockInTime,
        timerInfo: formatAllTime(
          allTimeDetails.data.allClockTimerinfo,
          allTimeDetails.data.Users
        ),
        users: formatUsers(allTimeDetails.data.Users),
        usersForSerach: formatSearchUser(allTimeDetails.data.Users)
      })
    )
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error))
    } else {
      yield put(appActions.appReceiveError(error))
    }
  } finally {
    //  yield put(appActions.appStopFetching())
  }
}

function* updateTimeByAdminSaga(action) {
  const { timer, start, end, name } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data: ok } = yield call(api.upDateTimeByAdmin, timer)
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Time has been successfully updated.!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Time!"
          })
        )
    const { data } = yield call(api.fetchAllTimer, start, end, name)
    yield put(
      actions.fetchClockTimerSuccess({
        timerInfo: formatAllTime(data.allClockTimerinfo, data.Users),
        users: formatUsers(data.Users),
        usersForSerach: formatSearchUser(data.Users)
      })
    )
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error))
    } else {
      yield put(appActions.appReceiveError(error))
    }
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* deleteUserSaga(action) {
  try {
    yield put(appActions.appStartFetching())
    const { data: ok } = yield call(api.deleteUser, action.payload.id)
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "SuccessFully User deleted !"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting User!"
          })
        )
    const { data } = yield call(
      api.fetchAllTimer,
      action.payload.StartDate,
      action.payload.EndDate,
      action.payload.name
    )
    yield put(
      actions.fetchClockTimerSuccess({
        timerInfo: formatAllTime(data.allClockTimerinfo, data.Users),
        users: formatUsers(data.Users),
        usersForSerach: formatSearchUser(data.Users)
      })
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchClockTimerSaga() {
  // for Event Statistic
  yield takeLatest(actions.FETCH_CLOCKTIMER_REQUEST, fetchClockTimerSaga)

  yield takeEvery(actions.createTimerRequest, createTimerInstanceSaga)

  yield takeEvery(actions.updateAdminClockTimerRequest, updateTimeByAdminSaga)

  yield takeLatest(actions.deleteUserRequest, deleteUserSaga)
}

export default watchClockTimerSaga
