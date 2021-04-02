import { call, put, takeEvery, race, delay } from "redux-saga/effects"

import * as api from "../api/config"
import * as actions from "../actions/config"
import * as appActions from "../actions/app"

function* fetchBoradcastingStatusSaga() {
  try {
    yield put(appActions.appStartFetching())

    const { data: status } = yield call(api.fetchBoradcastingStatus)
    yield put(actions.setBoardCastingStatus(status))
  } catch (error) {
    yield put(
      appActions.appReceiveAlert({
        message: "Failed to fetch the status of broadcasting!"
      })
    )
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* broadcastListingSaga(action) {
  const { isBroadcasting, eventId } = action.payload

  try {
    const {
      res: { data: ok }
    } = yield race({
      res: call(
        isBroadcasting ? api.broadcastListing : api.unBroadcastListing,
        eventId,
        isBroadcasting
      ),
      timeout: delay(6000)
    })

    ok
      ? yield put(appActions.appReceiveAlert({ message: "Suceed!" }))
      : yield put(appActions.appReceiveAlert({ message: "Failed!" }))

    // if (data && data["success"]) {
    //   yield put(appActions.appReceiveAlert({ message: "Suceed!" }))
    // } else {
    //   yield put(appActions.appReceiveAlert({ message: "Failed!" }))
    //   if (!eventId) {
    //     yield put(actions.setBoardCastingStatus(!isBroadcasting)) //revert the switch state
    //   }
    // }
  } catch (error) {
    yield put(appActions.appReceiveAlert({ message: "Failed!" }))
    // if (!eventId) {
    //   yield put(actions.setBoardCastingStatus(!isBroadcasting)) //revert the switch state
    // }
  } finally {
  }
}

function* watchConfigSaga() {
  yield takeEvery(
    [actions.BROADCAST_LISTING_REQUEST, actions.UNBROADCAST_LISTING_REQUEST],
    broadcastListingSaga
  )

  yield takeEvery(
    actions.FETCH_BOARDCASTING_STATUS,
    fetchBoradcastingStatusSaga
  )
}

export default watchConfigSaga
