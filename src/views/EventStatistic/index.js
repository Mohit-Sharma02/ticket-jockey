import { connect } from "react-redux"
import { getIsFetching, getEventStatistic } from "../../reducers"
import EventStatistic from "./EventStatistic"
import { fetchEventStatisticRequest } from "../../actions/eventStatistic"

const EventStatisticContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    eventStatistic: getEventStatistic(state)
  }),
  {
    fetchEventStatisticRequest
  }
)(EventStatistic)

export default EventStatisticContainer
