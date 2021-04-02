import { takeEvery, call, put } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/promos"
import * as userActions from "../actions/users"
import * as api from "../api/promos"
import { dateFormatterWithTZ } from "../utils"
const formatPromos = data => {
  return data.reduce(
    (accu, promo) => {
      const { _id } = promo

      accu["ids"].push(_id)
      accu.dict[_id] = promo

      return accu
    },
    {
      ids: [],
      dict: {}
    }
  )
}

const formatEventPromos = data => {
  var jsonObj = []
  var item = {}
  for (var j = 0; j < data.length; j++) {
    var promoName = Object.keys(data[j].promos)
    var promoCode = Object.values(data[j].promos)
    item["eventDate"] = data[j].eventDate
    item["eventId"] = data[j].eventId
    item["promoName"] = promoName
    item["promoCode"] = promoCode
    jsonObj.push(item)
    item = {}
  }
  return jsonObj.map(({ eventId, eventDate, promoName, promoCode }) => ({
    eventId,
    eventDate: dateFormatterWithTZ(eventDate)(),
    promoName,
    promoCode
  }))
}

function* fetchPromosSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchPromos)

    yield put(actions.fetchPromosSuccess(formatPromos(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* addPRomoSaga(action) {
  try {
    const { data } = yield call(api.addPromo, action.payload)
    data
      ? yield put(
          appActions.appReceiveAlert({
            message: "Successfully added!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* deletePRomoSaga(action) {
  try {
    const { data } = yield call(api.deletePromos, action.payload)
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* fetchEventPromosSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchEventPromos)
    yield put(actions.fetchEventPromosSuccess(formatEventPromos(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

const formatAvailablePromos = data => {
  var availablePromosObject = []
  var item = {}
  for (var i = 0; i < Object.keys(data).length; i++) {
    var promoName = Object.keys(data)[i]
    var eventId = Object.values(data)[i]
    item["eventId"] = eventId
    item["promoName"] = promoName
    availablePromosObject.push(item)
    item = {}
  }
  return availablePromosObject
}

function* fetchAvailableEventPromosSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchAvailableEventPromos)
    yield put(
      actions.fetchAvailableEventPromosSuccess(formatAvailablePromos(data))
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* addEventPromoSaga(action) {
  try {
    const { data: success, message, ok } = yield call(
      api.addEventPromo,
      action.payload
    )
    const { data } = yield call(api.fetchEventPromos)
    yield put(actions.fetchEventPromosSuccess(formatEventPromos(data)))
    yield put(
      appActions.appReceiveAlert({
        message: "Promo Code Updated SuccessFully !"
      })
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else if (error.response.status === 401)
      yield put(
        appActions.appReceiveError({
          message: `Event not found ! Please Try another event!`
        })
      )
    else yield put(appActions.appReceiveError(error))
  }
}

function* deleteEventPromoSaga(action) {
  try {
    const { data } = yield call(api.deleteEventPromo, action.payload)
    data.ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Promo Code Deleted SuccessFully !"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong! Please try again!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* watchPromoSaga() {
  yield takeEvery(actions.FETCH_PROMOS_REQUEST, fetchPromosSaga)
  yield takeEvery(actions.FETCH_EVENT_PROMOS_REQUEST, fetchEventPromosSaga)
  yield takeEvery(
    actions.FETCH_AVAILABLE_EVENT_PROMOS_REQUEST,
    fetchAvailableEventPromosSaga
  )
  yield takeEvery(actions.ADD_PROMO_REQUEST, addPRomoSaga)
  yield takeEvery(actions.DELETE_PROMOS_REQUEST, deletePRomoSaga)
  yield takeEvery(actions.ADD_EVENT_PROMO_REQUEST, addEventPromoSaga)
  yield takeEvery(actions.DELETE_EVENT_PROMOS_REQUEST, deleteEventPromoSaga)
}

export default watchPromoSaga
