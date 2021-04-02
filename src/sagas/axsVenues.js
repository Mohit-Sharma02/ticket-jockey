import { call, put, takeEvery, take } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/axsVenues"
import * as userActions from "../actions/users"
import * as api from "../api/axsVenues"

const formatSearchAxsVenueData = axsVenue => {
  return {
    name: axsVenue.name,
    state: axsVenue.state,
    city: axsVenue.city,
    address: axsVenue.address,
    zip: axsVenue.zip
  }
}

const formatUpdateAxsVenueForSearchSkybox = skyBoxAxsVenue => {
  return {
    skyboxVenueId: skyBoxAxsVenue.id,
    state: skyBoxAxsVenue.state,
    city: skyBoxAxsVenue.city,
    address: skyBoxAxsVenue.address,
    zip: skyBoxAxsVenue.postalCode,
    type: "venue",
    keyword: skyBoxAxsVenue.name
  }
}

function* createAxsVenueSaga(action) {
  const axsVenue = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.createAxsVenue, [axsVenue])

    success
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating axs venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating a axs venue!"
          })
        )
  } catch (error) {
    if (error.response.status === 403) {
      yield put(userActions.userAuthorizationFailure(error))
    } else if (error.response.status === 401) {
      error.message = error.response.data.message
      yield put(appActions.appReceiveError(error))
    } else {
      yield put(appActions.appReceiveError(error))
    }
  } finally {
  }
}

function* fetchAxsVenueSaga() {
  try {
    const { data } = yield call(api.fetchAxsVenue)
    yield put(actions.fetchAxsVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* fetchAxsVenuePagingSaga(action) {
  const axsVenueRequest = action.payload
  try {
    yield put(appActions.appStartFetching())

    const { data } = yield call(api.fetchAxsVenueByPaging, axsVenueRequest)
    yield put(
      actions.fetchAxsVeunePagingSuccess({
        totalRow: data.total_rows,
        axsVenueInfo: data.rows,
        page: data.page
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

function* fetchAxsVenueSearchSaga(action) {
  const axsVenueRequest = action.payload
  try {
    yield put(appActions.appStartFetching())

    const { data } = yield call(api.fetchAxsVenueSearch, axsVenueRequest)
    yield put(
      actions.fetchAxsVeuneSearchSuccess({
        totalRow: data.total_rows,
        axsVenueInfo: data.rows,
        page: data.page
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

function* deleteAxsVenueSaga(action) {
  const { _id } = action.payload
  try {
    const {
      data: { ok }
    } = yield call(api.deleteAxsVenue, _id)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting a axs venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a axs venue!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* updateAxsVenueSaga(action) {
  const newAxsVenue = action.payload

  try {
    const {
      data: { ok }
    } = yield call(api.updateAxsVenue, newAxsVenue, newAxsVenue._id)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a axs venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating a axs venue!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

// function* updatePriceMarkUpPctForAxsVenueSaga(action) {
//     const { _id, pctValue, isPctValue } = action.payload
//     // newVenue.venueId = newVenue.url.slice(12).replace(".com/", "")
//     try {
//         const {
//             data: { ok }
//         } = yield call(api.updatePriceMarkupPctForAxsVenue, _id, {
//             priceMarkupPct: pctValue,
//             is_priceMarkupPct: isPctValue
//         })

//         ok
//             ? yield put(
//                 appActions.appReceiveAlert({
//                     message: "Succeed updating Price MarkUp PCT!"
//                 })
//             )
//             : yield put(
//                 appActions.appReceiveAlert({
//                     message: "Something went wrong with updating Price MarkUp PCT!"
//                 })
//             )
//     } catch (error) {
//         if (error.response.status === 403)
//             yield put(userActions.userAuthorizationFailure(error))
//         else yield put(appActions.appReceiveError(error))
//     } finally {
//     }
// }

function* searchSkyboxAxsVenueSaga(action) {
  const axsVenue = action.payload

  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.searchSkyboxAxsVenue,
      formatSearchAxsVenueData(axsVenue)
    )
    if (data.length > 1) {
      yield put(actions.OpenSkyboxAxsVenueDupModal(data))

      const { payload: selectedAxsVenue } = yield take(
        actions.SELECT_MODAL_SKYBOX_AXS_VENUE
      )

      const {
        data: { ok }
      } = yield call(
        api.updateAxsVenue,
        formatUpdateAxsVenueForSearchSkybox(selectedAxsVenue),
        axsVenue._id
      )

      yield put(actions.fetchAxsVenueRequest())

      ok
        ? yield put(
            appActions.appReceiveAlert({
              message: "Succeed updating a axs venue!"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with updating a axs venue!"
            })
          )
    } else if (data.length === 1) {
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed To Search From Skybox!"
        })
      )

      const {
        data: { ok }
      } = yield call(
        api.updateAxsVenue,
        formatUpdateAxsVenueForSearchSkybox(data[0]),
        axsVenue._id
      )

      yield put(actions.fetchAxsVenueRequest())

      ok
        ? yield put(
            appActions.appReceiveAlert({
              message: "Succeed updating a axs venue!"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with updating a axs venue!"
            })
          )
    } else {
      yield put(actions.searchSkyboxAxsVenueFailure(axsVenue))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchAxsVenuesSaga() {
  yield takeEvery(actions.createAxsVenueRequest, createAxsVenueSaga)

  yield takeEvery(actions.fetchAxsVenueRequest, fetchAxsVenueSaga)

  yield takeEvery(actions.fetchAxsVenuePagingRequest, fetchAxsVenuePagingSaga)

  yield takeEvery(actions.fetchAxsVenueSearchRequest, fetchAxsVenueSearchSaga)

  yield takeEvery(actions.deleteAxsVenueRequest, deleteAxsVenueSaga)

  yield takeEvery(actions.updateAxsVenueRequest, updateAxsVenueSaga)

  yield takeEvery(actions.searchSkyboxAxsVenueRequest, searchSkyboxAxsVenueSaga)

  // yield takeEvery(
  //     actions.updatePriceMarkUpPctForAxsVenueRequest,
  //     updatePriceMarkUpPctForAxsVenueSaga
  // )
}

export default watchAxsVenuesSaga
