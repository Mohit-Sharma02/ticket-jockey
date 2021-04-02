import { restApiClient } from "."

export const createAxsVenue = axsVenue => {
  if (!axsVenue) throw new Error("An axs venue object is null!")

  return restApiClient.post(`/createAxsVenues`, axsVenue)
}

export const deleteAxsVenue = _id => {
  if (!_id) throw new Error("An keyword is null!")

  return restApiClient.delete(`/deleteAxsVenue/${_id}`)
}

export const fetchAxsVenue = () => {
  return restApiClient.get(`/getAxsVenues`)
}

export const fetchAxsVenueByPaging = axsVenueParam => {
  return restApiClient.post(`/getAxsVenuesByPaging`, axsVenueParam)
}

export const fetchAxsVenueSearch = axsVenueParam => {
  return restApiClient.post(`/getAxsVenuesBySearch`, axsVenueParam)
}

export const updateAxsVenue = (newAxsVenue, _id) => {
  if (!newAxsVenue) throw new Error("An empty axs venue!")

  return restApiClient.put(`/updateAxsVenue/${_id}`, newAxsVenue)
}

export const searchSkyboxAxsVenue = axsVenue => {
  return restApiClient.post(`/searchSkyboxAxsVenue`, {
    axsVenue
  })
}

// export const updatePriceMarkupPctForAxsVenue = (_id, newAxsPrice) => {
//     if (!_id) throw new Error("An _id is null!")

//     return restApiClient.put(
//         `/updatePriceMarkupPctForAxsVenue/${_id}`,
//         newAxsPrice
//     )
// }
