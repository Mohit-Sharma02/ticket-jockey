import React, { useEffect, useRef, useState } from "react"
import { Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import "bootstrap-daterangepicker/daterangepicker.css"
const LogInfo = ({}) => {
  const [eventType, setEventType] = useState("DAILY")
  return (
    <div className="animated fadeIn">
      <div className="full_width">
        <div className="page_name">
          <h2>Log Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="white_box mrgbtm50">
              <div className="cm_ttl dis_inline">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Event Monitoring</h2>
                  </div>
                  <div className="col-sm-6 logInfoEventType">
                    <Form.Control
                      as="select"
                      value={eventType}
                      onChange={evt => {
                        setEventType(evt.target.value)
                      }}
                    >
                      <option value="DAILY">Today</option>
                      <option value="WEEKLY">This Week</option>
                    </Form.Control>
                  </div>
                </div>
              </div>

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
                          <h1>2</h1>
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
                          <h1>2</h1>
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
                          <h1>0</h1>
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
                          <h1>0</h1>
                          <Card.Title>Long Term</Card.Title>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div className="white_box mrgbtm50">
              <div className="cm_ttl dis_inline">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Event Posting</h2>
                  </div>
                  <div className="col-sm-6 logInfoEventType">
                    <Form.Control
                      as="select"
                      value={eventType}
                      onChange={evt => {
                        setEventType(evt.target.value)
                      }}
                    >
                      <option value="DAILY">Today</option>
                      <option value="WEEKLY">This Week</option>
                    </Form.Control>
                  </div>
                </div>
              </div>

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
                          <h1>2</h1>
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
                          <h1>2</h1>
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
                          <h1>0</h1>
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
                          <h1>0</h1>
                          <Card.Title>Event PostPoned</Card.Title>
                        </Card.Text>
                      </Card.Body>
                    </Card>
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

export default LogInfo
