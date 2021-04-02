import { call, put, takeEvery, take } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/venues"
import * as userActions from "../actions/users"
import * as api from "../api/venues"

const formatSearchVenueData = venue => {
  return {
    name: venue.keyword,
    state: venue.state,
    city: venue.city,
    address: venue.address,
    zip: venue.zip
  }
}

const formatUpdateVenueForSearchSkybox = skyBoxVenue => {
  return {
    skyboxVenueId: skyBoxVenue.id,
    state: skyBoxVenue.state,
    city: skyBoxVenue.city,
    address: skyBoxVenue.address,
    zip: skyBoxVenue.postalCode,
    type: "venue",
    keyword: skyBoxVenue.name
  }
}

//venue
function* createManagedVenueSaga(action) {
  const venue = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.createManagedVenue, [venue])

    success
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed creating mangaed a venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with creating a managed venue!"
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

function* fetchManagedVenueSaga() {
  try {
    const { data } = yield call(api.fetchManagedVenue)
    yield put(actions.fetchManagedVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* fetchManagedVenuePagingSaga(action) {
  const venueRequest = action.payload
  try {
    yield put(appActions.appStartFetching())

    const { data } = yield call(api.fetchManagedVenueByPaging, venueRequest)
    yield put(
      actions.fetchManagedVeunePagingSuccess({
        totalRow: data.total_rows,
        venueInfo: data.rows,
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

function* fetchManagedVenueSearchSaga(action) {
  const venueRequest = action.payload
  try {
    yield put(appActions.appStartFetching())

    const { data } = yield call(api.fetchManagedVenueSearch, venueRequest)
    yield put(
      actions.fetchManagedVeuneSearchSuccess({
        totalRow: data.total_rows,
        venueInfo: data.rows,
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

function* deleteManagedVenueSaga(action) {
  const { tMasterVenueId } = action.payload
  try {
    const {
      data: { ok }
    } = yield call(api.deleteManagedVenue, tMasterVenueId)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed deleting a mangaed venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with deleting a managed venue!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* updateManagedVenueSaga(action) {
  const newVenue = action.payload

  try {
    const {
      data: { ok }
    } = yield call(api.updateManagedVenue, newVenue, newVenue.tMasterVenueId)

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating a mangaed venue!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating a managed venue!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* updatePriceMarkUpPctForVenueSaga(action) {
  const { venueId, pctValue, isPctValue } = action.payload
  // newVenue.venueId = newVenue.url.slice(12).replace(".com/", "")
  try {
    const {
      data: { ok }
    } = yield call(api.updatePriceMarkupPctForVenue, venueId, {
      priceMarkupPct: pctValue,
      is_priceMarkupPct: isPctValue
    })

    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Price MarkUp PCT!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Price MarkUp PCT!"
          })
        )
    //const { data } = yield call(api.fetchEVenue)
    //yield put(actions.fetchEVeuneSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* searchSkyboxVenueSaga(action) {
  const venue = action.payload

  try {
    const { data } = yield call(
      api.searchSkyboxVenue,
      formatSearchVenueData(venue)
    )

    if (data.length > 1) {
      yield put(actions.OpenSkyboxVenueDupModal(data))

      const { payload: selectedVenue } = yield take(
        actions.SELECT_MODAL_SKYBOX_VENUE
      )

      const {
        data: { ok }
      } = yield call(
        api.updateManagedVenue,
        formatUpdateVenueForSearchSkybox(selectedVenue),
        venue.tMasterVenueId
      )

      yield put(actions.fetchManagedVenueRequest())

      ok
        ? yield put(
            appActions.appReceiveAlert({
              message: "Succeed updating a mangaed venue!"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with updating a managed venue!"
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
        api.updateManagedVenue,
        formatUpdateVenueForSearchSkybox(data[0]),
        venue.tMasterVenueId
      )

      yield put(actions.fetchManagedVenueRequest())

      ok
        ? yield put(
            appActions.appReceiveAlert({
              message: "Succeed updating a mangaed venue!"
            })
          )
        : yield put(
            appActions.appReceiveAlert({
              message: "Something went wrong with updating a managed venue!"
            })
          )
    } else {
      yield put(actions.searchSkyboxVenueFailure(venue))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* watchVenuesSaga() {
  yield takeEvery(actions.createManagedVenueRequest, createManagedVenueSaga)

  yield takeEvery(actions.fetchManagedVenueRequest, fetchManagedVenueSaga)

  yield takeEvery(
    actions.fetchManagedVenuePagingRequest,
    fetchManagedVenuePagingSaga
  )

  yield takeEvery(
    actions.fetchManagedVenueSearchRequest,
    fetchManagedVenueSearchSaga
  )

  yield takeEvery(actions.deleteManagedVenueRequest, deleteManagedVenueSaga)

  yield takeEvery(actions.updateManagedVenueRequest, updateManagedVenueSaga)

  yield takeEvery(actions.searchSkyboxVenueRequest, searchSkyboxVenueSaga)

  yield takeEvery(
    actions.updatePriceMarkUpPctForVenueRequest,
    updatePriceMarkUpPctForVenueSaga
  )
}

export default watchVenuesSaga
