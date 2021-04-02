import { restApiClient } from "."

//Managed venue
export const createManagedVenue = venue => {
  if (!venue) throw new Error("An venue object is null!")

  return restApiClient.post(`/createManagedVenues`, venue)
}

export const deleteManagedVenue = venueId => {
  if (!venueId) throw new Error("An keyword is null!")

  return restApiClient.delete(`/deleteManagedVenue/${venueId}`)
}

export const fetchManagedVenue = () => {
  return restApiClient.get(`/getManagedVenues`)
}

export const fetchManagedVenueByPaging = venueParam => {
  return restApiClient.post(`/getManagedVenuesByPaging`, venueParam)
}

export const fetchManagedVenueSearch = venueParam => {
  return restApiClient.post(`/getManagedVenuesBySearch`, venueParam)
}

export const updateManagedVenue = (newVenue, venueId) => {
  if (!newVenue) throw new Error("An empty venue!")

  return restApiClient.put(`/updateManagedVenue/${venueId}`, newVenue)
}

export const searchSkyboxVenue = venue => {
  return restApiClient.post(`/searchSkyboxVenue`, {
    venue
  })
}

export const updatePriceMarkupPctForVenue = (venueId, newPrice) => {
  if (!venueId) throw new Error("An venueId is null!")

  return restApiClient.put(
    `/updatePriceMarkupPctForEvenue/${venueId}`,
    newPrice
  )
}
