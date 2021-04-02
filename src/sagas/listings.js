import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects"

import * as appActions from "../actions/app"
import * as actions from "../actions/listings"
import * as userActions from "../actions/users"
import * as api from "../api/listings"
import * as eventsApi from "../api/events"
import { dateFormatterWithTZ, dateFormatter } from "../utils"
import * as emailapi from "../api/emailManagement"
import { fetchEmailManagementRequest } from "../actions/emailManagement"
import * as apiGlobal from "../api/globalConfig"
import moment from "moment-timezone"
import * as promosapi from "../api/promos"

import { CUSTOMER_DISPLAY_NAME } from "../constants/listings"

//var generator = require("generate-password")

function* publishListingSaga(action) {
  const { eventId, listing } = action.payload

  try {
    yield put(appActions.appStartFetching())
    const {
      data: { eventFoundinSkyBox, postedSkybox, persisted }
    } = yield call(api.publishListing, eventId, listing)

    if (!eventFoundinSkyBox) {
      yield put(
        appActions.appReceiveAlert({ message: "Event Not Found In Skybox!" })
      )
    } else if (!postedSkybox) {
      yield put(
        appActions.appReceiveAlert({ message: "Failed to post in Skybox!" })
      )
    } else if (!persisted) {
      yield put(
        appActions.appReceiveAlert({ message: "Failed to save in Database!" })
      )
    } else {
      yield put(appActions.appReceiveAlert({ message: "Suceed to pusblish!" }))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

//Event Listings
function* fetchValidListingsSaga(action) {
  const { eventId, stubhubEventId } = action.payload

  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchValidListings, eventId, stubhubEventId)
    yield put(actions.fetchValidListingsSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchValidListingsWithSpreadSaga(action) {
  const { eventId } = action.payload

  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(eventsApi.fetchManagedEvents, eventId)

    const newAction = {
      ...action,
      payload: { eventId, stubhubEventId: data[0]["stubhubEventId"] }
    }

    yield fetchValidListingsSaga(newAction)
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

export const formatTrackedListings = data => {
  return data.reduce((accu, listing) => {
    const {
      _id,
      eventId,
      skyBoxLinesId,
      skyBoxInventoryId,
      unitCost,
      section,
      row,
      quantity,
      listingPrice
    } = listing

    if (!accu.hasOwnProperty(unitCost)) {
      accu[unitCost] = []
    }

    accu[unitCost] = [
      ...accu[unitCost],
      {
        secRow: `${section}, ${row}`,
        quantity,
        listingPrice,
        profit: Number(listingPrice - unitCost).toFixed(2),
        eventId,
        skyBoxInventoryId,
        skyBoxLinesId,
        _id
      }
    ]

    return accu
  }, {})
}

function* fetchTrackedListingsSaga(action) {
  const { eventId } = action.payload

  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchTrackedListings, eventId)
    yield put(actions.fetchTrackedListingsSuccess(formatTrackedListings(data)))
  } catch (error) {
    yield put(appActions.appReceiveAlert(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

// For testing sold listing on dev env
function* fetchSimulateTrackedListingSaga() {
  try {
    const { data } = yield call(api.fetchSimulateTrackedListings)
    yield put(actions.fetchSimulateTrackedListingsSuccess(data))
  } catch (error) {
    yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

export const formatSoldListings = data => {
  return data.map(({ _id, section, row, actualProfit, managedVenue }) => ({
    _id,
    section,
    row,
    actualProfit,
    managedVenue
  }))
}

function* fetchSoldListingsSaga(action) {
  const { eventId } = action.payload

  try {
    const { data } = yield call(api.fetchSoldListings, eventId)
    yield put(actions.fetchSoldListingsSuccess(formatSoldListings(data)))
  } catch (error) {
    yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

//Open Listings
const formatOpenListings = data => {
  return data.reduce(
    (accu, listing) => {
      const {
        _id,
        eventInfo: {
          eventId,
          eventName,
          eventDate,
          eventAddress,
          timeZone,
          eventUrl,
          marketType,
          venueId
        },
        section,
        row,
        quantitySold,
        status,
        saleTime,
        invoiceId,
        currentlyTryingToBuy,
        problemBuying,
        baseCost,
        reasonProblemBuying,
        orderNum,
        orderNotes,
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
        eventPostponed,
        isGa,
        gaAvailability,
        isPDFDownloaded,
        pdfUrls,
        isPrintDateAvailable,
        pdfPrintDate,
        secondaryMarketOrderNum,
        secondaryMarketLocation,
        filter,
        fiter2,
        pdfButtonStatus,
        is_monitor,
        isDownloadPDFeVenue,
        locked
      } = listing

      accu.ids.push(_id)
      accu.dict[_id] = {
        listingId: _id,
        section,
        row,
        eventId,
        ticketMasterUrl: `https://www1.ticketmaster.com/event/${eventId}`,
        eventName,
        eventAddress,
        eventDate: dateFormatterWithTZ(eventDate)(timeZone),
        seat: `${section}, ${row}`,
        quantitySold,
        status,
        saleTime: dateFormatter(saleTime),
        invoiceIdUrl: `https://skybox.vividseats.com/invoices/${invoiceId}`,
        invoiceId: invoiceId,
        currentlyTryingToBuy,
        problemBuying,
        reasonProblemBuying: reasonProblemBuying || "None",
        baseCost,
        orderNum,
        orderNotes,
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
        eventPostponed,
        isGa,
        gaAvailability,
        isPDFDownloaded,
        isPrintDateAvailable,
        pdfPrintDate,
        pdfUrls,
        secondaryMarketOrderNum,
        secondaryMarketLocation,
        is_monitor,
        eventUrl: eventUrl !== undefined ? eventUrl : "",
        marketType,
        venueId,
        locked,
        isDownloadPDFeVenue:
          isDownloadPDFeVenue != undefined &&
          marketType.toLowerCase().includes("evenue") &&
          (purchaseSuccessStatus || pdfTransferred) &&
          !fulfillmentCompleted
            ? isDownloadPDFeVenue
            : "",
        filter: dataformate(
          readyToBuy,
          purchaseSuccessStatus,
          pdfTransferred,
          // pdfAttached,
          fulfillmentCompleted
        ),
        fiter2: dataformate1(
          readyToBuy,
          purchaseSuccessStatus,
          pdfTransferred,
          //  pdfAttached,
          fulfillmentCompleted
        ),
        pdfButtonStatus: Status(
          readyToBuy,
          purchaseSuccessStatus,
          pdfTransferred,
          pdfAttached,
          isPDFDownloaded,
          fulfillmentCompleted
        )
      }

      return accu
    },
    {
      ids: [],
      dict: {}
    }
  )
}

function Status(
  readyToBuy,
  purchaseSuccessStatus,
  pdfTransferred,
  pdfAttached,
  isPDFDownloaded,
  fulfillmentCompleted
) {
  if (isPDFDownloaded && isPDFDownloaded != undefined) return false
  if (fulfillmentCompleted && fulfillmentCompleted != undefined) return false
  if (pdfAttached && pdfAttached != undefined) return true
  if (pdfTransferred && pdfTransferred != undefined) return true
}
function dataformate(
  readyToBuy,
  purchaseSuccessStatus,
  pdfTransferred,
  // pdfAttached,
  fulfillmentCompleted
) {
  if (fulfillmentCompleted) return "4"
  // if (pdfAttached) return "4"
  if (pdfTransferred) return "3"
  if (purchaseSuccessStatus) return "2"
  if (readyToBuy) return "1"
}

function dataformate1(
  readyToBuy,
  purchaseSuccessStatus,
  pdfTransferred,
  // pdfAttached,
  fulfillmentCompleted
) {
  if (fulfillmentCompleted) return "9"
  // if (pdfAttached) return "9"
  if (pdfTransferred) return "8"
  if (purchaseSuccessStatus) return "7"
  if (readyToBuy) return "6"
}
function* fetchOpenListingsSaga() {
  const startDate = moment(new Date())
    .subtract(29, "days")
    .format("YYYY-MM-DD HH:mm:ss")
  const endDate = moment(new Date())
    .add(23, "hours")
    .add(59, "minutes")
    .add(59, "seconds")
    .format("YYYY-MM-DD HH:mm:ss")
  try {
    const [
      openTransferListings,
      openSalesListings,
      orderFlowListings,
      statisticsLogs
      // upcomingOpenOrders
    ] = yield all([
      call(api.fetchOpenTransfer),
      call(api.fetchOpenSales),
      call(api.fetchOrderFlow),
      call(api.fetchSoldStatisticsLog, startDate, endDate)
      // call(api.fetchUpcomingOpenOrders)
    ])

    yield put(
      actions.fetchOpenTransfersSuccess(
        formatOpenListings(openTransferListings.data)
      )
    )
    yield put(
      actions.fetchOpenSalesSuccess(
        sortOpenSalesListings(formatOpenListings(openSalesListings.data))
      )
    )
    yield put(
      actions.fetchOrderFlowSuccess(
        sortOverFlowListings(formatOpenListings(orderFlowListings.data))
      )
    )
    yield put(actions.fetchSoldStatisticsSuccess(statisticsLogs.data))
    // yield put(
    //   actions.fetchUpcomingOpenOrdersSuccess(
    //     formatUpcomingOpenOrders(upcomingOpenOrders.data)
    //   )
    // )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

//Open Sale Listings
const sortOpenSalesListings = data => {
  const { ids, dict } = data
  const greenRows = [],
    yellowRows = [],
    redRows = [],
    purpleRows = []
  // const { CustomerDisplayName } = ok
  var costForPurpleOrder = []
  var costForRedOrder = []
  var costForGreenOrder = []
  var totalCostForPurple = 0
  var totalCostForGreen = 0
  var totalCostForRed = 0
  // var name = CustomerDisplayName.split(",")
  CUSTOMER_DISPLAY_NAME.map((item, index) => {
    var dataForPurpleOrder = Object.values(dict).filter(
      v =>
        v.customerDisplayName &&
        v.customerDisplayName
          .replace(/ /g, "")
          .toLowerCase()
          .includes(item) &&
        (v.readyToBuy != undefined || !v.readyToBuy) &&
        !v.problemBuying
    )
    var dataForRedOrder = Object.values(dict).filter(
      v =>
        v.customerDisplayName &&
        v.customerDisplayName
          .replace(/ /g, "")
          .toLowerCase()
          .includes(item) &&
        v.problemBuying
    )
    var dataForGreenOrder = Object.values(dict).filter(
      v =>
        v.customerDisplayName &&
        v.customerDisplayName
          .replace(/ /g, "")
          .toLowerCase()
          .includes(item) &&
        !v.problemBuying &&
        v.readyToBuy &&
        !v.currentlyTryingToBuy
    )
    totalCostForPurple = 0
    Object.values(dataForPurpleOrder).forEach(row => {
      if (row.unitCost && row.quantitySold) {
        totalCostForPurple =
          totalCostForPurple + Number(row.unitCost) * Number(row.quantitySold)
      }
    })
    costForPurpleOrder.push({ [item]: totalCostForPurple.toFixed(2) })
    totalCostForGreen = 0
    Object.values(dataForGreenOrder).forEach(row => {
      if (row.unitCost && row.quantitySold) {
        totalCostForGreen =
          totalCostForGreen + Number(row.unitCost) * Number(row.quantitySold)
      }
    })
    costForGreenOrder.push({ [item]: totalCostForGreen.toFixed(2) })

    totalCostForRed = 0
    Object.values(dataForRedOrder).forEach(row => {
      if (row.unitCost && row.quantitySold) {
        totalCostForRed =
          totalCostForRed + Number(row.unitCost) * Number(row.quantitySold)
      }
    })
    costForRedOrder.push({ [item]: totalCostForRed.toFixed(2) })
  })

  var redOrdersTotalCost = 0,
    greenOrdersTotalCost = 0,
    purpleOrdersTotalCost = 0

  Object.values(dict).forEach(row => {
    const { currentlyTryingToBuy, problemBuying, readyToBuy } = row
    if (problemBuying) {
      if (row.unitCost && row.quantitySold) {
        redOrdersTotalCost =
          redOrdersTotalCost + Number(row.unitCost) * row.quantitySold
      }
      redRows.push(row)
    } else if (readyToBuy != undefined && !readyToBuy) {
      purpleOrdersTotalCost =
        purpleOrdersTotalCost + Number(row.unitCost) * row.quantitySold
      purpleRows.push(row)
    } else if (currentlyTryingToBuy) {
      yellowRows.push(row)
    } else {
      greenOrdersTotalCost =
        greenOrdersTotalCost + Number(row.unitCost) * row.quantitySold
      greenRows.push(row)
    }
  })

  return {
    ids,
    dict,
    sortedRedListings: [...redRows],
    sortedOtherListings: [...greenRows, ...yellowRows, ...purpleRows],
    ordersCostCount: {
      redOrdersTotalCost: Number(redOrdersTotalCost).toFixed(2),
      purpleOrdersTotalCost: Number(purpleOrdersTotalCost).toFixed(2),
      greenOrdersTotalCost: Number(greenOrdersTotalCost).toFixed(2),
      costForPurpleOrder: costForPurpleOrder,
      costForRedOrder: costForRedOrder,
      costForGreenOrder: costForGreenOrder
    }
  }
}

//Open Sale Listings
const sortOverFlowListings = data => {
  const { ids, dict } = data
  const step2 = [],
    step3 = [],
    step4 = [],
    step1 = [],
    event = [],
    step2Sort = [],
    step3Sort = [],
    step4Sort = [],
    step1Sort = []

  Object.values(dict).forEach(row => {
    const {
      eventDate,
      readyToBuy,
      purchaseSuccessStatus,
      pdfTransferred,
      fulfillmentCompleted
    } = row
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate()
    var first = date.getDate() - date.getDay() + 1 // First day is the day of the month - the day of the week
    var last = first + 6
    var selected = new Date(eventDate).getDate()
    var month = new Date(eventDate).getMonth() + 1
    var year = new Date(eventDate).getFullYear()
    if (
      y == year &&
      m == month &&
      selected >= first &&
      selected <= last &&
      readyToBuy &&
      purchaseSuccessStatus &&
      pdfTransferred &&
      !fulfillmentCompleted
    ) {
      event.push(row)
    } else if (
      readyToBuy &&
      purchaseSuccessStatus &&
      pdfTransferred &&
      fulfillmentCompleted
    ) {
      step4.push(row)
    } else if (
      readyToBuy &&
      purchaseSuccessStatus &&
      pdfTransferred &&
      !fulfillmentCompleted
    ) {
      step3.push(row)
    } else if (
      readyToBuy &&
      purchaseSuccessStatus &&
      !pdfTransferred &&
      !fulfillmentCompleted
    ) {
      step2.push(row)
    } else {
      step1.push(row)
    }
  })

  const sortedStep2 = [...step2].sort(function compare(a, b) {
    var dateA = new Date(a.eventDate)
    var dateB = new Date(b.eventDate)
    return dateA - dateB
  })

  const sortedStep3 = [...step3].sort(function compare(a, b) {
    var dateA = new Date(a.eventDate)
    var dateB = new Date(b.eventDate)
    return dateA - dateB
  })

  const sortedStep4 = [...step4].sort(function compare(a, b) {
    var dateA = new Date(a.eventDate)
    var dateB = new Date(b.eventDate)
    return dateA - dateB
  })

  const sortedStep1 = [...step1].sort(function compare(a, b) {
    var dateA = new Date(a.eventDate)
    var dateB = new Date(b.eventDate)
    return dateA - dateB
  })

  Object.values(sortedStep2).forEach(row => {
    const { eventDate } = row
    step2Sort.push(row)
  })

  Object.values(sortedStep3).forEach(row => {
    const { eventDate } = row
    step3Sort.push(row)
  })

  Object.values(sortedStep4).forEach(row => {
    const { eventDate } = row
    step4Sort.push(row)
  })

  Object.values(sortedStep1).forEach(row => {
    step1Sort.push(row)
  })

  return {
    ids,
    dict,
    sortedOverFlowListings: [
      ...event,
      ...step2Sort,
      ...step3Sort,
      ...step1Sort,
      ...step4Sort
    ]
  }
}

function* fetchOpenSalesSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchOpenSales)
    // const { data: ok } = yield call(apiGlobal.fetchGlobals)

    yield put(
      actions.fetchOpenSalesSuccess(
        sortOpenSalesListings(formatOpenListings(data))
      )
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchOrderFlowSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchOrderFlow)
    yield put(
      actions.fetchOrderFlowSuccess(
        // sortfunction(formatOpenListings(data))
        sortOverFlowListings(formatOpenListings(data))
      )
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchCloakListingSaga(action) {
  const eventId = action.payload
  try {
    const { data } = yield call(api.getCloakListings, eventId)
    yield put(actions.fetchCloakListingSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

function* resetEmailPasswordSaga(action) {
  const emailid = action.payload.email
  const password = action.payload.password
  var venueId

  if (action.payload.venueId) {
    venueId = action.payload.venueId
    delete action.payload.venueId
  }

  try {
    yield put(appActions.resetPasswordStartFetching())
    const { data } = yield call(api.resetEmailPassword, { emailid, password })
    const { data: ok } = yield call(
      emailapi.updateEmailManagement,
      action.payload,
      venueId
    )
    ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Succeed updating Password!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something went wrong with updating Password!"
          })
        )
    yield put(fetchEmailManagementRequest())

    // yield put(actions.resetEmailPasswordSuccess(password))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
    yield put(appActions.resetPasswordStopFetching())
  }
}

function* fetchPDFAttachmentSaga(action) {
  const invoiceId = action.payload
  try {
    const { data } = yield call(api.fetchPDFAttachment, invoiceId)
    if (data) {
      yield put(actions.fetchPDFAttachmentSuccess(data))
    } else {
      yield put(actions.fetchPDFAttachmentSuccess(null))
    }
    // yield put(actions.fetchOrderFlowSuccess(formatOpenListings(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

function* fetchPDFDownloadedSaga(action) {
  const { listingId, orderNum } = action.payload
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchPDFDownloaded, listingId, orderNum)
    if (data) {
      yield put(
        appActions.appReceiveAlert({
          message: "Succeed in downloading PDf"
        })
      )
      yield put(actions.fetchPDFDownloadedSuccess(data))
      const { data } = yield call(api.fetchOrderFlow)
      yield put(
        actions.fetchOrderFlowSuccess(
          sortOverFlowListings(formatOpenListings(data))
        )
      )
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: " PDf is Not Available"
        })
      )
      yield put(actions.fetchPDFDownloadedSuccess(null))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

function* fetchEvenuePDFSaga(action) {
  const { orderNum } = action.payload
  try {
    yield put(appActions.resetPasswordStartFetching())
    const { data } = yield call(api.fetchEvenuePDF, action.payload)
    if (data) {
      yield put(actions.fetchEvenuePDFSuccess(data))
    } else {
      yield put(actions.fetchEvenuePDFSuccess(null))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.resetPasswordStopFetching())
  }
}

function* sendEmailSaga(action) {
  const emailTemplate = action.payload
  try {
    const { data } = yield call(api.sendEMail, emailTemplate)
    // yield put(actions.fetchOrderFlowSuccess(formatOpenListings(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

function* ticketPurchasedSaga(action) {
  const listingsIds = action.payload

  try {
    const { data: success } = yield call(api.ticketPurchased, listingsIds)

    if (success) {
      yield put(actions.fetchOpenListingsRequest())
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something wrong with ticket purchasing!"
        })
      )
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

const formatGlobalPromos = data => {
  var newPromos = []
  data.map(promos => {
    var newglobalPromoarray = {}
    newglobalPromoarray[promos.promoName] = promos.promoCode
    newPromos.push(newglobalPromoarray)
  })
  return newPromos
}

function* tryBuyAgainSaga(action) {
  try {
    const { listingId, eventId, venueId, marketType, locked } = action.payload
    if (venueId && venueId && marketType.toLowerCase() === "evenue") {
      const [dataEamil, dataEvent, dataPromos] = yield all([
        call(api.tryBuyAgain, listingId, venueId),
        call(eventsApi.fetchManagedEventsByQueryParam, eventId),
        call(promosapi.fetchPromos)
      ])
      const {
        data: {
          email,
          password,
          name,
          phoneNumber,
          address,
          capOne,
          amex,
          comdata,
          citi1,
          citi2
        }
      } = dataEamil
      const { data: managedEvent } = dataEvent
      // const { promos } = managedEvent[0] || {} //there might be no element in the array
      const { promos } = managedEvent || {}
      const { data } = dataPromos || {}
      if (email) {
        yield put(
          actions.tryBuyAgainSuccess({
            email,
            password,
            name,
            phoneNumber,
            address,
            capOne,
            amex,
            comdata,
            citi1,
            citi2,
            promos,
            venueId,
            locked,
            globalPromos: formatGlobalPromos(data)
          })
        )
      } else {
        yield put(
          actions.tryBuyAgainFail({
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
            address: "",
            capOne: "",
            amex: "",
            comdata: "",
            citi1: "",
            citi2: "",
            promos: "",
            venueId: "",
            locked: "",
            globalPromos: ""
          })
        )
        yield put(
          appActions.appReceiveAlert({ message: "No available email!" })
        )
      }
    } else {
      const [dataEamil, dataEvent, dataPromos] = yield all([
        call(api.tryBuyAgain, listingId),
        call(eventsApi.fetchManagedEventsByQueryParam, eventId),
        call(promosapi.fetchPromos)
      ])
      const {
        data: { email, password, capOne, amex, comdata, citi1, citi2 }
      } = dataEamil
      const { data: managedEvent } = dataEvent
      //const { promos } = managedEvent[0] || {} //there might be no element in the array
      const { promos } = managedEvent || {} //there might be no element in the array
      const { data } = dataPromos || {}
      if (email) {
        yield put(
          actions.tryBuyAgainSuccess({
            email,
            password,
            capOne,
            amex,
            comdata,
            citi1,
            citi2,
            promos,
            locked,
            globalPromos: formatGlobalPromos(data)
          })
        )
      } else {
        yield put(
          actions.tryBuyAgainFail({
            email: "",
            password: "",
            capOne: "",
            amex: "",
            comdata: "",
            citi1: "",
            citi2: "",
            promos: "",
            locked: "",
            globalPromos: ""
          })
        )
        yield put(
          appActions.appReceiveAlert({ message: "No available email!" })
        )
      }
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* doneBuyingSaga(action) {
  try {
    const {
      listingId,
      orderNum,
      secondaryMarketOrderNum,
      secondaryMarketLocation,
      // emailOption,
      // problemNotes
      purchaseRow,
      purchaseSection,
      isPurchaseSecRow
    } = action.payload
    const {
      data: { success }
    } = yield call(
      api.doneBuying,
      listingId,
      orderNum,
      secondaryMarketOrderNum,
      secondaryMarketLocation,
      purchaseRow,
      purchaseSection,
      isPurchaseSecRow
      // emailOption,
      // problemNotes
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* fetchUserSummarySaga(action) {
  try {
    const eventId = action.payload

    const { data } = yield call(api.fetchUserSummary, eventId)

    if (Object.values(data).length) {
      yield put(actions.fetchUserSummarySuccess(data))
    } else {
      yield put(
        appActions.appReceiveAlert({ message: "No summary available!" })
      )
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* problemBuyingSaga(action) {
  try {
    const { listingId, reason, problemNotes } = action.payload
    if (reason === "") {
      yield put(appActions.appReceiveError({ message: "Please Select Reason" }))
    } else {
      const {
        data: { success }
      } = yield call(api.problemBuying, listingId, reason, problemNotes)
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

//Open Transfer Listings
function* fetchOpenTransfersSaga() {
  try {
    yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchOpenTransfer)
    yield put(actions.fetchOpenTransfersSuccess(formatOpenListings(data)))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    yield put(appActions.appStopFetching())
  }
}

//complete order
function* deleteOpenListingsSaga(action) {
  const listingsIds = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.deleteOpenListings, listingsIds)

    if (success) {
      yield put(actions.fetchOrderFlowRequest())
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something wrong with completing order!"
        })
      )
    }
  } catch (error) {
    yield put(actions.deleteOpenListingsFail(error))
  } finally {
  }
}

function* manualTransferSaga(action) {
  try {
    const { listingId, cloakListing } = action.payload

    yield call(api.mannualTransfer, listingId, cloakListing)
  } catch (error) {
    yield put(appActions.appReceiveAlert(error))
  } finally {
  }
}

const formatUpcomingOpenOrders = data => {
  if (!data.hasOwnProperty("openOrders")) {
    return {
      ids: [],
      dict: {}
    }
  }

  return data["openOrders"].reduce(
    (accu, order) => {
      const {
        event: {
          name: eventName,
          date: eventDate,
          venue: { timeZone }
        },
        quantity,
        section,
        row,
        invoiceId,
        notes
      } = order

      accu.ids.push(invoiceId)
      accu.dict[invoiceId] = {
        invoiceId: `https://skybox.vividseats.com/invoices/${invoiceId}`,
        eventName,
        eventDate,
        formattedEventDate: dateFormatterWithTZ(eventDate)(),
        quantity,
        section,
        row,
        notes,
        timeZone
      }

      return accu
    },
    {
      ids: [],
      dict: {}
    }
  )
}

const formatCancelListing = data => {
  if (!data) {
    return []
  }

  return data.map(({ _id }) => _id)
}

//Upcoming open orders
function* fetchUpcomingOpenOrdersSaga() {
  try {
    const { data } = yield call(api.fetchUpcomingOpenOrders)
    yield put(
      actions.fetchUpcomingOpenOrdersSuccess(formatUpcomingOpenOrders(data))
    )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

// Cancel Listing Operations
function* cancelAllListingSaga(action) {
  const eventIds = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.cancelAllListings, eventIds)

    if (success) {
      // yield put(actions.fetchOpenListingsRequest())
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something wrong with completing order!"
        })
      )
    }
  } catch (error) {
    // yield put(actions.deleteOpenListingsFail(error))
  } finally {
  }
}

// Simulate Listing Operations
function* simulateSoldListingSaga(action) {
  const eventIds = action.payload

  try {
    const {
      data: { success }
    } = yield call(api.simulateSoldListing, eventIds)

    if (success) {
      // yield put(actions.fetchOpenListingsRequest())
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something wrong with completing order!"
        })
      )
    }
  } catch (error) {
    // yield put(actions.deleteOpenListingsFail(error))
  } finally {
  }
}

function* cancelListingByPriceSaga(action) {
  const trackListingIds = action.payload

  try {
    const {
      data: { success }
    } = yield call(
      api.cancelListingsByIds,
      formatCancelListing(trackListingIds)
    )

    if (success) {
      // yield put(actions.fetchOpenListingsRequest())
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: "Something wrong with completing order!"
        })
      )
    }
  } catch (error) {
    // yield put(actions.deleteOpenListingsFail(error))
  } finally {
  }
}

function* fetchSoldStatisticsSaga(action) {
  try {
    const { startDate, endDate } = action.payload
    // yield put(appActions.appStartFetching())
    const { data } = yield call(api.fetchSoldStatisticsLog, startDate, endDate)
    yield put(actions.fetchSoldStatisticsSuccess(data))
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
    // yield put(appActions.appStopFetching())
  }
}

function* updateEventTmOrderNumber(action) {
  const { listingId, orderNum, orderNotes } = action.payload
  try {
    const { data } = yield call(
      api.updateEventTmOrderNumber,
      listingId,
      orderNum,
      orderNotes
    )
    data.ok
      ? yield put(
          appActions.appReceiveAlert({
            message: "Order Succesfully updated!"
          })
        )
      : yield put(
          appActions.appReceiveAlert({
            message: "Something wrong with completing order!"
          })
        )
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  } finally {
  }
}

function* fetchOrderFullFillMentSaga(action) {
  const { customerDisplayName, externalReference } = action.payload
  try {
    // yield put(appActions.appStartFetching())
    const { data } = yield call(
      api.fetchOrderFullFillment,
      customerDisplayName,
      externalReference
    )
    if (data) {
      yield put(
        appActions.appReceiveAlert({
          message: "Order is Ready for fullFillment"
        })
      )
      yield put(actions.fetchOrderfullfillmentSuccess(data))
      const { data } = yield call(api.fetchOrderFlow)
      yield put(
        actions.fetchOrderFlowSuccess(
          sortOverFlowListings(formatOpenListings(data))
        )
      )
    } else {
      yield put(
        appActions.appReceiveAlert({
          message: " Order is not yet Ready for fullFillment"
        })
      )
      yield put(actions.fetchOrderfullfillmentSuccess(null))
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
    // yield put(appActions.appReceiveAlert(error))
  } finally {
    // yield put(appActions.appStopFetching())
  }
}

function* watchListingSaga() {
  yield takeLatest(
    actions.FETCH_SOLD_STATISTICS_REQUEST,
    fetchSoldStatisticsSaga
  )

  yield takeEvery(actions.PUBLISH_LISTING_REQUEST, publishListingSaga)

  //Event Listings
  yield takeLatest(actions.FETCH_VALID_LISTINGS_REQUEST, fetchValidListingsSaga)

  yield takeLatest(
    actions.FETCH_VALID_LISTINGS_WITH_SPREAD_REQUEST,
    fetchValidListingsWithSpreadSaga
  )

  yield takeLatest(
    actions.FETCH_TRACKED_LISTINGS_REQUEST,
    fetchTrackedListingsSaga
  )

  yield takeLatest(actions.FETCH_SOLD_LISTINGS_REQUEST, fetchSoldListingsSaga)

  //Open Sale Listings
  yield takeLatest(actions.FETCH_OPEN_SALES_REQUEST, fetchOpenSalesSaga)

  yield takeEvery(actions.FETCH_USER_SUMMARY_REQUEST, fetchUserSummarySaga)

  yield takeEvery(actions.TRY_BUY_AGAIN_REQUEST, tryBuyAgainSaga)

  yield takeEvery(actions.DONE_BUYING_REQUEST, doneBuyingSaga)

  yield takeEvery(actions.TICKET_PURCHASED_REQUEST, ticketPurchasedSaga)

  yield takeEvery(actions.PROBLEM_BUYING_REQUEST, problemBuyingSaga)

  //Open Transfer Listings
  yield takeLatest(actions.FETCH_OPEN_TRANSFERS_REQUEST, fetchOpenTransfersSaga)

  yield takeEvery(actions.MANUAL_TRANSFER_REQUEST, manualTransferSaga)

  yield takeEvery(actions.DELETE_OPEN_LISTINGS_REQUEST, deleteOpenListingsSaga)

  // Cancel Operations For Listing By Price

  yield takeEvery(actions.CANCEL_ALL_LISTING_REQUEST, cancelAllListingSaga)

  yield takeEvery(actions.CANCEL_LISTING_BY_PRICE, cancelListingByPriceSaga)

  //Problem Buying Listings
  yield takeEvery(
    actions.FETCH_UPCOMING_OPEN_ORDERS_REQUEST,
    fetchUpcomingOpenOrdersSaga
  )

  //Open Listings
  yield takeLatest(actions.FETCH_OPEN_LISTINGS_REQUEST, fetchOpenListingsSaga)

  //Simulate Fetch Tracked Listing For testing on dev env
  yield takeEvery(
    actions.FETCH_SIMULATE_TRACKED_LISTING_REQUEST,
    fetchSimulateTrackedListingSaga
  )

  yield takeLatest(
    actions.SIMULATE_SOLD_LISTING_REQUEST,
    simulateSoldListingSaga
  )

  //order flow Listings
  yield takeEvery(actions.FETCH_ORDER_FLOW_REQUEST, fetchOrderFlowSaga)

  yield takeLatest(actions.FETCH_PDF_ATTACHMENT_REQUEST, fetchPDFAttachmentSaga)

  yield takeLatest(actions.FETCH_EVENUE_PDF_REQUEST, fetchEvenuePDFSaga)

  yield takeLatest(actions.FETCH_PDF_DOWNLOADED_REQUEST, fetchPDFDownloadedSaga)

  yield takeLatest(
    actions.FETCH_ORDER_FULLFILLMENT_REQUEST,
    fetchOrderFullFillMentSaga
  )

  yield takeEvery(actions.SEND_EMAIL_REQUEST, sendEmailSaga)

  yield takeEvery(actions.FETCH_CLOAK_LISTING_REQUEST, fetchCloakListingSaga)

  yield takeEvery(actions.RESET_EMAIL_PASSWORD_REQUEST, resetEmailPasswordSaga)

  yield takeEvery(actions.updateEventTmOrderNumber, updateEventTmOrderNumber)
}

export default watchListingSaga
