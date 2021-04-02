import { restApiClient } from "."

export const login = body => {
  return restApiClient.post("/jockeyAccounts/login", body)
}

export const userUpdateProfile = body => {
  return restApiClient.put(`/jockeyAccounts/${body.username}`, body)
}

export const fetchUserProfile = username => {
  return restApiClient.get(`/jockeyAccounts/${username}`)
}
