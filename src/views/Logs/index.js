import { connect } from "react-redux"

import {
  fetchEventsLogRequest,
  fetchEventsLogDetailsRequest,
  fetchMediumTermEventsLogRequest,
  fetchLongTermEventsLogRequest,
  fetchViewLogRequest,
  fetchInstanceLogRequest,
  fetchFailedEventLogRequest
} from "../../actions/logs"
import {
  getEventsLog,
  getEventLogDetails,
  getIsFetching,
  getViewLog,
  getDownLoadedInstanceLog,
  getFailedEventLog
} from "../../reducers"
import Logs from "./Logs"

const LogsContainer = connect(
  state => ({
    eventsLogs: getEventsLog(state),
    eventsDetailLog: getEventLogDetails(state),
    isFetching: getIsFetching(state),
    viewLogs: getViewLog(state),
    InstanceLog: getDownLoadedInstanceLog(state),
    failedEventLog: getFailedEventLog(state)
    // globals: getGlobalConfigs(state)
  }),
  {
    fetchEventsLogRequest,
    fetchEventsLogDetailsRequest,
    fetchMediumTermEventsLogRequest,
    fetchLongTermEventsLogRequest,
    fetchViewLogRequest,
    fetchInstanceLogRequest,
    fetchFailedEventLogRequest
  }
)(Logs)

export default LogsContainer
