import React, { useEffect, useState } from "react"
import {
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  Card
} from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { withRouter } from "react-router-dom"
import Spinner from "../../components/Spinner"
import EVenueEdit from "./EVenueEdit"
import { isUrlValid } from "../../utils/validation"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker"
import moment from "moment-timezone"

import Accordion from "react-bootstrap/Accordion"

import {
  ALERT_MSG_ERROR,
  ALERT_MSG_INFO,
  ALERT_MSG_WARN,
  ALERT_MSG_SUCCESS
} from "../../constants"
import { dateFormatter } from "../../utils"

class EVenueModel extends React.Component {
  handleSaveBtnClick = () => {
    const { columns, onSave, appReceiveAlert } = this.props

    const newRow = {}
    columns.forEach((column, i) => {
      if (column.name !== "Action") {
        if (column.field !== "venueId") {
          newRow[column.field] = this.refs[column.field].value
        }
      }
    }, this)

    if (
      newRow.name === "" &&
      newRow.url === "" &&
      newRow.timezone === "" &&
      newRow.city === "" &&
      newRow.state === "" &&
      newRow.zip === "" &&
      newRow.address === "" &&
      newRow.scraperURL === "" &&
      newRow.listingMainClass === "" &&
      newRow.detailsEventURLClass === "" &&
      newRow.eventTimeClass === "" &&
      newRow.eventMonthClass === "" &&
      newRow.eventDayClass === "" &&
      newRow.eventYearClass === ""
    ) {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: 'All  "*"  Information are required'
      })
    } else if (newRow.name === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Name is Required"
      })
    } else if (newRow.url === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Url is Required"
      })
    } else if (!isUrlValid(newRow.url)) {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Url Required in this Formate eg: http://www. or https://www"
      })
    } else if (newRow.timezone === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Time Zone is Required"
      })
    } else if (newRow.city === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "City is Required"
      })
    } else if (newRow.state === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "State is Required"
      })
    } else if (newRow.zip === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Zip Code is Required"
      })
    } else if (newRow.address === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Address is Required"
      })
    } else if (newRow.scraperURL === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Event List Url is Required"
      })
    } else if (newRow.listingMainClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Listing Main Class is Required"
      })
    } else if (newRow.detailsEventURLClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Details Event URL is Required"
      })
    } else if (newRow.eventTimeClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Event Time Class is Required"
      })
    } else if (newRow.eventMonthClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Event Month Class is Required"
      })
    } else if (newRow.eventDayClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Event Day Class is Required"
      })
    } else if (newRow.eventYearClass === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Event Year Class is Required"
      })
    } else {
      onSave(newRow)
    }
  }

  render() {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    } = this.props

    const headerStyle = {
      color: "black"
    }
    return (
      <div>
        <div className="animated">
          <Modal
            className="ReactModalPortal add_eVenue_popup"
            size="lg"
            centered
            show={true}
            onHide={onModalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title className="E-Venue_title">Add E-Venue</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                "max-height": "calc(100vh - 200px)",
                "overflow-y": "auto"
              }}
            >
              {columns.map((column, i) => {
                let { editable, format, field, name, hiddenOnInsert } = column

                if (name === "Action") {
                  return null
                }
                // if (name === "Stock Type") {
                //   // name = "Stock Type"
                //   return null
                // }
                if (hiddenOnInsert) {
                  return null
                }
                // if (name === "getEventsFromScraper") {
                //   name = "Get Events From Scraper"
                // }
                if (name === "name") {
                  name = "Name"
                }
                if (name === "venueId") {
                  name = "Venue Id"
                }
                if (name === "scraperURL") {
                  name = " Event List  URL"
                }
                if (name === "listingMainClass") {
                  name = "Listing Main Class"
                }
                if (name === "detailsEventURLClass") {
                  name = "Details Event URL Class"
                }
                if (name === "eventTimeClass") {
                  name = "Event Time Class"
                }
                if (name === "eventMonthClass") {
                  name = "Event Month Class"
                }
                if (name === "eventDayClass") {
                  name = "Event Day Class"
                }
                if (name === "eventYearClass") {
                  name = "Event Year Class"
                }

                const error = validateState[field] ? (
                  <span className="help-block bg-danger">
                    {validateState[field]}
                  </span>
                ) : null
                return (
                  <Form.Group key={field}>
                    <div className="row">
                      <div className="col-sm-4">
                        <Form.Label>
                          {name} <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                      </div>
                      <div className="col-sm-8">
                        <Form.Control
                          type="text"
                          placeholder={
                            name === "Url" ? "eg: https://www.xyz.com/" : name
                          }
                          ref={field}
                          style={{
                            height: "50px",
                            padding: "0 10px",
                            float: "left",
                            fontSize: "15px",
                            color: "#212529",
                            background: "#fff !important",
                            border: "1px solid rgba(25, 38, 48, 0.5)"
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>
                )
              })}
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

var rowToEdit = {}
const EVenue = ({
  eVenues,
  updateEVenueRequest,
  deleteEVenueRequest,
  fetchEVenueRequest,
  isFetching,
  createEVenueRequest,
  updateIsBlackListEvenueRequest,
  appReceiveAlert,
  history,
  setSelectedVenue
}) => {
  let now = new Date()
  let local = {
    format: "YYYY-MM-DD HH:mm:ss",
    sundayFirst: false
  }
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
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment(start).subtract(1, "years"), moment(end)]
  }
  const [page, setPage] = useState(1)
  const [searchStartDate, setSearchStartDate] = useState()
  const [searchEndDate, setSearchEndDate] = useState()
  const [sizePerPage, setSizePerPage] = useState(20)
  const [showEVenueEdit, setShowEVenueEdit] = useState(false)
  const [emailExists, setEmailExists] = useState("")

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

  const customConfirmForBlacklist = data => {
    console.log("row", data)
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {data.is_blackList === false
            ? "Are you sure you want to unblackList this Evenue"
            : "Are you sure you want to blackList this Evenue?"}
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel"
        },
        {
          label: "Confirm",
          onClick: () => {
            updateIsBlackListEvenueRequest({
              venueId: data.venueId,
              is_blackList: data.is_blackList
            })
          }
        }
      ]
    })
  }

  const backListFormatter = (cell, row) => {
    if (row.is_blackList == 1) row.is_blackList = true
    else row.is_blackList = false

    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blackList === true ? true : false}
            onChange={evt => {
              const payload = {
                venueId: row.venueId,
                is_blackList: evt,
                row: row
              }
              customConfirmForBlacklist(payload)
            }}
          />
        </div>
      </div>
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
            delete row._id
            delete row._rev
            delete row.is_deleted
            delete row.status
            delete row.created_date
            delete row.updated_date
            delete row.timestamp
            delete row.type
            delete row.getEventsFromScraper
            rowToEdit = row
            setShowEVenueEdit(true)
          }}
        >
          Update E-Venue
        </Button>
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setSelectedVenue(row)
            // console.log("row", row)
            history.push({
              pathname: `/eVenueDetail/${row.venueId}`
              // state: { from: "ManagedEvents" }
            })
          }}
        >
          Details
        </Button>
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            var newUrl =
              row.APIBASEURL +
              "/cgi-bin/ncommerce3/SEGetGroupList?linkID=" +
              row.linkID
            window.open(newUrl, "_blank")
            return false
          }}
        >
          go To Site
        </Button>
      </div>
    )
  }

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        {/* <div className="expand_row_inner">
          <label>Get Events From Scraper</label>{" "}
          <span className="row_val">{`${row.getEventsFromScraper}`}</span>
        </div> */}

        <div className="expand_row_inner">
          <label>Event List URL</label>{" "}
          <span className="row_val">{`${row.scraperURL}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Time Zone</label>{" "}
          <span className="row_val">{`${row.timezone}`}</span>
        </div>

        {/* <div className="expand_row_inner">
          <label>Stock Type</label>{" "}
          <span className="row_val">{`${row.stockType}`}</span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>Listing Main Class</label>{" "}
          <span className="row_val">{`${row.listingMainClass}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Details Event URL Class</label>{" "}
          <span className="row_val">{`${row.detailsEventURLClass}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Event Time Class</label>{" "}
          <span className="row_val">{`${row.eventTimeClass}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Event Month Class</label>{" "}
          <span className="row_val">{`${row.eventMonthClass}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Event Day Class</label>{" "}
          <span className="row_val">{`${row.eventDayClass}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Event Year Class</label>{" "}
          <span className="row_val">{`${row.eventYearClass}`}</span>
        </div> */}
      </div>
    )
  }

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span> Are you sure you want to delete these managed venues? </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            dropRowKeys.forEach(key => {
              deleteEVenueRequest({ venueId: key })
            })
            next()
          }
        }
      ]
    })
  }

  const handlePageChange = (page, sizePerPage) => {
    window.scrollTo(0, 0)
  }

  const isExpandRow = () => {
    return true
  }

  const handleInsertedRow = row => {
    if (row.url.indexOf("www") == -1) {
      row.url = row.url.split("//")[0] + "//www." + row.url.split("//")[1]
    }
    row["venueId"] = row.url.split(".")[1]
    createEVenueRequest(row)
  }

  const createCustomModal = (
    onModalClose,
    onSave,
    columns,
    validateState,
    ignoreEditable
  ) => {
    const attr = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable
    }
    return <EVenueModel {...attr} appReceiveAlert={appReceiveAlert} />
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
    insertText: "Add E-Venue",
    expandBy: "column",
    afterInsertRow: handleInsertedRow,
    insertModal: createCustomModal,
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentElement.parentElement.parentElement.className ===
        "is_blackList"
      ) {
        if (row.is_blackList === true) return (row.is_blackList = false)
        else return (row.is_blackList = true)
      }
    }
  }
  useEffect(() => {
    fetchEVenueRequest({
      searchStartDate: searchStartDate
        ? searchStartDate.format("YYYY-MM-DD")
        : "",
      searchEndDate: searchEndDate ? searchEndDate.format("YYYY-MM-DD") : "",
      emailExists
    })
  }, [])

  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate)
    setSearchEndDate(endDate)
  }
  const checkEmailExistOrnor = (cell, row) => {
    var status = ""
    if (row.emailExists === true) {
      status = (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      )
    }
    if (row.emailExists === false || row.emailExists === "") {
      status = (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      )
    }
    return <div>{status}</div>
  }
  return (
    <div>
      {showEVenueEdit ? (
        <EVenueEdit
          rowToEdit={rowToEdit}
          updateEVenueRequest={updateEVenueRequest}
          fetchEVenueRequest={fetchEVenueRequest}
          appReceiveAlert={appReceiveAlert}
          isEVenueEdit={isEVenueEditOpen => setShowEVenueEdit(isEVenueEditOpen)}
        />
      ) : (
        ""
      )}
      <div className="full_width">
        <div className="page_name">
          <h2>Event Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>E-Venue</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main cm_tbl_btn_main nw_od_cls">
                      <div className="table_head acc_main">
                        <div className="filterCV">
                          <Accordion>
                            <Card>
                              <Accordion.Toggle
                                className="cm_ttl"
                                as={Card.Header}
                                eventKey="0"
                              >
                                <h2>Filter Options</h2>
                              </Accordion.Toggle>

                              <Accordion.Collapse eventKey="0">
                                <div className="select_eq filter_filed">
                                  <div className="fl_eq_box rangeCls">
                                    <label className="searchHead">
                                      Created Date
                                    </label>
                                    <div className="date_picker dateCls">
                                      <DateTimeRangeContainer
                                        ranges={ranges}
                                        start={start}
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
                                              searchStartDate &&
                                              searchEndDate !== undefined
                                                ? searchStartDate.format(
                                                    "YYYY-MM-DD"
                                                  ) +
                                                  " to " +
                                                  searchEndDate.format(
                                                    "YYYY-MM-DD"
                                                  )
                                                : "Enter Start Date - End Date"
                                            }
                                            placeholder="Search...."
                                          />
                                          <span className="input-group-btn">
                                            <Button className="default date-range-toggle">
                                              <i className="fa fa-calendar" />
                                            </Button>
                                          </span>
                                        </div>
                                      </DateTimeRangeContainer>
                                    </div>
                                  </div>

                                  <div
                                    className="fl_eq_box"
                                    style={{ marginRight: "1%" }}
                                  >
                                    <label className="searchHead">
                                      Email Exists
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={emailExists}
                                      // placeholder="Search..."
                                      onChange={evt =>
                                        setEmailExists(evt.target.value)
                                      }
                                    >
                                      <option value="">Show All</option>
                                      <option value="true">Show True</option>
                                      <option value="false">Show False</option>
                                    </Form.Control>
                                  </div>
                                  <div className="fl_eq_box src_btn">
                                    <label className="searchHead">&nbsp;</label>
                                    <div className="fl_w">
                                      <Button
                                        color="primary"
                                        className="btn-pill"
                                        onClick={() => {
                                          fetchEVenueRequest({
                                            searchStartDate: searchStartDate
                                              ? searchStartDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "",
                                            searchEndDate: searchEndDate
                                              ? searchEndDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "",
                                            emailExists
                                          })
                                        }}
                                      >
                                        Search
                                      </Button>
                                      <button
                                        color="primary"
                                        type="button"
                                        className="btn-pill btn btn-primary clr_fil red_txt"
                                        onClick={() => {
                                          setSearchStartDate()
                                          setSearchEndDate()
                                          setEmailExists("")
                                          fetchEVenueRequest({
                                            searchStartDate: "",
                                            searchEndDate: "",
                                            emailExists: ""
                                          })
                                        }}
                                      >
                                        <i className="fa fa-times"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </div>
                      </div>
                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : (
                          <BootstrapTable
                            data={Object.values(eVenues)}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            fetchInfo={{
                              dataTotalSize:
                                eVenues.length === undefined
                                  ? ""
                                  : eVenues.length
                            }}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            insertRow
                            //  remote
                            blurToSave={true}
                            search
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                          >
                            {/* <TableHeaderColumn
                          dataField="venueId"
                          hidden
                          isKey
                          hiddenOnInsert
                        >
                          venueId
                        </TableHeaderColumn> */}
                            <TableHeaderColumn
                              dataField="name"
                              expandable={false}
                              editable={false}
                            >
                              Name
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="url"
                              expandable={false}
                              editable={false}
                              isKey
                            >
                              Url
                            </TableHeaderColumn>
                            {/* <TableHeaderColumn
                            dataField="timezone"
                            expandable={false}
                            editable={false}
                          >
                            Time Zone
                          </TableHeaderColumn> */}

                            <TableHeaderColumn
                              dataField="created_date"
                              expandable={false}
                              editable={false}
                              dataFormat={dateFormatter}
                            >
                              Created Date
                            </TableHeaderColumn>

                            {/* <TableHeaderColumn
                          dataField="stockType"
                          expandable={false}
                        >
                          Stock Type
                        </TableHeaderColumn> */}

                            <TableHeaderColumn
                              dataField="city"
                              expandable={false}
                              editable={false}
                            >
                              City
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="state"
                              expandable={false}
                              editable={false}
                            >
                              State
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="zip"
                              expandable={false}
                              editable={false}
                            >
                              Zip Code
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="address"
                              expandable={false}
                              editable={false}
                            >
                              Address
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="emailExits"
                              dataFormat={checkEmailExistOrnor}
                            >
                              Email Exist
                            </TableHeaderColumn>

                            {/* <TableHeaderColumn
                          dataField="getEventsFromScraper"
                          hidden
                        >
                          getEventsFromScraper
                        </TableHeaderColumn> */}

                            <TableHeaderColumn dataField="scraperURL" hidden>
                              scraperURL
                            </TableHeaderColumn>

                            {/* <TableHeaderColumn
                            dataField="listingMainClass"
                            hidden
                          >
                            listingMainClass
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField="detailsEventURLClass"
                            hidden
                          >
                            detailsEventURLClass
                          </TableHeaderColumn>

                          <TableHeaderColumn dataField="eventTimeClass" hidden>
                            eventTimeClass
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="eventMonthClass" hidden>
                            eventMonthClass
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="eventDayClass" hidden>
                            eventDayClass
                          </TableHeaderColumn>

                          <TableHeaderColumn dataField="eventYearClass" hidden>
                            eventYearClass
                          </TableHeaderColumn> */}
                            <TableHeaderColumn
                              expandable={false}
                              //dataField="is_deleted"
                              dataField="is_blackList"
                              editable={false}
                              dataFormat={backListFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataFormat={buttonFormatter}
                              dataAlign="center"
                              editable={false}
                              expandable={false}
                              width="32%"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(EVenue)
