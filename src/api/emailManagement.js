import { restApiClient } from "."

//Email management
export const createEmailManagement = (emailManagement, venueId) => {
  if (!emailManagement) throw new Error("An venue object is null!")
  return restApiClient.put(`/createEmailManagements`, {
    emailManagement,
    venueId
  })
}

export const deleteEmailManagement = (emailManagement, venueId) => {
  if (!emailManagement) throw new Error("An keyword is null!")

  return restApiClient.put(`/deleteEmailManagement`, {
    emailManagement,
    venueId
  })
}

export const fetchEmailManagement = venueId => {
  return restApiClient.post(`/getEmailManagements`, { venueId })
}

export const updateEmailManagement = (emailManagement, venueId) => {
  if (!emailManagement) throw new Error("No Key Found For Update!")

  return restApiClient.put(`/updateEmailManagement`, {
    emailManagement,
    venueId
  })
}
