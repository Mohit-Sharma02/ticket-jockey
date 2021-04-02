import { connect } from "react-redux"

import {
  getHasLoggedIn,
  getIsBroadcasting,
  getIsFetching,
  getIsResetPasswordFetching,
  getOpenTransfersListings,
  getOpenSalesListings,
  getPurchasedTicketInfo,
  getUpcomingOpenOrders,
  getSimulateTrackedListing,
  getOrderFlowListings,
  getPDFAttachment,
  getGlobalConfigs,
  getCloakListings,
  getSoldStatisticsLog,
  getPDFDownloaded,
  getUserInfo,
  getClockTimer,
  getOrderFullFillMent,
  getEvenuePDF
} from "../../reducers"
import {
  fetchBoradcastingStatus,
  setBoardCastingStatus,
  broadcastListingRequest,
  unBroadcastListingRequest
} from "../../actions/config"
import {
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  tryBuyAgainRequest,
  manualTransferRequest,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  doneBuyingRequest,
  problemBuyingRequest,
  fetchUpcomingOpenOrdersRequest,
  fetchOpenListingsRequest,
  fetchSimulateTrackedListingsRequest,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  fetchPDFAttachmentRequest,
  sendEmailRequest,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  fetchPDFDownlaodedRequest,
  updateEventTmOrderNumber,
  fetchOrderfullfillmentRequest,
  fetchEvenuePDFRequest
} from "../../actions/listings"
import { fetchGlobalConfigRequest } from "../../actions/globalConfig"
import Dashboard from "./Dashboard"
import { saveSelectEvent, clearSelectEvent } from "../../actions/tickets"
import { appReceiveAlert } from "../../actions/app"
import {
  fetchClockTimerRequest,
  createTimerRequest
} from "../../actions/clockTime"

// import { getEvenuePDF } from "../../reducers/listings"

const mapStateToProps = state => ({
  hasLoggedIn: getHasLoggedIn(state),
  isBroadcasting: getIsBroadcasting(state),
  isFetching: getIsFetching(state),
  isResetPasswordFetching: getIsResetPasswordFetching(state),
  openSaleslistings: getOpenSalesListings(state),
  openTransferslistings: getOpenTransfersListings(state),
  upcomingOpenOrders: getUpcomingOpenOrders(state),
  purchasedTicketInfo: getPurchasedTicketInfo(state),
  trackedListings: getSimulateTrackedListing(state),
  orderFlowListings: getOrderFlowListings(state),
  pdfAttachment: getPDFAttachment(state),
  pdfDownloaded: getPDFDownloaded(state),
  globals: getGlobalConfigs(state),
  cloakListings: getCloakListings(state),
  soldStatisticsLog: getSoldStatisticsLog(state),
  userInfo: getUserInfo(state),
  clockTimerList: getClockTimer(state),
  fullfillOrder: getOrderFullFillMent(state),
  evenuePDf: getEvenuePDF(state)
})

const DashboardContainer = connect(mapStateToProps, {
  fetchBoradcastingStatus,
  setBoardCastingStatus,
  broadcastListingRequest,
  unBroadcastListingRequest,
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  tryBuyAgainRequest,
  manualTransferRequest,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  problemBuyingRequest,
  doneBuyingRequest,
  fetchUpcomingOpenOrdersRequest,
  fetchOpenListingsRequest,
  fetchSimulateTrackedListingsRequest,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  fetchPDFAttachmentRequest,
  sendEmailRequest,
  fetchGlobalConfigRequest,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  fetchPDFDownlaodedRequest,
  saveSelectEvent,
  appReceiveAlert,
  updateEventTmOrderNumber,
  fetchClockTimerRequest,
  createTimerRequest,
  fetchOrderfullfillmentRequest,
  fetchEvenuePDFRequest
})(Dashboard)

export default DashboardContainer
