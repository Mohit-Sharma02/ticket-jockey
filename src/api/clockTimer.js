import { restApiClient } from "."

export const fetchClockTimer = id => {
  return restApiClient.get(`/getClockTimer`, {
    params: {
      id: id
    }
  })
}

export const fetchAllTimer = (StartDate, EndDate, name) => {
  return restApiClient.get(`/getAllTime`, {
    params: {
      StartDate: StartDate,
      EndDate: EndDate,
      name: name
    }
  })
}

export const upDateTimeByAdmin = timer => {
  if (!timer) throw new Error("An timer object is null!")
  return restApiClient.post(`/upDateTimeByAdmin`, timer)
}

export const createNewTimerInstance = timer => {
  if (!timer) throw new Error("An timer object is null!")
  return restApiClient.post(`/createClockTimer`, timer)
}

export const createNewTimerInstanceByadmin = timer => {
  if (!timer) throw new Error("An timer object is null!")
  return restApiClient.post(`/craeteClocktimerByAdmin`, timer)
}

export const updateClockTimer = newData => {
  return restApiClient.post(`/createClockTimer`, newData)
}

export const deleteUser = id => {
  if (!id) throw new Error("An keyword is null!")
  return restApiClient.delete(`/deleteUser`, {
    params: { id }
  })
}
