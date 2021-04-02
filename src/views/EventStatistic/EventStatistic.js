import React, { useEffect, useRef, useState } from "react"
import { Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import "bootstrap-daterangepicker/daterangepicker.css"
import Spinner from "../../components/Spinner"
import { Line } from "react-chartjs-2"
import { percentFormatter } from "../../components/TableColumnFormatter"
import moment from "moment-timezone"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker"
import Accordion from "react-bootstrap/Accordion"
import {
  boolSortFunc,
  dateSortFuncForEvent,
  dateFormatterWithTZ,
  dateFormatter
} from "../../utils"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import { getLabel, getData, getVenueData } from "../../utils/validation"

const selectRow = {
  mode: "checkbox",
  // showOnlySelected: true,
  clickToExpand: true,
  customComponent: CustomMultiSelectTable
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

const createCustomDeleteButton = onBtnClick => {
  return (
    <Button color="primary" className="btn-pill" onClick={onBtnClick}>
      BlackList
    </Button>
  )
}

const EventStatistic = ({
  isFetching,
  fetchEventStatisticRequest,
  eventStatistic
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
  const [chartType, setChartType] = useState("DAILY")
  const [eventType, setEventType] = useState("EVENTADDED")
  const [data, setData] = useState([])
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
  useEffect(() => {
    // fetchEventStatisticRequest("DAILY")
    fetchEventStatisticRequest({
      startDate: moment(start).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
    })
    if (eventType === "EVENTADDED") {
      setData(eventStatistic.eventsAdded)
    } else if (eventType === "VENUEADDED") {
      setData(eventStatistic.venuesAdded)
    } else if (eventType === "EVENTCANCEL") {
      setData(eventStatistic.eventsCancel)
    } else if (eventType === "EVENTPOSTPONED") {
      setData(eventStatistic.eventPostPond)
    } else {
      setData([])
    }
  }, [])

  var chartData = {
    labels: getLabel(
      moment(start).format("YYYY-MM-DD"),
      moment(end).format("YYYY-MM-DD")
    ),
    showInLegend: true,
    datasets: [
      {
        label: "Total Venues",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getVenueData(
          eventStatistic.venuesAdded,
          moment(start).format("YYYY-MM-DD"),
          moment(end).format("YYYY-MM-DD")
        )
      }
    ]
  }

  var eventChartData = {
    labels: getLabel(
      moment(start).format("YYYY-MM-DD"),
      moment(end).format("YYYY-MM-DD")
    ),
    showInLegend: true,
    datasets: [
      {
        label: "Total Events",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getData(
          eventStatistic.eventsAdded,
          moment(start).format("YYYY-MM-DD"),
          moment(end).format("YYYY-MM-DD")
        )
      }
    ]
  }

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length

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

  const isExpandRow = () => {
    return true
  }

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />
    else return "No Data Found To Display"
  }

  const options = {
    page: 1, // which page you want to show as default
    // sizePerPageList: [10,  30, 50, 60],
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
    //handleConfirmDeleteRow: customConfirm,
    //defaultSortName: "formattedEventDate", // default sort column name
    //defaultSortOrder: "asc", // default sort order
    expandBy: "column",
    noDataText: noDataHandler()
  }
  // function remote(remoteObj) {
  //   // it means that only pagination you will handle by your own
  //   remoteObj.pagination = true
  //   return remoteObj
  // }
  const cardstyle = {
    color: "black",
    textAlign: "center"
  }

  const applyCallback = (startDate, endDate) => {
    setStart(startDate)
    setEnd(endDate)
    fetchEventStatisticRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss")
    })
  }

  return (
    <div className="animated fadeIn">
      <div className="full_width">
        <div className="page_name">
          <h2>Event-Venue Statistics</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="inner_box_body padL3T5">
              <div className="tbl_main  order_tbl_main nw_od_cls">
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
                                  start={start}
                                  end={end}
                                  local={local}
                                  // maxDate={maxDate}
                                  applyCallback={applyCallback}
                                  style={{
                                    standaloneLayout: { left: "149px" }
                                  }}
                                >
                                  <Form.Control
                                    id="formControlsTextB"
                                    type="text"
                                    label="Text"
                                    value={
                                      moment(start).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                      ) +
                                      " To " +
                                      moment(end).format("YYYY-MM-DD HH:mm:ss")
                                    }
                                    placeholder="Search...."
                                  />

                                  <span className="input-group-btn">
                                    <Button className="default date-range-toggle">
                                      <i className="fa fa-calendar" />
                                    </Button>
                                  </span>
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
                    <h2>Event Info</h2>
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
                              <h1>
                                {eventStatistic.length == 0
                                  ? 0
                                  : eventStatistic.eventsAdded.length}
                              </h1>
                              <Card.Title>Event Added</Card.Title>
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
                              <h1>
                                {eventStatistic.length == 0
                                  ? 0
                                  : eventStatistic.venuesAdded.length}
                              </h1>
                              <Card.Title>Venue Added</Card.Title>
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
                              <h1>
                                {eventStatistic.length == 0
                                  ? 0
                                  : eventStatistic.eventsCancel.length}
                              </h1>
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
                              <h1>
                                {eventStatistic.length == 0
                                  ? 0
                                  : eventStatistic.eventPostPond.length}
                              </h1>
                              <Card.Title>Event PostPoned</Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="white_box mrgbtm50">
                  <div className="cm_ttl dis_inline">
                    <h2>Event/Venue Statistic Table</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main tranfer_lst_tbl_main">
                      <div className="table_head log_thead">
                        <div className="select_eq">
                          <div className="fl_eq_box">
                            <Form.Control
                              as="select"
                              value={eventType}
                              onChange={evt => {
                                setEventType(evt.target.value)
                                // resetTable(evt.target.value)
                              }}
                            >
                              <option value="EVENTADDED">Event Added</option>
                              <option value="VENUEADDED">Venue Added</option>
                              <option value="EVENTCANCEL">Event Cancel</option>
                              <option value="EVENTPOSTPONED">
                                Event PostPoned
                              </option>
                            </Form.Control>
                          </div>
                        </div>
                      </div>

                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : eventType === "EVENTADDED" ? (
                          <BootstrapTable
                            data={eventStatistic.eventsAdded}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            tableHeaderClass="custom-select-header-class"
                            tableBodyClass="custom-select-body-class"
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                            search
                            // fetchInfo={{ dataTotalSize: data.length }}
                            // cellClick={handleTableChange}
                            // remote={remote}
                            blurToSave={true}
                            // ref={filterTable}
                          >
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
                              dataField="eventDate"
                              dataSort
                              expandable={false}
                              editable={false}
                              sort={"asc"}
                              dataFormat={dateFormatter}
                            >
                              Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
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
                              dataField="is_deleted"
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                          </BootstrapTable>
                        ) : eventType === "EVENTCANCEL" ? (
                          <BootstrapTable
                            data={eventStatistic.eventsCancel}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            tableHeaderClass="custom-select-header-class"
                            tableBodyClass="custom-select-body-class"
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                            search
                            // fetchInfo={{ dataTotalSize: data.length }}
                            // cellClick={handleTableChange}
                            // remote={remote}
                            blurToSave={true}
                            // ref={filterTable}
                          >
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
                              dataField="eventDate"
                              dataSort
                              expandable={false}
                              editable={false}
                              sort={"asc"}
                              dataFormat={dateFormatter}
                            >
                              Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
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
                              dataField="is_deleted"
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                          </BootstrapTable>
                        ) : eventType === "EVENTPOSTPONED" ? (
                          <BootstrapTable
                            data={eventStatistic.eventPostPond}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            tableHeaderClass="custom-select-header-class"
                            tableBodyClass="custom-select-body-class"
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                            search
                            // fetchInfo={{ dataTotalSize: data.length }}
                            // cellClick={handleTableChange}
                            // remote={remote}
                            blurToSave={true}
                            // ref={filterTable}
                          >
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
                              dataField="eventDate"
                              dataSort
                              expandable={false}
                              editable={false}
                              sort={"asc"}
                              dataFormat={dateFormatter}
                            >
                              Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
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
                              dataField="is_deleted"
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                          </BootstrapTable>
                        ) : (
                          <BootstrapTable
                            data={eventStatistic.venuesAdded}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            // fetchInfo={{ dataTotalSize: managedVenues.totalRow }}
                            // expandableRow={isExpandableRow}
                            // expandComponent={expandComponent}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            // deleteRow
                            //  remote={remote}
                            blurToSave={true}
                            // search
                          >
                            <TableHeaderColumn dataField="keyword">
                              Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="city">
                              City
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="state">
                              State
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="address">
                              Address
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="zip">
                              Zip Code
                            </TableHeaderColumn>
                            {/* <TableHeaderColumn
                          dataField="stockType"
                          dataAlign="center"
                          editable={false}
                          editable={{
                            type: "select",
                            options: { values: stockTypes }
                          }}
                        >
                          StockType
                        </TableHeaderColumn> */}
                            <TableHeaderColumn
                              dataField="tMasterVenueId"
                              isKey
                              dataFormat={urlFormatter}
                            >
                              TMasterVenueId
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="skyboxVenueId">
                              SkyboxVenueId
                            </TableHeaderColumn>
                          </BootstrapTable>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fl_w">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Event Statistic</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <div className="chart_cover">
                                {isLineEmpty ? (
                                  <Line
                                    height={350}
                                    data={eventChartData}
                                    options={{
                                      maintainAspectRatio: false,
                                      tooltips: {
                                        callbacks: {
                                          label: function(t, d) {
                                            var xLabel =
                                              d.datasets[t.datasetIndex].label
                                            var yLabel = t.yLabel
                                            return xLabel + ": " + yLabel
                                          }
                                        }
                                      },
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                              callback: function(
                                                value,
                                                index,
                                                values
                                              ) {
                                                return value
                                              }
                                            }
                                          }
                                        ],
                                        xAxes: [
                                          {
                                            gridLines: {
                                              display: false
                                            }
                                          }
                                        ]
                                      },
                                      title: {
                                        display: true,
                                        text: "",
                                        fontSize: 20
                                      },

                                      legend: {
                                        display: true,
                                        position: "bottom",
                                        labels: {
                                          usePointStyle: true
                                        },
                                        responsive: {
                                          display: false
                                        }
                                      }
                                    }}
                                  />
                                ) : (
                                  <Spinner />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Venue Statistic</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <div className="chart_cover">
                                {isLineEmpty ? (
                                  <Line
                                    height={350}
                                    data={chartData}
                                    options={{
                                      maintainAspectRatio: false,
                                      tooltips: {
                                        callbacks: {
                                          label: function(t, d) {
                                            var xLabel =
                                              d.datasets[t.datasetIndex].label
                                            var yLabel = t.yLabel
                                            return xLabel + ": " + yLabel
                                          }
                                        }
                                      },
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                              callback: function(
                                                value,
                                                index,
                                                values
                                              ) {
                                                return value
                                              }
                                            }
                                          }
                                        ],
                                        xAxes: [
                                          {
                                            gridLines: {
                                              display: false
                                            }
                                          }
                                        ]
                                      },
                                      title: {
                                        display: true,
                                        text: "",
                                        fontSize: 20
                                      },
                                      legend: {
                                        display: true,
                                        position: "bottom",
                                        labels: {
                                          usePointStyle: true
                                        },
                                        responsive: {
                                          display: false
                                        }
                                      }
                                    }}
                                  />
                                ) : (
                                  <Spinner />
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventStatistic
