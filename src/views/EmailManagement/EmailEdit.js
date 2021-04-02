import React, { useState, useRef } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"
import { ALERT_MSG_ERROR } from "../../constants"

const EVenuesEdit = ({
  updateEmailManagementRequest,
  rowToEdit,
  isEmailEdit,
  venueId,
  appReceiveAlert,
  fetchEmailManagementRequest,
  EVenueDetail
}) => {
  const [emailModal, setEmailModal] = useState(true)
  const [newEmail, setNewEmail] = useState("")
  const refEamil = useRef(null)
  const refPassword = useRef(null)
  const refName = useRef(null)
  const refAddress = useRef(null)
  const refPhoneNumber = useRef(null)
  const refCapOnedigit = useRef(null)
  const refCapOneCvv = useRef(null)
  const refCapOneMonth = useRef(null)
  const refCapOneYear = useRef(null)
  const refAmexDigit = useRef(null)
  const refAmexCVV = useRef(null)
  const refAmexMonth = useRef(null)
  const refAmexYear = useRef(null)
  const refComdataDigit = useRef(null)
  const refComdaraCvv = useRef(null)
  const refComdataMonth = useRef(null)
  const refComdataYear = useRef(null)
  const refCiti1digit = useRef(null)
  const refCiti1VV = useRef(null)
  const refCiti1Month = useRef(null)
  const refCiti1Year = useRef(null)
  const refCiti2Digit = useRef(null)
  const refCiti2Cvv = useRef(null)
  const refCiti2Month = useRef(null)
  const refCiti2Year = useRef(null)

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
        show={emailModal}
        onHide={() => {
          setEmailModal(false)
          if (venueId) {
            fetchEmailManagementRequest({ venueId })
          } else {
            fetchEmailManagementRequest()
          }

          if (isEmailEdit != undefined) isEmailEdit(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="E-mail_title" style={{ color: "black" }}>
            Edit Email
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
                <Form.Label style={LabelStyle}>Email</Form.Label>
              </div>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  ref={refEamil}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.email}
                  onChange={evt => setNewEmail(evt.target.value)}
                  // disabled={true}
                  //  style={{ background: "grey" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Password</Form.Label>
              </div>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="Password"
                  ref={refPassword}
                  style={FormControlStyle}
                  maxLength="15"
                  // disabled={EVenueDetail && EVenueDetail ? false : true}
                  defaultValue={rowToEdit.password}
                  onChange={evt => (rowToEdit.password = evt.target.value)}
                  // style={{
                  //   background: EVenueDetail && EVenueDetail ? "" : "grey"
                  // }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Name</Form.Label>
              </div>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  ref={refName}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.name}
                  style={FormControlStyle}
                  onChange={evt => (rowToEdit.name = evt.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Address</Form.Label>
              </div>
              <div className="col-sm-8">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  ref={refAddress}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.address}
                  style={FormControlStyle}
                  onChange={evt => (rowToEdit.address = evt.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Phone Number</Form.Label>
              </div>
              <div className="col-sm-8">
                <Form.Control
                  type="Number"
                  placeholder="Phone Number"
                  ref={refPhoneNumber}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.phoneNumber}
                  style={FormControlStyle}
                  onChange={evt => (rowToEdit.phoneNumber = evt.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>CapOne</Form.Label>
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-3" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder={
                    EVenueDetail && EVenueDetail ? "CapOne" : "Last-4-digit"
                  }
                  ref={refCapOnedigit}
                  style={FormControlStyle}
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  defaultValue={rowToEdit.capOne.digit}
                  onChange={evt => (rowToEdit.capOne.digit = evt.target.value)}
                />
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-2" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  ref={refCapOneCvv}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.capOne.cvv}
                  onChange={evt => (rowToEdit.capOne.cvv = evt.target.value)}
                />
              </div>
              {EVenueDetail && EVenueDetail ? (
                <>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref={refCapOneMonth}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.capOne.month}
                      onChange={evt =>
                        (rowToEdit.capOne.month = evt.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref={refCapOneYear}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.capOne.year}
                      onChange={evt =>
                        (rowToEdit.capOne.year = evt.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Amex</Form.Label>
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-3" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder={
                    EVenueDetail && EVenueDetail ? "Amex" : "Last-4-digit"
                  }
                  ref={refAmexDigit}
                  style={FormControlStyle}
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  defaultValue={rowToEdit.amex.digit}
                  onChange={evt => (rowToEdit.amex.digit = evt.target.value)}
                />
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-2" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  ref={refAmexCVV}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.amex.cvv}
                  onChange={evt => (rowToEdit.amex.cvv = evt.target.value)}
                />
              </div>

              {EVenueDetail && EVenueDetail ? (
                <>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref={refAmexMonth}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.amex.month}
                      onChange={evt =>
                        (rowToEdit.amex.month = evt.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref={refAmexYear}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.amex.year}
                      onChange={evt => (rowToEdit.amex.year = evt.target.value)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>ComData</Form.Label>
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-3" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder={
                    EVenueDetail && EVenueDetail ? "ComData" : "Last-4-digit"
                  }
                  ref={refComdataDigit}
                  style={FormControlStyle}
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  defaultValue={rowToEdit.comdata.digit}
                  onChange={evt => (rowToEdit.comdata.digit = evt.target.value)}
                />
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-2" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  ref={refComdaraCvv}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.comdata.cvv}
                  onChange={evt => (rowToEdit.comdata.cvv = evt.target.value)}
                />
              </div>
              {EVenueDetail && EVenueDetail ? (
                <>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref={refComdataMonth}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.comdata.month}
                      onChange={evt =>
                        (rowToEdit.comdata.month = evt.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref={refComdataYear}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.comdata.year}
                      onChange={evt =>
                        (rowToEdit.comdata.year = evt.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Citi #1</Form.Label>
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-3" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder={
                    EVenueDetail && EVenueDetail ? "Citi #1" : "Last-4-digit"
                  }
                  ref={refCiti1digit}
                  style={FormControlStyle}
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  defaultValue={rowToEdit.citi1.digit}
                  onChange={evt => (rowToEdit.citi1.digit = evt.target.value)}
                />
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-2" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  ref={refCiti1VV}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.citi1.cvv}
                  onChange={evt => (rowToEdit.citi1.cvv = evt.target.value)}
                />
              </div>
              {EVenueDetail && EVenueDetail ? (
                <>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref={refCiti1Month}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.citi1.month}
                      onChange={evt =>
                        (rowToEdit.citi1.month = evt.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref={refCiti1Year}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.citi1.year}
                      onChange={evt =>
                        (rowToEdit.citi1.year = evt.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Form.Label style={LabelStyle}>Citi #2</Form.Label>
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-3" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder={
                    EVenueDetail && EVenueDetail ? "Citi #2" : "Last-4-digit"
                  }
                  ref={refCiti2Digit}
                  style={FormControlStyle}
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  defaultValue={rowToEdit.citi2.digit}
                  onChange={evt => (rowToEdit.citi2.digit = evt.target.value)}
                />
              </div>
              <div
                className={
                  EVenueDetail && EVenueDetail ? "col-sm-2" : "col-sm-4"
                }
              >
                <Form.Control
                  type="text"
                  placeholder="CVV"
                  maxLength={EVenueDetail && EVenueDetail ? "" : "4"}
                  ref={refCiti2Cvv}
                  style={FormControlStyle}
                  defaultValue={rowToEdit.citi2.cvv}
                  onChange={evt => (rowToEdit.citi2.cvv = evt.target.value)}
                />
              </div>
              {EVenueDetail && EVenueDetail ? (
                <>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref={refCiti2Month}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.citi2.month}
                      onChange={evt =>
                        (rowToEdit.citi2.month = evt.target.value)
                      }
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref={refCiti2Year}
                      style={FormControlStyle}
                      defaultValue={rowToEdit.citi2.year}
                      onChange={evt =>
                        (rowToEdit.citi2.year = evt.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setEmailModal(false)
              if (venueId) {
                fetchEmailManagementRequest({ venueId })
              } else {
                fetchEmailManagementRequest()
              }
              if (isEmailEdit != undefined) isEmailEdit(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (rowToEdit.email === "" && rowToEdit.password === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: 'All  "*"  Information are required'
                })
              } else if (rowToEdit.email === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Email is Required"
                })
              } else if (rowToEdit.password === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Password is Required"
                })
              } else if (
                !/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(
                  rowToEdit.email
                )
              ) {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Email Is not valid"
                })
              } else {
                updateEmailManagementRequest({
                  updatedRow: {
                    newEmail: newEmail !== "" ? newEmail : "",
                    email: rowToEdit.email,
                    password: rowToEdit.password,
                    name: rowToEdit.name,
                    address: rowToEdit.address,
                    phoneNumber: rowToEdit.phoneNumber,
                    capOne: {
                      digit: rowToEdit.capOne.digit,
                      cvv: rowToEdit.capOne.cvv,
                      month:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.capOne.month
                          : "",
                      year:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.capOne.year
                          : ""
                    },
                    amex: {
                      digit: rowToEdit.amex.digit,
                      cvv: rowToEdit.amex.cvv,
                      month:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.amex.month
                          : "",
                      year:
                        EVenueDetail && EVenueDetail ? rowToEdit.amex.year : ""
                    },
                    comdata: {
                      digit: rowToEdit.comdata.digit,
                      cvv: rowToEdit.comdata.cvv,
                      month:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.comdata.month
                          : "",
                      year:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.comdata.year
                          : ""
                    },
                    citi1: {
                      digit: rowToEdit.citi1.digit,
                      cvv: rowToEdit.citi1.cvv,
                      month:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.citi1.month
                          : "",
                      year:
                        EVenueDetail && EVenueDetail ? rowToEdit.citi1.year : ""
                    },
                    citi2: {
                      digit: rowToEdit.citi2.digit,
                      cvv: rowToEdit.citi2.cvv,
                      month:
                        EVenueDetail && EVenueDetail
                          ? rowToEdit.citi2.month
                          : "",
                      year:
                        EVenueDetail && EVenueDetail ? rowToEdit.citi2.year : ""
                    },
                    updatedDate: rowToEdit.updatedDate,
                    isActive: rowToEdit.isActive
                  },
                  venueId: venueId ? venueId : false
                })
                setEmailModal(false)
                if (isEmailEdit != undefined) isEmailEdit(false)
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

export default EVenuesEdit
