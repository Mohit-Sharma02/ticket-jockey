import * as actions from "../actions/listings"

const initialState = {
  email: "",
  eventInfo: {},
  userPurchaseSummary: {},
  pdfAttachement: null,
  pdfDownloaded: null,
  orderFullFillMent: {},
  evenuePdf: null
}

const initialListing = {
  ids: [],
  dict: {},
  ordersCostCount: {
    redOrdersTotalCost: 0,
    purpleOrdersTotalCost: 0,
    greenOrdersTotalCost: 0,
    costForPurpleOrder: [],
    costForRedOrder: [],
    costForGreenOrder: []
  }
}

const listings = (
  state = {
    openSaleslistings: initialListing,
    openTransferslistings: initialListing,
    upcomingOpenOrders: initialListing,
    purchasedTicketInfo: initialState,
    orderFlowListing: initialListing,
    trackedListing: [],
    cloakListing: [],
    soldStatisticsLogs: {
      soldList: [],
      totalOrders: 0,
      totalProfit: 0,
      totalSales: 0,
      totalTicketsSold: 0,
      averageProfitMargin: 0
    }
  },
  action
) => {
  switch (action.type) {
    case actions.FETCH_OPEN_SALES_SUCCESS:
      return { ...state, openSaleslistings: action.payload }
    case actions.CLEAR_OPEN_SALES_LISTINGS:
      return { ...state, openSaleslistings: initialListing }
    case actions.FETCH_OPEN_TRANSFERS_SUCCESS:
      return { ...state, openTransferslistings: action.payload }
    case actions.CLEAR_OPEN_TRANSFER_LISTINGS:
      return { ...state, openTransferslistings: initialListing }
    case actions.FETCH_UPCOMING_OPEN_ORDERS_SUCCESS:
      return { ...state, upcomingOpenOrders: action.payload }
    case actions.FETCH_SIMULATE_TRACKED_LISTING_SUCCESS:
      return { ...state, trackedListing: action.payload }
    case actions.FETCH_ORDER_FLOW_SUCCESS:
      return { ...state, orderFlowListing: action.payload }
    case actions.FETCH_PDF_ATTACHMENT_SUCCESS:
      return { ...state, pdfAttachement: action.payload }
    case actions.FETCH_EVENUE_PDF_SUCCESS:
      return { ...state, evenuePdf: action.payload }
    case actions.FETCH_PDF_DOWNLOADED_SUCCESS:
      return { ...state, pdfDownloaded: action.payload }
    case actions.FETCH_ORDER_FULLFILLMENT_SUCCESS:
      return { ...state, orderFullFillMent: action.payload }
    case actions.FETCH_CLOAK_LISTING_SUCCESS:
      return { ...state, cloakListing: action.payload }
    case actions.TRY_BUY_AGAIN_REQUEST:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          eventInfo: action.payload
        }
      }
    case actions.FETCH_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          userPurchaseSummary: action.payload
        }
      }
    // case actions.RESET_EMAIL_PASSWORD_SUCCESS:
    // return {
    //   ...state,

    // }
    case actions.TRY_BUY_AGAIN_SUCCESS:
    case actions.TRY_BUY_AGAIN_FAIL:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          email: action.payload.email,
          password: action.payload.password,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          name: action.payload.name,
          capOne: action.payload.capOne,
          amex: action.payload.amex,
          comdata: action.payload.comdata,
          citi1: action.payload.citi1,
          citi2: action.payload.citi2,
          eventInfo: {
            ...state.purchasedTicketInfo.eventInfo,
            promos: action.payload.promos
          },
          locked: action.payload.locked,
          globalPromos: action.payload.globalPromos
        }
      }
    case actions.RESET_PURCHASED_TICKET_INFO:
      return { ...state, purchasedTicketInfo: initialState }

    case actions.FETCH_SOLD_STATISTICS_SUCCESS:
      return {
        ...state,
        soldStatisticsLogs: action.payload
      }
    default:
      return state
  }
}

export default listings

export const getOpenSalesListings = state => state.openSaleslistings
export const getOpenTransfersListings = state => state.openTransferslistings
export const getUpcomingOpenOrders = state => state.upcomingOpenOrders
export const getPurchasedTicketInfo = state => state.purchasedTicketInfo
export const getSimulateTrackedListing = state => state.trackedListing
export const getOrderFlowListings = state => state.orderFlowListing
export const getPDFAttachment = state => state.pdfAttachement
export const getPDFDownloaded = state => state.pdfDownloaded
export const getCloakListings = state => state.cloakListing
export const getSoldStatisticsLog = state => state.soldStatisticsLogs
export const getOrderFullFillMent = state => state.orderFullFillMent
export const getEvenuePDF = state => state.evenuePdf
