import { call, put, take, cancel, fork } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/tickets"
import * as api from "../api/tickets"
import * as constants from "../constants"

function* fetchTicketsByEventIdSaga(action) {
  const { eventId } = action.payload

  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchTicketsByEventId, eventId)
    Object.keys(data).length //data might be a empty object due to tickets are sold out
      ? yield put(actions.fetchTicketsByEventIdSuccess(data))
      : yield put(
          appActions.appReceiveError({
            message: `Event not found or Tickets already sold out! Please Try another event!`,
            type: constants.ERROR_EVENT_NOT_FOUND
          })
        )
  } catch (error) {
    yield put(
      appActions.appReceiveError({
        message: `Event not found or Tickets already sold out! Please Try another event!`,
        type: constants.ERROR_EVENT_NOT_FOUND
      })
    )
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchTicketsSaga() {
  while (true) {
    const action = yield take(actions.FFETCH_TICKETS_BY_EVENTID_REQUEST)

    const task = yield fork(fetchTicketsByEventIdSaga, action)

    yield take(actions.FFETCH_TICKETS_BY_EVENTID_STOP_REQUEST)

    yield cancel(task)
  }
}

export default watchTicketsSaga
