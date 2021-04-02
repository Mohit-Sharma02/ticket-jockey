import React, { useEffect, useState, withRouter } from "react"
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
import EmailEdit from "../EmailManagement/EmailEdit"

import { pctValidation } from "../../utils/validation"

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
      venueId,
      createEmailManagementRequest
    } = this.props
    const newRow = {}
    newRow["email"] = this.refs.email.value
    newRow["password"] = this.refs.password.value
    newRow["phoneNumber"] = this.refs.phoneNumber.value
    newRow["address"] = this.refs.address.value
    newRow["name"] = this.refs.name.value
    newRow["capOne"] = {
      digit: this.refs.capOneDigit.value,
      cvv: this.refs.capOneCvv.value,
      month: this.refs.capOneMonth.value,
      year: this.refs.capOneYear.value
    }
    newRow["amex"] = {
      digit: this.refs.amexDigit.value,
      cvv: this.refs.amexCvv.value,
      month: this.refs.amexMonth.value,
      year: this.refs.amexYear.value
    }
    newRow["comdata"] = {
      digit: this.refs.comdataDigit.value,
      cvv: this.refs.comdataCvv.value,
      month: this.refs.comdataMonth.value,
      year: this.refs.comdataYear.value
    }
    newRow["citi1"] = {
      digit: this.refs.citi1Digit.value,
      cvv: this.refs.citi1Cvv.value,
      month: this.refs.citi1Month.value,
      year: this.refs.citi1Year.value
    }
    newRow["citi2"] = {
      digit: this.refs.citi2Digit.value,
      cvv: this.refs.citi2Cvv.value,
      month: this.refs.citi2Month.value,
      year: this.refs.citi2Year.value
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
      createEmailManagementRequest({ newRow, venueId })
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
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Name</Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control type="text" placeholder="Name" ref="name" />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Phone Number</Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="number"
                      placeholder="Phone Number"
                      ref="phoneNumber"
                      maxLength="15"
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Address</Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      ref="address"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>CapOne</Form.Label>
                  </div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      placeholder="CapOne"
                      ref="capOneDigit"
                      // maxLength="4"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      //maxLength="4"
                      ref="capOneCvv"
                    />
                  </div>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref="capOneMonth"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref="capOneYear"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Amex</Form.Label>
                  </div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      placeholder="Amex"
                      ref="amexDigit"
                      // maxLength="4"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      // maxLength="4"
                      ref="amexCvv"
                    />
                  </div>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref="amexMonth"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref="amexYear"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>ComData</Form.Label>
                  </div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      placeholder="ComData"
                      ref="comdataDigit"
                      // maxLength="4"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      ref="comdataCvv"
                    />
                  </div>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref="comdataMonth"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref="comdataYear"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Citi #1</Form.Label>
                  </div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      placeholder="Citi #1"
                      ref="citi1Digit"
                      //maxLength="4"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      // maxLength="4"
                      ref="citi1Cvv"
                    />
                  </div>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref="citi1Month"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref="citi1Year"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="input_mrg_cls">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Citi #2</Form.Label>
                  </div>
                  <div className="col-sm-3">
                    <Form.Control
                      type="text"
                      placeholder="Citi #2"
                      ref="citi2Digit"
                      // maxLength="4"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      // maxLength="4"
                      ref="citi2Cvv"
                    />
                  </div>
                  <div className="col-sm-1">
                    <Form.Control
                      type="text"
                      placeholder="MM"
                      ref="citi2Month"
                    />
                  </div>
                  <div className="col-sm-2">
                    <Form.Control
                      type="text"
                      placeholder="YYYY"
                      ref="citi2Year"
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
const EVenueDetail = ({
  emailManagements,
  updateEmailManagementRequest,
  deleteEmailManagementRequest,
  fetchEmailManagementRequest,
  isFetching,
  isResetPasswordFetching,
  createEmailManagementRequest,
  // resetEmailPasswordRequest,
  updatePriceMarkUpPctForVenueRequest,
  appReceiveAlert,
  selectedEvenue,
  match
}) => {
  const { priceMarkupPct, is_priceMarkupPct } = selectedEvenue //the selected evenue when user click 'details' on a specific evenue

  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(20)
  const [showEmailEdit, setShowEmailEdit] = useState(false)
  const [spinnerTime, setSpinnerTime] = useState(false)
  const [venueId, setVenueId] = useState(match.params.venueId)
  const [pctValue, setPctValue] = useState(
    priceMarkupPct !== undefined ? priceMarkupPct : 0
  )
  const [isPctValue, setIsPctValue] = useState(
    is_priceMarkupPct !== undefined ? is_priceMarkupPct : false
  )
  let passwordNew = ""
  const selectRow = {
    mode: "checkbox",
    clickToExpand: true
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
            deleteEmailManagementRequest({ dropRowKeys, venueId })
            next()
          }
        }
      ]
    })
  }

  const handlePageChange = (page, sizePerPage) => {
    window.scrollTo(0, 0)
  }

  const handleInsertedRow = row => {
    console.log("after call")
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
        venueId={match.params.venueId}
      />
    )
  }

  const trClassName = row => {
    if (row.error_description === "Account locked") {
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
    const { venueId } = match.params
    fetchEmailManagementRequest({ venueId })
    console.log("key", venueId)
    console.log("selecte", selectedEvenue)
  }, [])

  const detailsCapOneFormatter = (cell, row) => {
    return (
      <div>
        <span>
          {" "}
          <b> Card: </b>
          {`${row.capOne.digit || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> CVV: </b>
          {`${row.capOne.cvv || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> Exp Date: </b>
          {`${row.capOne.month || "NA"}`}/{`${row.capOne.year || "NA"}`}
        </span>
        <br />
      </div>
    )
  }
  const detailsAmexFormatter = (cell, row) => {
    return (
      <div>
        <span>
          <b> Card: </b>
          {`${row.amex.digit || "NA"}`}
        </span>
        <br />
        <span>
          <b> CVV: </b>
          {`${row.amex.cvv || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> Exp Date: </b>
          {`${row.amex.month || "NA"}`}/{`${row.amex.year || "NA"}`}
        </span>
        <br />
      </div>
    )
  }

  const detailsComdataFormatter = (cell, row) => {
    return (
      <div>
        <span>
          {" "}
          <b> Card: </b>
          {`${row.comdata.digit || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> CVV: </b>
          {`${row.comdata.cvv || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> Exp Date: </b>
          {`${row.comdata.month || "NA"}`}/{`${row.comdata.year || "NA"}`}
        </span>
        <br />
      </div>
    )
  }

  const detailsCiti1Formatter = (cell, row) => {
    return (
      <div>
        <span>
          {" "}
          <b> Card: </b>
          {`${row.citi1.digit || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> CVV: </b>
          {`${row.citi1.cvv || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> Exp Date: </b>
          {`${row.citi1.month || "NA"}`}/{`${row.citi1.year || "NA"}`}
        </span>
        <br />
      </div>
    )
  }

  const detailsCiti2Formatter = (cell, row) => {
    return (
      <div>
        <span>
          {" "}
          <b> Card: </b>
          {`${row.citi2.digit || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> CVV: </b>
          {`${row.citi2.cvv || "NA"}`}
        </span>
        <br />
        <span>
          {" "}
          <b> Exp Date: </b>
          {`${row.citi2.month || "NA"}`}/{`${row.citi2.year || "NA"}`}
        </span>
        <br />
      </div>
    )
  }

  const detailsOneTicketStatus = row => {
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
                name: row.name,
                address: row.address,
                phoneNumber: row.phoneNumber,
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
              venueId: venueId ? venueId : false
            })
          }}
        />
      </div>
    )
  }

  const isExpandRow = () => {
    return true
  }

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>Name</label> <span className="row_val">{`${row.name}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Address</label>{" "}
          <span className="row_val">{`${row.address}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Phone Number</label>{" "}
          <span className="row_val">{`${row.phoneNumber}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Updated Date</label>{" "}
          <span className="row_val"> {`${row.updatedDate}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Last Updated Date</label>{" "}
          <span className="row_val">{`${row.lastUpdatedDate || ""}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>last Updated Password</label>{" "}
          <span className="row_val">
            {" "}
            {`${row.lastUpdatedPassword || ""}`}{" "}
          </span>
        </div>
        <div className="expand_row_inner">
          <label>One Ticket Status</label>{" "}
          <span className="row_val">{detailsOneTicketStatus(row)}</span>
        </div>
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
          venueId={match.params.venueId}
          appReceiveAlert={appReceiveAlert}
          isEmailEdit={isEmailEditOpen => setShowEmailEdit(isEmailEditOpen)}
          EVenueDetail={true}
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
                  <h2>Email Management For {venueId}</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  <div className="tbl_main email_tbl_main cm_tbl_btn_main">
                    <div className="inner_tbl">
                      {isFetching ? (
                        <Spinner />
                      ) : (
                        <BootstrapTable
                          data={Object.values(emailManagements)}
                          version="4"
                          striped
                          hover
                          pagination
                          options={options}
                          cellEdit={cellEditProp}
                          selectRow={selectRow}
                          trClassName={trClassName}
                          expandableRow={isExpandRow}
                          expandComponent={expandRow}
                          expandColumnOptions={{ expandColumnVisible: true }}
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
                            expandable={false}
                            isKey
                          >
                            Email
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="password"
                            editable={false}
                            expandable={false}
                          >
                            Password
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="capOne"
                            dataFormat={detailsCapOneFormatter}
                            editable={false}
                            expandable={false}
                            // dataAlign="center"
                          >
                            CapOne
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amex"
                            dataFormat={detailsAmexFormatter}
                            editable={false}
                            expandable={false}
                            // dataAlign="center"
                          >
                            Amex
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="comdata"
                            dataFormat={detailsComdataFormatter}
                            editable={false}
                            expandable={false}
                          >
                            Comdata
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="citi1"
                            dataFormat={detailsCiti1Formatter}
                            editable={false}
                            expandable={false}
                            // dataAlign="center"
                          >
                            Citi #1
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="citi2"
                            dataFormat={detailsCiti2Formatter}
                            editable={false}
                            expandable={false}
                            // dataAlign="center"
                          >
                            Citi #2
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="tjStatus"
                            dataFormat={tjtStatusFormatter}
                            editable={false}
                            expandable={false}
                            dataAlign="center"
                          >
                            TJ Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="button"
                            dataFormat={buttonFormatter}
                            dataAlign="center"
                            editable={false}
                            expandable={false}
                            width="13%"
                          >
                            Action
                          </TableHeaderColumn>
                        </BootstrapTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="white_box mrgbtm50 price_sec">
                <div className="cm_ttl">
                  <h2>Custom Pricing</h2>
                </div>
                <div className="inner_box_body padL3T5 tbl_main">
                  <div className="row">
                    <div className="col-sm-12">
                      <Form.Control
                        type="Number"
                        defaultValue={pctValue}
                        placeholder="Custom Pricing"
                        onChange={evt => setPctValue(evt.target.value)}
                        style={{ maxWidth: "320px" }}
                      />
                      <div className="tbl_btn">
                        <BootstrapSwitchButton
                          checked={isPctValue}
                          onChange={evt => {
                            setIsPctValue(evt)
                          }}
                        />
                      </div>

                      <div className="btn-group">
                        <Button
                          onClick={() => {
                            var valid = ""
                            valid = pctValidation(pctValue, isPctValue)
                            if (valid == false) {
                              appReceiveAlert({
                                type: ALERT_MSG_ERROR,
                                message: "Number must br greater than 0"
                              })
                            } else {
                              updatePriceMarkUpPctForVenueRequest({
                                venueId: match.params.venueId,
                                pctValue,
                                isPctValue
                              })
                            }
                          }}
                        >
                          Save
                        </Button>
                      </div>
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

export default EVenueDetail
