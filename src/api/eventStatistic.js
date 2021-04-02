import { restApiClient } from "."

//Order Status Listings
export const fetchEventStatistic = (startDate, endDate) => {
  return restApiClient.get(`/getEventsStatisticsLog`, {
    params: {
      // timeRange: groupByTimeRange
      startDate: startDate,
      endDate: endDate
    }
  })
}

//For event Monitor
export const fetchEventMonitor = () => {
  return restApiClient.get(`/getEventsMonitorLog`)
}
