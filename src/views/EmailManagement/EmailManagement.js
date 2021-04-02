import React, { useEffect, useState } from "react"
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  FormControl
} from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"

import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import moment from "moment-timezone"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import EmailEdit from "./EmailEdit"

import {
  ALERT_MSG_ERROR,
  ALERT_MSG_INFO,
  ALERT_MSG_WARN,
  ALERT_MSG_SUCCESS
} from "../../constants"
var generator = require("generate-password")
class EmailManagementModel extends React.Component {
  handleSaveBtnClick = () => {
    const {
      columns,
      onSave,
      onModalClose,
      appReceiveAlert,
      createEmailManagementRequest
    } = this.props
    const newRow = {}
    newRow["email"] = this.refs.email.value
    newRow["password"] = this.refs.password.value
    newRow["capOne"] = {
      digit: this.refs.capOneDigit.value,
      cvv: this.refs.capOneCvv.value
    }
    newRow["amex"] = {
      digit: this.refs.amexDigit.value,
      cvv: this.refs.amexCvv.value
    }
    newRow["comdata"] = {
      digit: this.refs.comdataDigit.value,
      cvv: this.refs.comdataCvv.value
    }
    newRow["citi1"] = {
      digit: this.refs.citi1Digit.value,
      cvv: this.refs.citi1Cvv.value
    }
    newRow["citi2"] = {
      digit: this.refs.citi2Digit.value,
      cvv: this.refs.citi2Cvv.value
    }
    if (newRow.email === "" && newRow.password === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: 'All  "*"  Information are required'
      })
    } else if (newRow.email === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Email is Required"
      })
    } else if (newRow.password === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Password is Required"
      })
    } else if (
      !/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(
        newRow.email
      )
    ) {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Email Is not valid"
      })
    } else {
      // onSave(newRow)
      var d = new Date()
      var myTimezone = "America/New_York"
      var myDatetimeFormat = "MM/DD/YYYY hh:mm a"
      var new_date = moment(d)
        .tz(myTimezone)
        .format(myDatetimeFormat)
      // var new_date = new Intl.DateTimeFormat("en-US", {
      //   year: "numeric",
      //   month: "2-digit",
      //   day: "2-digit",
      //   hour: "2-digit",
      //   minute: "2-digit"
      //   //  second: "2-digit"
      // }).format(new Date())
      newRow["updatedDate"] = new_date
      newRow["isActive"] = 1
      createEmailManagementRequest({ newRow })
      onModalClose(false)
    }
  }

  render() {
    const {
      onModalClose,
      onSave,
      columns
      // validateState,
      //ignoreEditable
    } = this.props

    const headerStyle = {
      color: "black"
    }

    return (
      <div>
        <div className="animated">
          <Modal
            className="ReactModalPortal addEmailPop"
            size="lg"
            centered
            show={true}
            onHide={onModalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title
                className="EmailManagement_title"
                style={headerStyle}
              >
                Add Email
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "calc(100vh - 180px)",
                overflowY: "auto"
              }}
            >
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>
                      Email <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control type="text" placeholder="Email" ref="email" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>
                      Password <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      ref="password"
                      maxLength="15"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>CapOne</Form.Label>
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="Last-4-digit"
                      ref="capOneDigit"
                      maxLength="4"
                    />
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      maxLength="4"
                      ref="capOneCvv"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Amex</Form.Label>
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="Last-4-digit"
                      ref="amexDigit"
                      maxLength="4"
                    />
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      maxLength="4"
                      ref="amexCvv"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>ComData</Form.Label>
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="Last-4-digit"
                      ref="comdataDigit"
                      maxLength="4"
                    />
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      ref="comdataCvv"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Citi #1</Form.Label>
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="Last-4-digit"
                      ref="citi1Digit"
                      maxLength="4"
                    />
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      maxLength="4"
                      ref="citi1Cvv"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Citi #2</Form.Label>
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="Last-4-digit"
                      ref="citi2Digit"
                      maxLength="4"
                    />
                  </div>
                  <div className="col-sm-4">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      maxLength="4"
                      ref="citi2Cvv"
                    />
                  </div>
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-default btn-secondary"
                onClick={onModalClose}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.handleSaveBtnClick(columns, onSave)}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}

const selectRow = {
  mode: "checkbox",
  customComponent: CustomMultiSelectTable
}

var rowToEdit = {}
const EmailManagement = ({
  emailManagements,
  updateEmailManagementRequest,
  deleteEmailManagementRequest,
  fetchEmailManagementRequest,
  isFetching,
  isResetPasswordFetching,
  createEmailManagementRequest,
  resetEmailPasswordRequest,
  appReceiveAlert
}) => {
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [showEmailEdit, setShowEmailEdit] = useState(false)
  const [spinnerTime, setSpinnerTime] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  let passwordNew = ""
  const selectRow = {
    mode: "checkbox"
    //clickToExpand: true
  }

  const cellEditProp = {
    mode: "click",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
      var keys = Object.keys(oldValue) //get keys from object as an array
      keys.forEach(function(key, i) {
        //loop through keys array
        if (key == newValue) oldValue[newValue] = row
      })
    }
  }
  const noDataHandler = () => {
    if (isFetching) return <Spinner />
    else return "No Data Found To Display"
  }
  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button
        color="primary"
        className="btn-pill react-bs-table-del-btn"
        onClick={onBtnClick}
      >
        Delete
      </Button>
    )
  }

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            rowToEdit = row
            setShowEmailEdit(true)
          }}
        >
          Update Email
        </Button>

        <Button
          className="icon_btn"
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            customConfirm(row)
            // var d = new Date()
            // var myTimezone = "America/New_York"
            // var myDatetimeFormat = "MM/DD/YYYY hh:mm a"
            // var new_date = moment(d)
            //   .tz(myTimezone)
            //   .format(myDatetimeFormat)
            // passwordNew = generator.generate({
            //   length: 10,
            //   numbers: true
            // })
            // resetEmailPasswordRequest({
            //   email: row.email,
            //   password: passwordNew,
            //   updatedDate: new_date,
            //   capOne: {
            //     digit: row.capOne.digit,
            //     cvv: row.capOne.cvv
            //   },
            //   amex: {
            //     digit: row.amex.digit,
            //     cvv: row.amex.cvv
            //   },
            //   comdata: {
            //     digit: row.comdata.digit,
            //     cvv: row.comdata.cvv
            //   },
            //   citi1: {
            //     digit: row.citi1.digit,
            //     cvv: row.citi1.cvv
            //   },
            //   citi2: {
            //     digit: row.citi2.digit,
            //     cvv: row.citi2.cvv
            //   },
            //   isActive: 1
            // })
          }}
        >
          Update password
        </Button>

        {/* <BootstrapSwitchButton
          checked={row.isActive == 1 ? true : false}
          onChange={evt => {
            updateEmailManagementRequest({
              email: row.email,
              password: row.password,
              capOne: {
                digit: row.capOne.digit,
                cvv: row.capOne.cvv
              },
              amex: {
                digit: row.amex.digit,
                cvv: row.amex.cvv
              },
              comdata: {
                digit: row.comdata.digit,
                cvv: row.comdata.cvv
              },
              citi1: {
                digit: row.citi1.digit,
                cvv: row.citi1.cvv
              },
              citi2: {
                digit: row.citi2.digit,
                cvv: row.citi2.cvv
              },
              updatedDate: row.updatedDate,
              isActive: evt == true ? 1 : 0
            })
          }}
        /> */}
      </div>
    )
  }

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {dropRowKeys === undefined
            ? "Are you sure you want to reset Password?"
            : "Are you sure you want to delete these email Information?"}{" "}
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys === undefined) {
              var d = new Date()
              var myTimezone = "America/New_York"
              var myDatetimeFormat = "MM/DD/YYYY hh:mm a"
              var new_date = moment(d)
                .tz(myTimezone)
                .format(myDatetimeFormat)
              passwordNew = generator.generate({
                length: 10,
                numbers: true
              })
              resetEmailPasswordRequest({
                newEmail: "",
                email: next.email,
                password: "1" + passwordNew,
                updatedDate: new_date,
                capOne: {
                  digit: next.capOne.digit,
                  cvv: next.capOne.cvv
                },
                amex: {
                  digit: next.amex.digit,
                  cvv: next.amex.cvv
                },
                comdata: {
                  digit: next.comdata.digit,
                  cvv: next.comdata.cvv
                },
                citi1: {
                  digit: next.citi1.digit,
                  cvv: next.citi1.cvv
                },
                citi2: {
                  digit: next.citi2.digit,
                  cvv: next.citi2.cvv
                },
                isActive: next.isActive
              })
            } else {
              deleteEmailManagementRequest({ dropRowKeys })
              next()
            }
          }
        }
      ]
    })
  }

  const handlePageChange = (page, sizePerPage) => {
    window.scrollTo(0, 0)
  }

  const handleInsertedRow = row => {
    createEmailManagementRequest(row)
  }

  const createCustomModal = (
    onModalClose,
    onSave,
    columns
    // validateState,
    // ignoreEditable
  ) => {
    const attr = {
      onModalClose,
      onSave,
      columns
      // validateState,
      // ignoreEditable
    }
    return (
      <EmailManagementModel
        {...attr}
        appReceiveAlert={appReceiveAlert}
        createEmailManagementRequest={createEmailManagementRequest}
      />
    )
  }

  const trClassName = row => {
    if (row.error_description === "Account locked" || row.error_description) {
      return "red-bg-cl"
    } else {
      return ""
    }
  }

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: sizePerPage, // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    prePage: "Prev", // Previous page button text
    nextPage: "Next", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: true, // Accept bool or function
    hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, //> Hide the going to First and Last page button
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    noDataText: noDataHandler(),
    onPageChange: handlePageChange,
    insertText: "Add Email",
    expandBy: "column",
    afterInsertRow: handleInsertedRow,
    insertModal: createCustomModal,
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (e.target.offsetParent.className === "switch-group") {
        if (row.isActive == 1) return (row.isActive = 0)
        else return (row.isActive = 1)
      }
    }
  }
  useEffect(() => {
    fetchEmailManagementRequest()
  }, [])

  const detailsCapOneFormatter = (cell, row) => {
    return (
      <div>
        <span>{`${row.capOne.digit || "NA"}`}</span>
        {"  "}|{"  "}
        <span>{`${row.capOne.cvv || "NA"}`}</span>
      </div>
    )
  }
  const detailsAmexFormatter = (cell, row) => {
    return (
      <div>
        <span>{`${row.amex.digit || "NA"}`}</span> {"  "}|{"  "}{" "}
        <span>{`${row.amex.cvv || "NA"}`}</span>
      </div>
    )
  }

  const detailsComdataFormatter = (cell, row) => {
    return (
      <div>
        <span>{`${row.comdata.digit || "NA"}`}</span> {"  "}|{"  "}{" "}
        <span>{`${row.comdata.cvv || "NA"}`}</span>
      </div>
    )
  }

  const detailsCiti1Formatter = (cell, row) => {
    return (
      <div>
        <span>{`${row.citi1.digit || "NA"}`}</span> {"  "}|{"  "}{" "}
        <span>{`${row.citi1.cvv || "NA"}`}</span>
      </div>
    )
  }

  const detailsCiti2Formatter = (cell, row) => {
    return (
      <div>
        <span>{`${row.citi2.digit || "NA"}`}</span> {"  "}|{"  "}{" "}
        <span>{`${row.citi2.cvv || "NA"}`}</span>
      </div>
    )
  }

  // const detailsSeatScoutsStatus = (cell, row) => {
  //   var status = ""
  //   if (row.SeatScoutsStatus === true) {
  //     status = (
  //       <div className="green_txt">
  //         <i className="fa fa-check"></i>
  //       </div>
  //     )
  //   }
  //   if (row.SeatScoutsStatus === false) {
  //     status = (
  //       <div className="red_txt">
  //         <i className="fa fa-times"></i>
  //       </div>
  //     )
  //   }
  //   if (row.SeatScoutsStatus === "") {
  //     status = "NA"
  //   }
  //   return <div>{status}</div>
  // }

  const detailsOneTicketStatus = (cell, row) => {
    var status = ""
    if (row.oneTicketStatus === true) {
      status = (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      )
    }
    if (row.oneTicketStatus === false || row.oneTicketStatus === "") {
      status = (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      )
    }
    // if (row.oneTicketStatus === "") {
    //   status = "NA"
    // }
    return <div>{status}</div>
  }

  const tjtStatusFormatter = (cell, row) => {
    return (
      <div className="tbl_btn">
        <BootstrapSwitchButton
          checked={row.isActive == 1 ? true : false}
          onChange={evt => {
            updateEmailManagementRequest({
              updatedRow: {
                email: row.email,
                password: row.password,
                capOne: {
                  digit: row.capOne.digit,
                  cvv: row.capOne.cvv
                },
                amex: {
                  digit: row.amex.digit,
                  cvv: row.amex.cvv
                },
                comdata: {
                  digit: row.comdata.digit,
                  cvv: row.comdata.cvv
                },
                citi1: {
                  digit: row.citi1.digit,
                  cvv: row.citi1.cvv
                },
                citi2: {
                  digit: row.citi2.digit,
                  cvv: row.citi2.cvv
                },
                updatedDate: row.updatedDate,
                isActive: evt == true ? 1 : 0
              },
              venueId: false
            })
          }}
        />
      </div>
    )
  }

  return (
    <div>
      {showEmailEdit ? (
        <EmailEdit
          rowToEdit={rowToEdit}
          updateEmailManagementRequest={updateEmailManagementRequest}
          fetchEmailManagementRequest={fetchEmailManagementRequest}
          appReceiveAlert={appReceiveAlert}
          isEmailEdit={isEmailEditOpen => setShowEmailEdit(isEmailEditOpen)}
        />
      ) : (
        ""
      )}

      <div className="inner_main">
        <div className="full_width">
          <div className="row">
            <div className="col-sm-12">
              <div className="white_box mrgbtm50">
                <div className="cm_ttl">
                  <h2>Email Management</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  <div className="tbl_main email_tbl_main cm_tbl_btn_main">
                    <div className="inner_tbl">
                      {isFetching ? (
                        <Spinner />
                      ) : (
                        <BootstrapTable
                          data={Object.values(emailManagements)}
                          // data={data}
                          version="4"
                          striped
                          hover
                          pagination
                          options={options}
                          cellEdit={cellEditProp}
                          selectRow={selectRow}
                          trClassName={trClassName}
                          fetchInfo={{
                            dataTotalSize:
                              emailManagements.length === undefined
                                ? ""
                                : emailManagements.length
                          }}
                          deleteRow
                          insertRow
                          blurToSave={true}
                          search
                        >
                          <TableHeaderColumn
                            dataField="email"
                            editable={true}
                            isKey
                          >
                            Email
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="password"
                            editable={false}
                          >
                            Password
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="updatedDate"
                            editable={false}
                          >
                            Updated Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="capOne"
                            dataFormat={detailsCapOneFormatter}
                            editable={false}
                            dataAlign="center"
                          >
                            CapOne
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amex"
                            dataFormat={detailsAmexFormatter}
                            editable={false}
                            dataAlign="center"
                          >
                            Amex
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="comdata"
                            dataFormat={detailsComdataFormatter}
                            editable={false}
                          >
                            Comdata
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="citi1"
                            dataFormat={detailsCiti1Formatter}
                            editable={false}
                            dataAlign="center"
                          >
                            Citi #1
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="citi2"
                            dataFormat={detailsCiti2Formatter}
                            editable={false}
                            dataAlign="center"
                          >
                            Citi #2
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="lastUpdatedPassword"
                            editable={false}
                            dataAlign="center"
                          >
                            Last Updated Password
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="lastUpdatedDate"
                            editable={false}
                            dataAlign="center"
                          >
                            Last Updated Date
                          </TableHeaderColumn>
                          {/* <TableHeaderColumn
                          dataField="SeatScoutsStatus"
                          dataFormat={detailsSeatScoutsStatus}
                          editable={false}
                          dataAlign="center"
                        >
                          Seat Scouts Status
                        </TableHeaderColumn> */}
                          <TableHeaderColumn
                            dataField="oneTicketStatus"
                            dataFormat={detailsOneTicketStatus}
                            editable={false}
                            dataAlign="center"
                          >
                            One Ticket Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="tjStatus"
                            dataFormat={tjtStatusFormatter}
                            editable={false}
                            dataAlign="center"
                          >
                            TJ Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="button"
                            dataFormat={buttonFormatter}
                            dataAlign="center"
                            editable={false}
                            width="15%"
                          >
                            Action
                          </TableHeaderColumn>
                        </BootstrapTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isResetPasswordFetching ? (
            <div className="overlay-buyTicket">
              <div className="row">
                <div className="col-sm-12">
                  <Spinner spinnerTime={spinnerTime} />
                </div>
                <div className="col-sm-12" style={{ color: "black" }}>
                  <b>Please Wait Resetting Your Password...</b>
                </div>
              </div>
            </div>
          ) : (
            <div>{""}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailManagement
