import { combineReducers } from "redux"

import user, * as fromUser from "./user"
import app, * as fromApp from "./app"
import events, * as fromEvents from "./events"
import tickets, * as fromTickets from "./tickets"
import venues, * as fromVenues from "./venues"
import config, * as fromConfig from "./config"
import listings, * as fromListings from "./listings"
import promos, * as fromPromos from "./promos"
import globals, * as fromGlobal from "./globals"
import logs, * as fromLogs from "./logs"
import orders, * as fromOrders from "./orderStatus"
import eVenues, * as fromEVenues from "./eVenue"
import emailManagement, * as fromEmailManagement from "./emailManagement"
import eventStatistic, * as fromEventStatistic from "./eventStatistic"
import clockTimers, * as fromClockTimer from "./clockTimer"
import axsVenues, * as fromAxsVenues from "./axsVenues"
const rootReducer = combineReducers({
  app,
  config,
  user,
  events,
  tickets,
  venues,
  listings,
  promos,
  globals,
  logs,
  orders,
  eVenues,
  emailManagement,
  eventStatistic,
  clockTimers,
  axsVenues
})

export default rootReducer

//app
export const getIsBlackListFetching = state =>
  fromApp.getIsBlackListFetching(state.app)
export const getIsAddBlackListFetching = state =>
  fromApp.getIsAddBlackListFetching(state.app)
export const getIsEventFetching = state => fromApp.getIsEventFetching(state.app)
export const getIsFetching = state => fromApp.getIsFetching(state.app)
export const getErrorMsg = state => fromApp.getErrorMsg(state.app)
export const getAlertMsg = state => fromApp.getAlertMsg(state.app)
export const getWebSocket = state => fromApp.getWebSocket(state.app)
export const getIsResetPasswordFetching = state =>
  fromApp.getIsResetPasswordFetching(state.app)

export const getIsUpdateProfileFetching = state =>
  fromApp.getIsUpdateProfileFetching(state.app)

export const getIsBroadcasting = state =>
  fromConfig.getIsBroadcasting(state.config)

export const getHasLoggedIn = state => fromUser.getHasLoggedIn(state.user)
export const getUserInfo = state => fromUser.getUserInfo(state.user)
export const getUserProfileInfo = state =>
  fromUser.getUserProfileInfo(state.user)
export const getAccessToken = state => fromUser.getAccessToken(state.user)

export const getSearchEvents = state => fromEvents.getSearchEvents(state.events)
export const getSkyBoxVenueId = state =>
  fromEvents.getSkyBoxVenueId(state.events)
export const getTMasterVenueId = state =>
  fromEvents.getTMasterVenueId(state.events)
export const getSearchEventsTotalNum = state =>
  fromEvents.getSearchEventsTotalNum(state.events)
export const getSearchEventsFilters = state =>
  fromEvents.getSearchEventsFilters(state.events)
export const getSearchEventsByFilters = state =>
  fromEvents.getSearchEventsByFilters(state.events)
export const getManagedEvents = state =>
  fromEvents.getManagedEvents(state.events)
export const getManagedEventById = state =>
  fromEvents.getManagedEventById(state.events)
export const getManagedEventsQueue = state =>
  fromEvents.getManagedEventsQueue(state.events)
export const getManagedSkyBoxEventsDup = state =>
  fromEvents.getManagedSkyBoxEventsDup(state.events)
export const getNoSkyboxEvents = state =>
  fromEvents.getNoSkyboxEvents(state.events)

export const getManagedVenues = state =>
  fromVenues.getManagedVenues(state.venues)

export const getSearchVenueData = state =>
  fromVenues.getSearchVenueData(state.venues)

export const getSkyBoxVenuesDup = state =>
  fromVenues.getSkyBoxVenuesDup(state.venues)

export const getTicketsSummary = state =>
  fromTickets.getTicketsSummary(state.tickets)
export const getTicketsGroups = state =>
  fromTickets.getTicketsGroups(state.tickets)
export const getPctVenueAvail = state =>
  fromTickets.getPctVenueAvail(state.tickets)
export const getTickets = state => fromTickets.getTickets(state.tickets)
export const getSelectedTicket = state =>
  fromTickets.getSelectedTicket(state.tickets)
export const getValidListings = state =>
  fromTickets.getValidListings(state.tickets)
export const getTrackedListings = state =>
  fromTickets.getTrackedListings(state.tickets)
export const getSoldListings = state =>
  fromTickets.getSoldListings(state.tickets)

export const getOpenSalesListings = state =>
  fromListings.getOpenSalesListings(state.listings)

export const getOpenTransfersListings = state =>
  fromListings.getOpenTransfersListings(state.listings)
export const getUpcomingOpenOrders = state =>
  fromListings.getUpcomingOpenOrders(state.listings)
export const getPurchasedTicketInfo = state =>
  fromListings.getPurchasedTicketInfo(state.listings)

export const getSimulateTrackedListing = state =>
  fromListings.getSimulateTrackedListing(state.listings)

export const getOrderFlowListings = state =>
  fromListings.getOrderFlowListings(state.listings)

export const getPDFAttachment = state =>
  fromListings.getPDFAttachment(state.listings)

export const getEvenuePDF = state => fromListings.getEvenuePDF(state.listings)

export const getPDFDownloaded = state =>
  fromListings.getPDFDownloaded(state.listings)

export const getOrderFullFillMent = state =>
  fromListings.getOrderFullFillMent(state.listings)

export const getSoldStatisticsLog = state =>
  fromListings.getSoldStatisticsLog(state.listings)

export const getPromos = state => fromPromos.getPromos(state.promos)

export const getEventPromos = state => fromPromos.getEventPromos(state.promos)

export const getGlobalConfigs = state =>
  fromGlobal.getGlobalConfigs(state.globals)

export const getShortTermLogs = state => fromLogs.getShortTermLogs(state.logs)

export const getEventsLog = state => fromLogs.getEventsLog(state.logs)

export const getEventLogDetails = state =>
  fromLogs.getEventLogDetails(state.logs)

export const getNearLogs = state => fromLogs.getNearLogs(state.logs)

export const getMediumTermLogs = state => fromLogs.getMediumTermLogs(state.logs)

export const getLongTermLogs = state => fromLogs.getLongTermLogs(state.logs)

export const getDownLoadedInstanceLog = state =>
  fromLogs.getDownLoadedInstanceLog(state.logs)

export const getCloakListings = state =>
  fromListings.getCloakListings(state.listings)

export const getOrderStatusListings = state =>
  fromOrders.getOrderStatusListings(state.orders)

export const getEVenues = state => fromEVenues.getEVenues(state.eVenues)
export const getEventDetailsLog = state =>
  fromEvents.getEventDetailsLog(state.events)

export const getRePriceEventLog = state =>
  fromEvents.getRePriceEventLog(state.events)

export const getEmailManagement = state =>
  fromEmailManagement.getEmailManagement(state.emailManagement)

export const getViewLog = state => fromLogs.getViewLog(state.logs)

export const getPricePointList = state =>
  fromEvents.getPricePointList(state.events)

export const getSecondaryMargetList = state =>
  fromEvents.getSecondaryMargetList(state.events)

export const getFailedEventLog = state => fromLogs.getFailedEventLog(state.logs)

export const getEventStatistic = state =>
  fromEventStatistic.getEventStatistic(state.eventStatistic)

export const getEventMonitor = state =>
  fromEventStatistic.getEventMonitor(state.eventStatistic)

export const getAvailablePromos = state =>
  fromPromos.getAvailablePromos(state.promos)

export const getBlacListInfo = state => fromEvents.getBlacListInfo(state.events)
export const getAvailableOffers = state =>
  fromEvents.getAvailableOffers(state.events)

export const getSelectedEVenue = state =>
  fromEVenues.getSelectedEVenue(state.eVenues)

export const getClockTimer = state =>
  fromClockTimer.getClockTimer(state.clockTimers)

export const getEventsLogInfo = state => fromLogs.getEventsLogInfo(state.logs)

export const getAxsVenues = state => fromAxsVenues.getAxsVenues(state.axsVenues)

export const getSearchAxsVenueData = state =>
  fromAxsVenues.getSearchAxsVenueData(state.axsVenues)

export const getSkyBoxAxsVenuesDup = state =>
  fromAxsVenues.getSkyBoxAxsVenuesDup(state.axsVenues)
