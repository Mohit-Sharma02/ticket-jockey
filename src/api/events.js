import qs from "qs"

import { restApiClient, awsApiClient } from "."

// const slug = "/event"

export const fetchEventsByKeyword = keyword => {
  if (!keyword) throw new Error("A keyword is empty!")

  return restApiClient.post(`/searchTMasterEvents`, {
    keyword
  })
}

//Managed events
export const createManagedEvents = events => {
  if (!Array.isArray(events)) throw new Error("An array of events needed!")

  return restApiClient.post(`/createManagedEvents`, events)
}

export const fetchManagedEvents = eventId => {
  return eventId
    ? restApiClient.get(`/getManagedEvents`, {
        params: {
          eventId
        }
      })
    : restApiClient.get(`/getManagedEvents`)
}

export const fetchManagedEventsByKeyword = keyword => {
  if (!keyword) throw new Error("Keyword is null!")

  return restApiClient.get(`/getManagedEvents`, {
    params: {
      venue: keyword
    }
  })
}

export const fetchManagedEventsFilter = (page, pageLimit) => {
  // if (!keyword) throw new Error("Keyword is null!")
  return restApiClient.post(`/getAllManagedEvents`, {
    rowNumber: page,
    limit: pageLimit
  })
}

export const fetchManagedEventsSearch = (
  searchStartDate,
  searchEndDate,
  eventKey,
  tmEventIdKey,
  venueKey,
  skyBoxEventIdKey,
  presaleSearchKey,
  availableOffer,
  availableOfferKey,
  blackList,
  marketType,
  bookMarks,
  page,
  pageLimit
) => {
  // if (!keyword) throw new Error("Keyword is null!")
  return restApiClient.post(`/getAllSearchEvents`, {
    searchStartDate,
    searchEndDate,
    eventKey,
    tmEventIdKey,
    venueKey,
    skyBoxEventIdKey,
    presaleSearchKey,
    availableOfferKey,
    availableOffer,
    blackList,
    marketType,
    bookMarks,
    rowNumber: page,
    limit: pageLimit
  })
}

export const fetchManagedEventsByQueryParam = params => {
  if (!params) throw new Error("params is null!")

  return restApiClient.get(`/getManagedEvent/${params}`)
}

export const deleteManagedEvents = (eventId, keyword) => {
  if (!eventId) throw new Error("An eventId is null!")

  return keyword
    ? restApiClient.put(`/managedVenue`, {
        keyword,
        blacklistedEvents: [eventId]
      })
    : restApiClient.delete(`/deleteManagedEvent/${eventId}`)
}

export const updateManagedEvents = (eventId, body) => {
  if (!eventId) throw new Error("An eventId is null!")

  return restApiClient.put(`/updateManagedEvent/${eventId}`, body)
}

export const searchSkyBoxEvents = events => {
  if (!Array.isArray(events.eventInfo))
    throw new Error("An array of events needed!")

  return restApiClient.post(`/searchSkyboxEvents`, events)
}

export const userOverrideAvail = (eventId, bool) => {
  if (!eventId) throw new Error("An eventId is null!")

  return restApiClient.get(`/userOverrideAvailableToBuy/${eventId}`, {
    params: {
      availableToBuy: bool
    }
  })
}

//managed events queue
export const fetchManagedEventsQueue = () => {
  return restApiClient.get(`/managedEventsQueue`)
}

export const deleteManagedEventsQueue = eventIds => {
  if (!Array.isArray(eventIds))
    throw new Error("deleteManagedEventsQueue expects an array!")

  return restApiClient.get(`/deleteBlacklistFromQueue`, {
    params: {
      eventIds
    },
    paramsSerializer: params => qs.stringify(params)
  })
}

export const addManagedEventFromQueue = eventIds => {
  if (!Array.isArray(eventIds))
    throw new Error("addManagedEventFromQueue expects an array!")

  return restApiClient.get(`/manageEventsFromQueue`, {
    params: {
      eventIds
    },
    paramsSerializer: params => qs.stringify(params)
  })
}

export const fetchEventDetailsLog = (eventId, SelectedDate) => {
  var date = SelectedDate
  return restApiClient.get(`/getEventDetailsLogs`, {
    params: {
      eventId,
      date
    }
  })
}

export const fetchPricePoint = pricePointLogsReqestData => {
  return restApiClient.get(`/getEventPricePointLogs`, {
    params: {
      eventId: pricePointLogsReqestData["eventId"],
      groupBy: pricePointLogsReqestData["groupBy"]
    }
  })
}

export const fetchSecondryMargetLogs = secondaryLogsReqestData => {
  return restApiClient.get(`/getEventDetailsSecondaryLogs`, {
    params: {
      eventId: secondaryLogsReqestData["eventId"],
      groupBy: secondaryLogsReqestData["groupBy"]
    }
  })
}
// Api call for Re Price Event Log
export const fetchRePriceEventLog = (eventId, StartDate, EndDate) => {
  // var date = SelectedDate
  return restApiClient.get(`/getRepriceEventLog`, {
    params: {
      eventId,
      StartDate,
      EndDate
    }
  })
}
// APi call for updatePricemarkUppct
export const updatePriceMarkupPct = (eventId, newPrice) => {
  if (!eventId) throw new Error("An eventId is null!")

  return restApiClient.put(`/updatePriceMarkupPct/${eventId}`, newPrice)
}

export const fetchManagedEventById = eventId => {
  if (!eventId) throw new Error("An eventId is null!")
  return restApiClient.get(`/getManagedEventById/${eventId}`)
}

export const updateIsBlackListed = (eventId, is_blackList) => {
  if (is_blackList) is_blackList = 1
  else is_blackList = 0
  return restApiClient.delete(`/deleteManagedEvent/${eventId}`, {
    params: {
      is_blackList: is_blackList
    }
  })
}

export const fetchBlackListPriceSection = eventId => {
  if (!eventId) throw new Error("An eventId is null!")
  return awsApiClient.post(`/getBlackListInfoByEventId/${eventId}`)
}

export const addBlackListPriceSection = (eventId, blackListData) => {
  var body
  if (blackListData.blackListSection) {
    body = { blackListSection: blackListData.blackListSection }
  } else {
    body = { blackListData: blackListData.blackListData }
  }
  if (!eventId) throw new Error("An eventId is null!")
  return restApiClient.post(`/blackListEventByPriceOrSecRow/${eventId}`, body)
}

export const updateIsMonitor = newData => {
  return restApiClient.put(`/updateMonitorEvent`, newData)
}

export const fetchAvailableOffers = () => {
  return restApiClient.get(`/searchAvailableOffers`)
}
