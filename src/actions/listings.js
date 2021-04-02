import { createAction } from "redux-actions"

export const PUBLISH_LISTING_REQUEST = "PUBLISH_LISTING_REQUEST"
export const PUBLISH_LISTING_FAILURE = "PUBLISH_LISTING_FAILURE"
export const PUBLISH_LISTING_SUCCESS = "PUBLISH_LISTING_SUCCESS"

export const publishListingRequest = createAction(PUBLISH_LISTING_REQUEST)
export const publishListingFailure = createAction(PUBLISH_LISTING_FAILURE)
export const publishListingSuccess = createAction(PUBLISH_LISTING_SUCCESS)

//Valid Listing applied by rules of engine
export const FETCH_VALID_LISTINGS_REQUEST = "FETCH_VALID_LISTINGS_REQUEST"
export const FETCH_VALID_LISTINGS_SUCCESS = "FETCH_VALID_LISTINGS_SUCCESS"
export const FETCH_VALID_LISTINGS_FAILURE = "FETCH_VALID_LISTINGS_FAILURE"
export const fetchValidListingsRequest = createAction(
  FETCH_VALID_LISTINGS_REQUEST
)
export const fetchValidListingsSuccess = createAction(
  FETCH_VALID_LISTINGS_SUCCESS
)
export const fetchValidListingsFailure = createAction(
  FETCH_VALID_LISTINGS_FAILURE
)

export const FETCH_VALID_LISTINGS_WITH_SPREAD_REQUEST =
  "FETCH_VALID_LISTINGS_WITH_SPREAD_REQUEST"
export const fetchValidListingsWithSpreadRequest = createAction(
  FETCH_VALID_LISTINGS_WITH_SPREAD_REQUEST
)

//Track listings
export const FETCH_TRACKED_LISTINGS_REQUEST = "FETCH_TRACKED_LISTINGS_REQUEST"
export const FETCH_TRACKED_LISTINGS_SUCCESS = "FETCH_TRACKED_LISTINGS_SUCCESS"
export const fetchTrackedListingsRequest = createAction(
  FETCH_TRACKED_LISTINGS_REQUEST
)
export const fetchTrackedListingsSuccess = createAction(
  FETCH_TRACKED_LISTINGS_SUCCESS
)

export const FETCH_SOLD_LISTINGS_REQUEST = "FETCH_SOLD_LISTINGS_REQUEST"
export const FETCH_SOLD_LISTINGS_SUCCESS = "FETCH_SOLD_LISTINGS_SUCCESS"

export const fetchSoldListingsRequest = createAction(
  FETCH_SOLD_LISTINGS_REQUEST
)
export const fetchSoldListingsSuccess = createAction(
  FETCH_SOLD_LISTINGS_SUCCESS
)

//Open Sale listings
export const FETCH_OPEN_SALES_REQUEST = "FETCH_OPEN_SALES_REQUEST"
export const fetchOpenSalesRequest = createAction(FETCH_OPEN_SALES_REQUEST)

export const FETCH_OPEN_SALES_SUCCESS = "FETCH_OPEN_SALES_SUCCESS"
export const fetchOpenSalesSuccess = createAction(FETCH_OPEN_SALES_SUCCESS)

export const CLEAR_OPEN_SALES_LISTINGS = "CLEAR_OPEN_SALES_LISTINGS"
export const clearOpenSalesListings = createAction(CLEAR_OPEN_SALES_LISTINGS)

export const TICKET_PURCHASED_REQUEST = "TICKET_PURCHASED_REQUEST"
export const ticketPurchasedRequest = createAction(TICKET_PURCHASED_REQUEST)

export const TRY_BUY_AGAIN_REQUEST = "TRY_BUY_AGAIN_REQUEST" //Buy Ticket button
export const tryBuyAgainRequest = createAction(TRY_BUY_AGAIN_REQUEST)
export const TRY_BUY_AGAIN_SUCCESS = "TRY_BUY_AGAIN_SUCCESS"
export const tryBuyAgainSuccess = createAction(TRY_BUY_AGAIN_SUCCESS)
export const TRY_BUY_AGAIN_FAIL = "TRY_BUY_AGAIN_FAIL"
export const tryBuyAgainFail = createAction(TRY_BUY_AGAIN_FAIL)

export const FETCH_USER_SUMMARY_REQUEST = "FETCH_USER_SUMMARY_REQUEST"
export const fetchUserSummaryRequest = createAction(FETCH_USER_SUMMARY_REQUEST)
export const FETCH_USER_SUMMARY_SUCCESS = "FETCH_USER_SUMMARY_SUCCESS"
export const fetchUserSummarySuccess = createAction(FETCH_USER_SUMMARY_SUCCESS)

export const DONE_BUYING_REQUEST = "DONE_BUYING_REQUEST" //popup done button
export const doneBuyingRequest = createAction(DONE_BUYING_REQUEST)

export const PROBLEM_BUYING_REQUEST = "PROBLEM_BUYING_REQUEST" //popup problem button
export const problemBuyingRequest = createAction(PROBLEM_BUYING_REQUEST)

export const RESET_PURCHASED_TICKET_INFO = "RESET_PURCHASED_TICKET_INFO" //popup select event
export const resetPurchasedTicketInfo = createAction(
  RESET_PURCHASED_TICKET_INFO
)

//Open Transfer Listings
export const FETCH_OPEN_TRANSFERS_REQUEST = "FETCH_OPEN_TRANSFERS_REQUEST"
export const fetchOpenTransfersRequest = createAction(
  FETCH_OPEN_TRANSFERS_REQUEST
)
export const FETCH_OPEN_TRANSFERS_SUCCESS = "FETCH_OPEN_TRANSFERS_SUCCESS"
export const fetchOpenTransfersSuccess = createAction(
  FETCH_OPEN_TRANSFERS_SUCCESS
)
export const CLEAR_OPEN_TRANSFER_LISTINGS = "CLEAR_OPEN_TRANSFER_LISTINGS"
export const clearOpenTransferListings = createAction(
  CLEAR_OPEN_TRANSFER_LISTINGS
)

export const MANUAL_TRANSFER_REQUEST = "MANUAL_TRANSFER"
export const manualTransferRequest = createAction(MANUAL_TRANSFER_REQUEST)

export const DELETE_OPEN_LISTINGS_REQUEST = "DELETE_OPEN_LISTINGS_REQUEST" //complete order button
export const deleteOpenListingsRequest = createAction(
  DELETE_OPEN_LISTINGS_REQUEST
)
export const DELETE_OPEN_LISTINGS_SUCCESS = "DELETE_OPEN_LISTINGS_SUCCESS"
export const deleteOpenListingsSuccess = createAction(
  DELETE_OPEN_LISTINGS_SUCCESS
)
export const DELETE_OEPN_LISTINGS_FAIL = "DELETE_OEPN_LISTINGS_FAIL"
export const deleteOpenListingsFail = createAction(DELETE_OEPN_LISTINGS_FAIL)

//Open Listings
export const FETCH_OPEN_LISTINGS_REQUEST = "FETCH_OPEN_LISTINGS_REQUEST" //for both openSalesListings and openTransferListings
export const fetchOpenListingsRequest = createAction(
  FETCH_OPEN_LISTINGS_REQUEST
)

//Upcoming open orders
export const FETCH_UPCOMING_OPEN_ORDERS_REQUEST =
  "FETCH_UPCOMING_OPEN_ORDERS_REQUEST"
export const fetchUpcomingOpenOrdersRequest = createAction(
  FETCH_UPCOMING_OPEN_ORDERS_REQUEST
)
export const FETCH_UPCOMING_OPEN_ORDERS_SUCCESS =
  "FETCH_UPCOMING_OPEN_ORDERS_SUCCESS"
export const fetchUpcomingOpenOrdersSuccess = createAction(
  FETCH_UPCOMING_OPEN_ORDERS_SUCCESS
)

//listings operation
export const DELETE_LISTING = "DELETE_LISTING"
export const deleteListing = createAction(DELETE_LISTING)

export const CANCEL_ALL_LISTING_REQUEST = "CANCEL_ALL_LISTING_REQUEST"
export const cancelAllListingRequest = createAction(CANCEL_ALL_LISTING_REQUEST)

export const CANCEL_LISTING_BY_PRICE = "CANCEL_LISTING_BY_PRICE"
export const cancelListingByPrice = createAction(CANCEL_LISTING_BY_PRICE)

// Track listing for all event (Simulate Request)

export const FETCH_SIMULATE_TRACKED_LISTING_REQUEST =
  "FETCH_SIMULATE_TRACKED_LISTING_REQUEST"
export const fetchSimulateTrackedListingsRequest = createAction(
  FETCH_SIMULATE_TRACKED_LISTING_REQUEST
)

export const FETCH_SIMULATE_TRACKED_LISTING_SUCCESS =
  "FETCH_SIMULATE_TRACKED_LISTING_SUCCESS"
export const fetchSimulateTrackedListingsSuccess = createAction(
  FETCH_SIMULATE_TRACKED_LISTING_SUCCESS
)

export const SIMULATE_SOLD_LISTING_REQUEST = "SIMULATE_SOLD_LISTING_REQUEST"
export const simulateSoldListingRequest = createAction(
  SIMULATE_SOLD_LISTING_REQUEST
)

export const FETCH_ORDER_FLOW_REQUEST = "FETCH_ORDER_FLOW_REQUEST"
export const fetchOrderFlowRequest = createAction(FETCH_ORDER_FLOW_REQUEST)

export const FETCH_ORDER_FLOW_SUCCESS = "FETCH_ORDER_FLOW_SUCCESS"
export const fetchOrderFlowSuccess = createAction(FETCH_ORDER_FLOW_SUCCESS)

export const FETCH_PDF_ATTACHMENT_REQUEST = "FETCH_PDF_ATTACHMENT_REQUEST"
export const fetchPDFAttachmentRequest = createAction(
  FETCH_PDF_ATTACHMENT_REQUEST
)

export const FETCH_EVENUE_PDF_REQUEST = "FETCH_EVENUE_PDF_REQUEST"
export const fetchEvenuePDFRequest = createAction(FETCH_EVENUE_PDF_REQUEST)

export const FETCH_PDF_ATTACHMENT_SUCCESS = "FETCH_PDF_ATTACHMENT_SUCCESS"
export const fetchPDFAttachmentSuccess = createAction(
  FETCH_PDF_ATTACHMENT_SUCCESS
)

export const FETCH_EVENUE_PDF_SUCCESS = "FETCH_EVENUE_PDF_SUCCESS"
export const fetchEvenuePDFSuccess = createAction(FETCH_EVENUE_PDF_SUCCESS)

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST"
export const sendEmailRequest = createAction(SEND_EMAIL_REQUEST)

export const FETCH_CLOAK_LISTING_REQUEST = "FETCH_CLOAK_LISTING_REQUEST"
export const fetchCloakListingRequest = createAction(
  FETCH_CLOAK_LISTING_REQUEST
)

export const FETCH_CLOAK_LISTING_SUCCESS = "FETCH_CLOAK_LISTING_SUCCESS"
export const fetchCloakListingSuccess = createAction(
  FETCH_CLOAK_LISTING_SUCCESS
)

// For Statistics

export const FETCH_SOLD_STATISTICS_REQUEST = "FETCH_SOLD_STATICTIS_REQUEST"
export const fetchSoldStatisticsRequest = createAction(
  FETCH_SOLD_STATISTICS_REQUEST
)

export const FETCH_SOLD_STATISTICS_SUCCESS = "FETCH_SOLD_STATISTICS_SUCCESS"
export const fetchSoldStatisticsSuccess = createAction(
  FETCH_SOLD_STATISTICS_SUCCESS
)

// For Reset Email Password
export const RESET_EMAIL_PASSWORD_REQUEST = "RESET_EMAIL_PASSWORD_REQUEST"
export const resetEmailPasswordRequest = createAction(
  RESET_EMAIL_PASSWORD_REQUEST
)

export const RESET_EMAIL_PASSWORD_SUCCESS = "RESET_EMAIL_PASSWORD_SUCCESS"
export const resetEmailPasswordSuccess = createAction(
  RESET_EMAIL_PASSWORD_SUCCESS
)

// For downLoading PDF of overFlowTable
export const FETCH_PDF_DOWNLOADED_REQUEST = "FETCH_PDF_DOWNLOADED_REQUEST"
export const fetchPDFDownlaodedRequest = createAction(
  FETCH_PDF_DOWNLOADED_REQUEST
)

export const FETCH_PDF_DOWNLOADED_SUCCESS = "FETCH_PDF_DOWNLOADED_SUCCESS"
export const fetchPDFDownloadedSuccess = createAction(
  FETCH_PDF_DOWNLOADED_SUCCESS
)

// For order Fullfillment
export const FETCH_ORDER_FULLFILLMENT_REQUEST =
  "FETCH_ORDER_FULLFILLMENT_REQUEST"
export const fetchOrderfullfillmentRequest = createAction(
  FETCH_ORDER_FULLFILLMENT_REQUEST
)

export const FETCH_ORDER_FULLFILLMENT_SUCCESS =
  "FETCH_ORDER_FULLFILLMENT_SUCCESS"
export const fetchOrderfullfillmentSuccess = createAction(
  FETCH_ORDER_FULLFILLMENT_SUCCESS
)

//For Updating Tm order_Number
export const UPDATE_TM_ORDER_NUMBER_REQUEST = "UPDATE_TM_ORDER_NUMBER_REQUEST"
export const updateEventTmOrderNumber = createAction(
  UPDATE_TM_ORDER_NUMBER_REQUEST
)
