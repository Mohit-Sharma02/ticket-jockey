import { restApiClient } from "."

//E venue
export const createEVenue = venue => {
  if (!venue) throw new Error("An venue object is null!")
  return restApiClient.post(`/createEVenues`, venue)
}

export const deleteEVenue = venueId => {
  if (!venueId) throw new Error("An keyword is null!")

  return restApiClient.delete(`/deleteEVenue/${venueId}`)
}

export const fetchEVenue = (searchStartDate, searchEndDate, emailExists) => {
  return restApiClient.get(`/getEVenues`, {
    params: {
      searchStartDate: searchStartDate,
      searchEndDate: searchEndDate,
      emailExists: emailExists
    }
  })
}

export const updateEVenue = (newVenue, venueId) => {
  if (!newVenue) throw new Error("An empty venue!")
  return restApiClient.put(`/updateEVenue/${venueId}`, newVenue)
}

export const updateBlacklistEvenue = (is_blackList, venueId) => {
  if (!venueId) throw new Error("An empty venue!")
  if (is_blackList) is_blackList = 1
  else is_blackList = 0
  return restApiClient.delete(`/blackListEvenue/${venueId}`, {
    params: {
      is_blackList: is_blackList
    }
  })
}
