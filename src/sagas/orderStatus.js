import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/orderStatus"
import * as userActions from "../actions/users"
import * as api from "../api/orderStatus"
import { dateFormatterWithTZ, dateFormatter } from "../utils"

//Open Listings
const formatOrderStatusListings = data => {
  return data.eventInfo.map(event => {
    const {
      _id,
      eventInfo: {
        eventId,
        eventName,
        eventDate,
        eventAddress,
        timeZone,
        eventUrl
      },
      section,
      row,
      quantitySold,
      eventCancel,
      status,
      eventPostponed,
      saleTime,
      invoiceId,
      currentlyTryingToBuy,
      problemBuying,
      baseCost,
      reasonProblemBuying,
      orderNum,
      problemNotes,
      readyToBuy,
      purchaseSuccessStatus,
      pdfTransferred,
      pdfAttached,
      highestRowsBack,
      unitCost,
      externalReference,
      fulfillmentCompleted,
      customerDisplayName,
      customerId,
      skyBoxEventId,
      filter
    } = event

    return {
      listingId: _id,
      eventId,
      ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventId}`,
      eventName,
      eventAddress,
      eventDate: dateFormatterWithTZ(eventDate)(timeZone),
      seat: `${section}, ${row}`,
      quantitySold,
      eventCancel,
      status,
      eventPostponed,
      saleTime: dateFormatter(saleTime),
      invoiceIdUrl: `https://skybox.vividseats.com/invoices/${invoiceId}`,
      invoiceId: invoiceId,
      currentlyTryingToBuy,
      problemBuying,
      reasonProblemBuying: reasonProblemBuying || "None",
      baseCost,
      orderNum,
      problemNotes,
      readyToBuy,
      highestRowsBack,
      unitCost,
      externalReference,
      purchaseSuccessStatus,
      pdfTransferred,
      pdfAttached,
      fulfillmentCompleted,
      customerId,
      customerDisplayName,
      skyBoxEventId,
      eventUrl: eventUrl !== undefined ? eventUrl : "",
      filter: dataFilter(status, eventCancel, eventPostponed, readyToBuy),
      eventDate1: dateFormatterWithTZ(eventDate)(timeZone),
      page: data.page,
      totalRow: data.total_rows
    }
  })
}

function dataFilter(status, eventCancel, eventPostponed, readyToBuy) {
  // if (status === "Sold") return "Sold"
  // if (eventCancel) return "Cancel"
  // if (eventPostponed) return "Postponed"
  // if (readyToBuy) return "Tracking"
  // return "Open"
  if (eventCancel) return 3
  if (eventPostponed) return 2
  if (readyToBuy) return 1
  return 0
}

const SortOrderStatus = data => {
  return data.sort(function(a, b) {
    return new Date(a.eventDate) - new Date(b.eventDate)
  })
}

function* fetchOrderStatusListingsSaga(action) {
  const {
    statusType,
    eventName,
    eventId,
    invoiceId,
    eventAddress,
    startDate,
    endDate,
    page,
    sizePerPage
  } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.fetchOrderStatus,
      statusType,
      eventName,
      eventId,
      invoiceId,
      eventAddress,
      startDate,
      endDate,
      page,
      sizePerPage
    )
    yield put(
      actions.fetchOrderStatusSuccess(
        SortOrderStatus(formatOrderStatusListings(data))
      )
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* watchListingSaga() {
  //Open Sale Listings
  yield takeLatest(
    actions.FETCH_ORDER_STATUS_REQUEST,
    fetchOrderStatusListingsSaga
  )
}

export default watchListingSaga
