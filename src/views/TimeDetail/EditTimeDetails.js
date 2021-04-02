import React, { useState, useRef } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"
import { ALERT_MSG_ERROR } from "../../constants"
import { TextField } from "@material-ui/core"
import moment from "moment"

const TimeEdit = ({
  rowToEdit,
  isTimeEdit,
  updateAdminClockTimerRequest,
  AllUserDetails,
  name,
  start,
  end,
  appReceiveAlert,
  isTimeModal,
  isViewModal
}) => {
  const [timeModal, setTimeModal] = useState(true)
  const refESTClockIn = useRef(null)
  const refESTClockOut = useRef(null)
  const headerStyle = {
    color: "black"
  }

  const LabelStyle = {
    margin: "0",
    width: "250px",
    float: "left",
    paddingRight: "15px",
    lineHeight: "50px",
    textAlign: "right",
    color: "rgba(25, 38, 48, 0.5)",
    fontWeight: "500"
  }

  const FormControlStyle = {
    height: "40px",
    padding: "0 10px",
    float: "left",
    fontSize: "15px",
    color: "#212529",
    background: "#fff !important",
    border: "1px solid rgba(25, 38, 48, 0.5)"
  }
  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={timeModal}
        onHide={() => {
          setTimeModal(false)
          if (isTimeEdit != undefined) isTimeEdit(false)
          if (isTimeModal != undefined) isTimeModal(true)
          if (isViewModal != undefined) isViewModal(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="E-mail_title" style={{ color: "black" }}>
            Edit Time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 110px)",
            overflowY: "auto"
          }}
        >
          <Form.Group>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>EST Clock In</Form.Label>
              </div>
              <div className="col-sm-8">
                <form className="classes.container" noValidate>
                  <TextField
                    type="time"
                    ref={refESTClockIn}
                    defaultValue={moment(rowToEdit.clockIn, [
                      "hh:mm:ss A"
                    ]).format("HH:mm:ss")}
                    className="classes.textField"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 2
                    }}
                    onChange={evt =>
                      (rowToEdit.clockIn = moment(evt.target.value, [
                        "HH:mm:ss"
                      ]).format("hh:mm:ss A"))
                    }
                  />
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>EST Clock Out</Form.Label>
              </div>
              <div className="col-sm-8">
                <form className="classes.container" noValidate>
                  <TextField
                    type="time"
                    ref={refESTClockOut}
                    defaultValue={moment(rowToEdit.clockOut, [
                      "hh:mm:ss A"
                    ]).format("HH:mm:ss")}
                    className="classes.textField"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 2
                    }}
                    onChange={evt =>
                      (rowToEdit.clockOut = moment(evt.target.value, [
                        "HH:mm:ss"
                      ]).format("hh:mm:ss A"))
                    }
                  />
                </form>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setTimeModal(false)
              if (isTimeEdit != undefined) isTimeEdit(false)
              if (isTimeModal != undefined) isTimeModal(true)
              if (isViewModal != undefined) isViewModal(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (rowToEdit.clockOut === "00:00:00") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Please insert EST ClockOut Time"
                })
              } else {
                var startTime = moment(rowToEdit.clockIn, "HH:mm:ss A")
                var endTime = moment(rowToEdit.clockOut, "HH:mm:ss A")
                var duration = moment.duration(endTime.diff(startTime))
                rowToEdit.duration = moment
                  .utc(duration.as("milliseconds"))
                  .format("HH:mm:ss")
                updateAdminClockTimerRequest({
                  timer: AllUserDetails,
                  start: moment(start).format("YYYY-MM-DD"),
                  end: moment(end).format("YYYY-MM-DD"),
                  name: name
                })
                setTimeModal(false)
                if (isTimeEdit != undefined) isTimeEdit(false)
                if (isTimeModal != undefined) isTimeModal(false)
                if (isViewModal != undefined) isViewModal(false)
              }
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TimeEdit
