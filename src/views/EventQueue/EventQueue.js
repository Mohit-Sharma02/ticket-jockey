import React, { useState, useEffect } from "react"
import { Button, OverlayTrigger, Tooltip, Form } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { withRouter } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { percentFormatter } from "../../components/TableColumnFormatter"
import {
  boolSortFunc,
  dateSortFuncForEvent,
  dateFormatterWithTZ,
  dateFormatter
} from "../../utils"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import BlackListSection from "../ManagedEvents/BlackListSection"
import "bootstrap-daterangepicker/daterangepicker.css"
var rowdata = []
const onRowSelect = (row, isSelected, e) => {
  if (isSelected) {
    rowdata.push(row.eventId)
  } else {
    rowdata = []
  }
}

const onSelectAll = (isSelected, rows) => {
  if (isSelected) {
    rows.map(item => {
      rowdata.push(item.eventId)
    })
  } else {
    rowdata = []
  }
}

const selectRow = {
  mode: "checkbox",
  // showOnlySelected: true,
  clickToExpand: true,
  customComponent: CustomMultiSelectTable,
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
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
const urlFormatter = (cell, row) => {
  var ticketMasterUrl = `https://www1.ticketmaster.com/event/${row.eventId}`
  return (
    <a
      href={row.eventUrl !== undefined ? row.eventUrl : ticketMasterUrl}
      target="_blank"
    >
      {row.eventId}
    </a>
  )
}

let blackListData = []
const EventQueue = ({
  isFetching,
  updateIsBlackListRequest,
  isBlackListingFetching,
  isAddBlackListFetching,
  FetchBlackListPriceSectionRequest,
  deleteBlackListSectionRequest,
  fetchEventStatisticRequest,
  fetchEventMonitorRequest,
  eventMonitor,
  updateIsMonitorRequest,
  blackListInfo,
  addBlackListPriceSectionRequest
}) => {
  const [blackListSectionModel, setBlackListSectionModal] = useState(false)
  const [eventId, setEventId] = useState("")
  const [is_blackList, setIsBlackList] = useState("")
  const [blacklistedSections, setBlacklistedSections] = useState("")
  useEffect(() => {
    fetchEventMonitorRequest()
  }, [])

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {dropRowKeys === undefined
            ? next.row.is_blackList === true
              ? "Are you sure you want to unblackList this events"
              : "Are you sure you want to blackList this events?"
            : "Are you sure you want to delete these  events?"}
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
            if (dropRowKeys !== undefined) {
            } else {
              updateIsBlackListRequest({
                eventId: next.eventId,
                is_blackList: next.is_blackList
              })
            }
          }
        }
      ]
    })
  }

  const updateIsMonitorEventQueue = () => {
    if (rowdata.length != 0) {
      var rowValue = rowdata
      rowdata = []
      updateIsMonitorRequest({
        body: {
          eventIds: rowValue,
          is_monitor: true
        }
      })
    }
  }

  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button color="primary" className="btn-pill" onClick={onBtnClick}>
          BlackList
        </Button>

        <Button
          color="primary"
          className="btn-pill"
          onClick={updateIsMonitorEventQueue}
        >
          Monitor
        </Button>
      </>
    )
  }

  const buttonFormatter = (cell, row, colIndex, column) => {
    return (
      <div class="tbl_btn bbtn_cls">
        <Button
          className="viewLog_btn"
          color="primary"
          aria-pressed="true"
          style={{ backgroundColor: row.is_monitor == 1 ? "grey" : "" }}
          disabled={row.is_monitor == 1 ? true : false}
          onClick={evt => {
            confirmAlert({
              title: "Warning",
              message: (
                <span>
                  Are you sure you want to start monitoring this event ?
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
                    if (row.is_monitor == 1) {
                      evt.preventDefault()
                      console.log("The link was clicked.")
                      return false
                    } else {
                      row.is_monitor = 1
                      rowdata.push(row.eventId)
                      updateIsMonitorRequest({
                        body: {
                          eventIds: rowdata,
                          is_monitor: row.is_monitor
                        }
                      })
                    }
                  }
                }
              ]
            })
            // if (row.is_monitor == 1) {
            //   evt.preventDefault()
            //   console.log("The link was clicked.")
            //   return false
            // } else {
            //   row.is_monitor = 1
            //   updateIsMonitorRequest({
            //     eventId: row.eventId,
            //     is_monitor: row.is_monitor
            //   })
            // }
          }}
        >
          Monitor
        </Button>
        <Button
          className="icon_btn"
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setEventId(row.eventId)
            setIsBlackList(row.is_blackList)
            setBlacklistedSections(row.blacklistedSections)
            setBlackListSectionModal(true)

            if (row.blackListData) {
              // setBlackListData(row.blackListData)
              blackListData = row.blackListData
            } else {
              blackListData = []
            }
          }}
        >
          BlackList Details
        </Button>
      </div>
    )
  }

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        {/* <div className="expand_row_inner">
          <label>TicketMaster URL</label>{" "}
          <span className="row_val">
            <a href={row.ticketMasterUrl} target="_blank">
              TicketMasterURL
            </a>
          </span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>Pct Avail</label>{" "}
          <span className="row_val">{percentFormatter(row.pctVenueAvail)}</span>
        </div> */}
        <div className="expand_row_inner">
          <label>SkyBox VenueId</label>{" "}
          <span className="row_val">{`${row.skyboxVenueId || ""}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available To Purchase</label>{" "}
          <span className="row_val">{`${row.availableToPurchase || ""}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available Offer</label>{" "}
          <span className="row_val">{`${row.availableOffers || ""}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Created Date</label>{" "}
          <span className="row_val">
            {" "}
            {`${dateFormatter(row.created_date) || ""}`}{" "}
          </span>
        </div>
        {/* <div className="expand_row_inner">
          <label>AISuggested Markup</label>{" "}
          <span className="row_val"> {`${row.aiSuggestedMarkup}`} </span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>Pre Sale</label>{" "}
          <span className="row_val"> {`${row.presale}`} </span>
        </div> */}
      </div>
    )
  }

  const iconFormatter = (cell, row) => {
    if (cell) {
      return (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      )
    } else {
      return (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      )
    }
  }

  const backListFormatter = (cell, row) => {
    return (
      <div className="tbl_btn" id={row.eventId}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blackList === true ? true : false}
            onChange={evt => {
              const payload = {
                eventId: row.eventId,
                is_blackList: evt,
                row: row
              }
              customConfirm(payload)
            }}
          />
          {/* <OverlayTrigger
            placement="left"
            overlay={<Tooltip>BlackList Section Details</Tooltip>}
          >
            <Button
              className="icon_btn"
              active
              color="primary"
              aria-pressed="true"
              onClick={() => {
                setEventId(row.eventId)
                setIsBlackList(row.is_blackList)
                setBlacklistedSections(row.blacklistedSections)
                setBlackListSectionModal(true)

                if (row.blackListData) {
                  setBlackListData(row.blackListData)
                }
              }}
            >
              <img
                src={require("./../../assets/img/blackList.png")}
                alt="BlackList Details"
              />
            </Button>
          </OverlayTrigger> */}
        </div>
      </div>
    )
  }

  const isExpandRow = () => {
    return true
  }

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />
    else return "No Data Found To Display"
  }
  const options = {
    page: 1,
    sizePerPage: 20,
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
    defaultSortName: "created_date", // default sort column name
    defaultSortOrder: "desc", // default sort order
    expandBy: "column",
    noDataText: noDataHandler(),
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentNode.parentElement.parentElement.className !==
        "is_blackList"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.broadcastState === true) return (row.broadcastState = false)
          else return (row.broadcastState = true)
        }
      } else {
        if (row.is_blackList === true) return (row.is_blackList = false)
        else return (row.is_blackList = true)
      }
    }
  }

  // const dateFormate = (row, cell) => {
  //   var date = dateFormatter(row.eventDate)
  //   return <span>{date}</span>
  // }

  return (
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
                  <h2>Events Queue</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  {/* <div className="table_head">
                  <div className="select_eq">
                    <div className="fl_eq_box">
                      <Form.Control
                        as="select"
                        value={chartType}
                        onChange={evt => {
                          setChartType(evt.target.value)
                          fetchEventStatisticRequest(evt.target.value)
                        }}
                      >
                        <option value="DAILY">Today</option>
                        <option value="WEEKLY">This Week</option>
                      </Form.Control>
                    </div>
                  </div>
                </div> */}
                  <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                    <div className="inner_tbl">
                      {isFetching ? (
                        <Spinner />
                      ) : (
                        <BootstrapTable
                          data={eventMonitor.eventsAdded}
                          version="4"
                          striped
                          hover
                          pagination
                          options={options}
                          cellEdit={cellEditProp}
                          selectRow={selectRow}
                          deleteRow
                          insertBtn
                          tableHeaderClass="custom-select-header-class"
                          tableBodyClass="custom-select-body-class"
                          expandableRow={isExpandRow}
                          expandComponent={expandRow}
                          expandColumnOptions={{ expandColumnVisible: true }}
                          search
                          blurToSave={true}
                        >
                          <TableHeaderColumn
                            dataField="created_date"
                            // dataSort
                            expandable={false}
                            editable={false}
                            // sort={"asc"}
                            dataFormat={dateFormatter}
                            hidden
                          >
                            created Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="eventId"
                            isKey
                            expandable={false}
                            dataFormat={urlFormatter}
                            editable={false}
                          >
                            EventId/TM URL
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="eventName"
                            expandable={false}
                            editable={false}
                          >
                            Event
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="eventAddress"
                            expandable={false}
                            editable={false}
                          >
                            Location
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="created_date"
                            dataSort
                            expandable={false}
                            editable={false}
                            sort={"asc"}
                            dataFormat={dateFormatter}
                            width="8%"
                          >
                            Created Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="eventDate"
                            dataSort
                            expandable={false}
                            editable={false}
                            sort={"asc"}
                            dataFormat={dateFormatter}
                          >
                            Event Date
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            expandable={false}
                            editable={false}
                            dataField="skyBoxEventId"
                          >
                            SkyBoxEventId
                          </TableHeaderColumn>

                          <TableHeaderColumn
                            dataField="pctVenueAvail"
                            // dataSort
                            expandable={false}
                            dataFormat={percentFormatter}
                            editable={false}
                          >
                            PctAvail
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            expandable={false}
                            dataField="presale"
                            dataSort
                            sortFunc={boolSortFunc}
                            editable={false}
                            dataFormat={iconFormatter}
                          >
                            PreSale
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            expandable={false}
                            //dataField="is_deleted"
                            dataField="is_blackList"
                            editable={false}
                            //  width="12%"
                            dataFormat={backListFormatter}
                          >
                            BlackList
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            expandable={false}
                            dataField="button"
                            dataFormat={buttonFormatter}
                            dataAlign="center"
                            editable={false}
                            width="10%"
                          >
                            Action
                          </TableHeaderColumn>
                        </BootstrapTable>
                      )}
                    </div>
                  </div>
                  {blackListSectionModel ? (
                    <BlackListSection
                      isBlackListingFetching={isBlackListingFetching}
                      isAddBlackListFetching={isAddBlackListFetching}
                      addBlackListPriceSectionRequest={
                        addBlackListPriceSectionRequest
                      }
                      FetchBlackListPriceSectionRequest={
                        FetchBlackListPriceSectionRequest
                      }
                      updateIsBlackListRequest={updateIsBlackListRequest}
                      blackListInfo={blackListInfo}
                      eventId={eventId}
                      blackListData={blackListData}
                      is_blackList={is_blackList}
                      blacklistedSections={blacklistedSections}
                      isBlackListModal={isBlackListModalOpen =>
                        setBlackListSectionModal(isBlackListModalOpen)
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventQueue
