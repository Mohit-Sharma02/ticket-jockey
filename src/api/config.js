import { restApiClient } from "."
import qs from "qs"

//Broadcasting
export const fetchBoradcastingStatus = () => {
  return restApiClient.get(`/broadcastState`)
}

export const broadcastListing = (eventId, isBroadcasting) => {
  if (isBroadcasting) isBroadcasting = 1
  return eventId
    ? restApiClient.get(
        `/updateManagedEventStatus/${eventId}/${isBroadcasting}`
      )
    : restApiClient.get(`/updateManagedEventStatus`)
}

export const unBroadcastListing = (eventId, isBroadcasting) => {
  if (!isBroadcasting) isBroadcasting = 0
  return eventId
    ? restApiClient.get(
        `/updateManagedEventStatus/${eventId}/${isBroadcasting}`
      )
    : restApiClient.get(`/updateManagedEventStatus`)
}
