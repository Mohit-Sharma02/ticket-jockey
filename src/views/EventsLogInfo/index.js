import { connect } from "react-redux"

import { fetchEventsLogInfoRequest } from "../../actions/logs"
import { getIsFetching, getEventsLogInfo } from "../../reducers"
import EventsLogInfo from "./EventsLogInfo"

const EventsLogsInfoContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    eventsLogInfo: getEventsLogInfo(state)
  }),
  {
    fetchEventsLogInfoRequest
  }
)(EventsLogInfo)

export default EventsLogsInfoContainer
