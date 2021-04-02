import React, { useEffect, useRef, useState } from "react"
import { Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import "bootstrap-daterangepicker/daterangepicker.css"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker"
import moment from "moment-timezone"
import Accordion from "react-bootstrap/Accordion"
import Spinner from "../../components/Spinner"
const EventsLogInfo = ({
  fetchEventsLogInfoRequest,
  eventsLogInfo,
  isFetching
}) => {
  let now = new Date()
  let local = {
    format: "YYYY-MM-DD HH:mm:ss",
    sundayFirst: false
  }
  const [startOnLoad, setStartOnLoad] = useState(true)
  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  )
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  )
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(6, "days")
  )
  let ranges = {
    Today: [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days")
    ],
    "7 Days": [moment(start).subtract(6, "days"), moment(end)],
    "30 Days": [moment(start).subtract(29, "days"), moment(end)],
    "This Month": [moment(start).startOf("month"), moment(end).endOf("month")],
    "Last Month": [
      moment(start)
        .subtract(1, "month")
        .startOf("month"),
      moment(end)
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment(start).subtract(1, "years"), moment(end)]
  }
  useEffect(() => {
    fetchEventsLogInfoRequest({
      startDate: moment(start)
        .subtract(6, "days")
        .format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD")
    })
  }, [])

  const applyCallback = (startDate, endDate) => {
    setStart(startDate)
    setEnd(endDate)
    fetchEventsLogInfoRequest({
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD")
    })
    setStartOnLoad(false)
  }

  return (
    <div className="animated fadeIn">
      <div className="full_width">
        <div className="page_name">
          <h2>Log Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="inner_box_body padL3T5">
              <div className="tbl_main  order_tbl_main nw_od_cls">
                <div className="inner_tbl">
                  <div className="table_head acc_main">
                    <div className="filterCV">
                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Accordion.Toggle
                            className="cm_ttl"
                            as={Card.Header}
                            eventKey="0"
                            // onClick={setToggleValue("collapse")}
                          >
                            <h2> Start & End Date</h2>
                          </Accordion.Toggle>

                          <Accordion.Collapse
                            //className={toggleClass}
                            eventKey="0"
                          >
                            <div className="select_eq filter_filed">
                              <div className="fl_eq_box rangeCls">
                                <div className="date_picker dateCls">
                                  <DateTimeRangeContainer
                                    ranges={ranges}
                                    start={startOnLoad ? onloadStart : start}
                                    end={end}
                                    local={local}
                                    applyCallback={applyCallback}
                                  >
                                    <div className="input-group">
                                      <Form.Control
                                        id="formControlsTextB"
                                        type="text"
                                        label="Text"
                                        value={
                                          startOnLoad
                                            ? moment(start)
                                                .subtract(6, "days")
                                                .format("YYYY-MM-DD HH:mm:ss") +
                                              " To " +
                                              moment(end).format(
                                                "YYYY-MM-DD HH:mm:ss"
                                              )
                                            : moment(start).format(
                                                "YYYY-MM-DD HH:mm:ss"
                                              ) +
                                              " To " +
                                              moment(end).format(
                                                "YYYY-MM-DD HH:mm:ss"
                                              )
                                        }
                                        placeholder="Search...."
                                      />
                                    </div>
                                  </DateTimeRangeContainer>
                                </div>
                              </div>
                            </div>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                  </div>

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <div className="row">
                        <div className="col-sm-6">
                          <h2>Event Monitoring</h2>
                        </div>
                      </div>
                    </div>
                    <div className="fl_w">
                      {isFetching ? (
                        <Spinner spinnerTime={false} />
                      ) : (
                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main statisctics_bx">
                            <div className="inner_tbl">
                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-added.png")}
                                    alt="Event Added"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalShort}</h1>
                                    <Card.Title>Short Term</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/venue-added.png")}
                                    alt="Venue Added"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalMedium}</h1>
                                    <Card.Title>Medium Term</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-cancel.png")}
                                    alt="Event Cancel"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalNear}</h1>
                                    <Card.Title>Near Term</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-postpone.png")}
                                    alt="Event PostPoned"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalLong}</h1>
                                    <Card.Title>Long Term</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <div className="row">
                        <div className="col-sm-6">
                          <h2>Event Posting</h2>
                        </div>
                      </div>
                    </div>
                    <div className="fl_w">
                      {isFetching ? (
                        <Spinner spinnerTime={false} />
                      ) : (
                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main statisctics_bx">
                            <div className="inner_tbl">
                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-added.png")}
                                    alt="Event Added"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalEventsAdded}</h1>
                                    <Card.Title>Event Added</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/rescheduleEvent.png")}
                                    alt="Venue Added"
                                  />
                                  <Card.Text>
                                    <h1>
                                      {eventsLogInfo.TotalEventReschedule}
                                    </h1>
                                    <Card.Title>Event Reschedule</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-cancel.png")}
                                    alt="Event Cancel"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalEventCancel}</h1>
                                    <Card.Title>Event Cancel</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <Card.Img
                                    src={require("./../../assets/img/event-postpone.png")}
                                    alt="Event PostPoned"
                                  />
                                  <Card.Text>
                                    <h1>{eventsLogInfo.TotalEventPostponed}</h1>
                                    <Card.Title>Event PostPoned</Card.Title>
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsLogInfo
