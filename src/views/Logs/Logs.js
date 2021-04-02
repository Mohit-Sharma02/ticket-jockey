import React, { useEffect, useState } from "react"
import moment from "moment-timezone"
import ViewLogModal from "./ViewLogModal"
// import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import {
  Card,
  Accordion,
  Button,
  Form
  // OverlayTrigger,
  // Tooltip
} from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { Line } from "react-chartjs-2"
import Spinner from "../../components/Spinner"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import {
  HOURLY,
  DAILY,
  MONTHLY,
  MONTHLYCOMPARISION
} from "../../constants/logs"
import { dateFormatForall, timeFormatALL, estdateTime } from "../../utils"

const Logs = ({
  isFetching,
  eventsLogs,
  eventsDetailLog,
  fetchEventsLogRequest,
  fetchEventsLogDetailsRequest,
  fetchViewLogRequest,
  viewLogs,
  fetchInstanceLogRequest,
  InstanceLog,
  fetchFailedEventLogRequest,
  failedEventLog
  // fetchMediumTermEventsLogRequest,
  // fetchLongTermEventsLogRequest
}) => {
  for (var i = 0; i < eventsLogs.shortTerm.length; i++) {
    eventsLogs.shortTerm[i]["type"] = "short"
  }
  for (var i = 0; i < eventsLogs.nearTerm.length; i++) {
    eventsLogs.nearTerm[i]["type"] = "near"
  }
  for (var i = 0; i < eventsLogs.mediumTerm.length; i++) {
    eventsLogs.mediumTerm[i]["type"] = "medium"
  }
  for (var i = 0; i < eventsLogs.longTerm.length; i++) {
    eventsLogs.longTerm[i]["type"] = "long"
  }
  const [chartType, setChartType] = useState("HOURLY")
  const [menuShortType, setmenuShortType] = useState("cm_ttl active")
  const [menuNearType, setmenuNearType] = useState("cm_ttl")
  const [menuMediumType, setmenuMediumType] = useState("cm_ttl")
  const [menuLongType, setmenuLongType] = useState("cm_ttl")
  const [viewLogModal, setViewLogModal] = useState(false)
  const [estDateTime, setEstDateTime] = useState("")
  useEffect(() => {
    setInterval(() => {
      let url = window.location.href
      url.includes("logs") ? window.location.reload() : console.log("")
    }, 300000)

    fetchEventsLogRequest({ groupBy: "HOURLY" })
  }, [])

  const weeklyLabel = () => {
    var currentYear = new Date().getFullYear()
    //currentYear="2021";
    var array = []
    var month_name = ""
    var months = MONTHLYCOMPARISION
    var Count = 0
    for (var j = 0; j < months.length; j++) {
      var month_number = months[j].toString()
      var firstOfMonth = new Date(currentYear, month_number - 1, 1)
      var day = firstOfMonth.getDay() || 6
      day = day === 1 ? 0 : day
      if (day) {
        day--
      }
      var diff = 7 - day
      var lastOfMonth = new Date(currentYear, month_number, 0)
      var lastDate = lastOfMonth.getDate()
      if (lastOfMonth.getDay() === 1) {
        diff--
      }
      var result = Math.ceil((lastDate - diff) / 7)
      var week = result + 1
      for (var m = 1; m < week; m++) {
        if (month_number == 1) {
          month_name = "Jan"
        } else if (month_number == 2) {
          month_name = "Feb"
        } else if (month_number == 3) {
          month_name = "Mar"
        } else if (month_number == 4) {
          month_name = "April"
        } else if (month_number == 5) {
          month_name = "May"
        } else if (month_number == 6) {
          month_name = "Jun"
        } else if (month_number == 7) {
          month_name = "July"
        } else if (month_number == 8) {
          month_name = "Aug"
        } else if (month_number == 9) {
          month_name = "sept"
        } else if (month_number == 10) {
          month_name = "Oct"
        } else if (month_number == 11) {
          month_name = "Nov"
        } else if (month_number == 12) {
          month_name = "Dec"
        }
        Count = Math.ceil(Count + 1)
        array.push(month_name + " " + Count + "  week")
      }
      week = null
      firstOfMonth = ""
      lastOfMonth = ""
      month_name = ""
    }
    return array
  }
  const getShortTermLogData = () => {
    const chartData = []
    var labelArray = []

    if (chartType === "HOURLY") labelArray = HOURLY
    else if (chartType === "DAILY") labelArray = DAILY
    else if (chartType === "WEEKLY") labelArray = weeklyLabel()
    else if (chartType === "MONTHLY") labelArray = MONTHLYCOMPARISION

    labelArray.forEach(element => {
      // console.log("el", element)
      if (chartType === "WEEKLY") {
        const result = eventsLogs.shortTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element.split(" ")[1]
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      } else {
        const result = eventsLogs.shortTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      }
    })

    return chartData
  }

  const getNearTermLogData = () => {
    const chartData = []
    var labelArray = []

    if (chartType === "HOURLY") labelArray = HOURLY
    else if (chartType === "DAILY") labelArray = DAILY
    else if (chartType === "WEEKLY") labelArray = weeklyLabel()
    else if (chartType === "MONTHLY") labelArray = MONTHLYCOMPARISION

    labelArray.forEach(element => {
      if (chartType === "WEEKLY") {
        const result = eventsLogs.nearTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element.split(" ")[1]
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      } else {
        const result = eventsLogs.nearTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      }
    })

    return chartData
  }

  const getMediumTermLogData = () => {
    const chartData = []
    var labelArray = []

    if (chartType === "HOURLY") labelArray = HOURLY
    else if (chartType === "DAILY") labelArray = DAILY
    else if (chartType === "WEEKLY") labelArray = weeklyLabel()
    else if (chartType === "MONTHLY") labelArray = MONTHLYCOMPARISION

    labelArray.forEach(element => {
      if (chartType === "WEEKLY") {
        const result = eventsLogs.mediumTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element.split(" ")[1]
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      } else {
        const result = eventsLogs.mediumTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      }
    })

    return chartData
  }

  const getLongTermLogData = () => {
    const chartData = []
    var labelArray = []

    if (chartType === "HOURLY") labelArray = HOURLY
    else if (chartType === "DAILY") labelArray = DAILY
    else if (chartType === "WEEKLY") labelArray = weeklyLabel()
    else if (chartType === "MONTHLY") labelArray = MONTHLYCOMPARISION

    labelArray.forEach(element => {
      if (chartType === "WEEKLY") {
        const result = eventsLogs.longTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element.split(" ")[1]
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      } else {
        const result = eventsLogs.longTerm.filter(
          log => log.time.split("-").splice(-1)[0] === element
        )
        if (result.length > 0) {
          chartData.push(result[0].pctSuccess)
        } else {
          chartData.push(0)
        }
      }
    })

    return chartData
  }

  const checkForType = () => {
    if (chartType === "HOURLY") {
      return HOURLY
    } else if (chartType === "DAILY") {
      return DAILY
    } else if (chartType === "WEEKLY") {
      return weeklyLabel()
    } else if (chartType === "MONTHLY") {
      return MONTHLY
    } else {
      // return yearlyLabel()
    }
  }

  var chartData = {
    labels: checkForType(),
    showInLegend: true,
    datasets: [
      {
        label: "Short Term Events Log",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        // data: [45, 52, 56, 72, 99, 123, 135, 152]
        data: getShortTermLogData()
      },
      {
        label: "Near Events Log",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#434348",
        borderColor: "#434348",
        borderWidth: 2,
        pointStyle: "rect",
        // data: [26, 25, 28, 27, 30, 26, 32, 33]
        data: getNearTermLogData()
      },
      {
        label: "Medium Term Events Log",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#8ef17e",
        borderColor: "#8ef17e",
        borderWidth: 2,
        pointStyle: "triangle",
        // data: [20, 24, 22, 23, 23, 24, 28, 42],
        data: getMediumTermLogData()
      },
      {
        label: "Long Term Events Log",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#f2a55e",
        borderColor: "#f2a55e",
        borderWidth: 2,
        pointStyle: "star",
        // data: [20, 10, 12, 13, 15, 22, 27, 30]
        data: getLongTermLogData()
      }
    ]
  }

  const formateDate = (cell, row) => {
    var fDate = ""
    var new_date = ""
    if (chartType === "HOURLY") {
      fDate =
        cell.split("-").splice(0)[3] +
        "-" +
        cell.split("-").splice(0)[1] +
        "-" +
        cell.split("-").splice(0)[0] +
        " ( " +
        cell.split("-").splice(0)[4] +
        " ) "
      if (
        cell.split("-").splice(0)[4] != undefined ||
        cell.split("-").splice(0)[4] != "" ||
        cell.split("-").splice(0)[4] != null ||
        cell.split("-").splice(0)[4] != "invalid"
      ) {
        var dd = cell.split("-").splice(0)[3]
        if (dd === undefined) {
          new_date = fDate
        } else {
          var mm =
            cell.split("-").splice(0)[1] <= 9
              ? "0" + cell.split("-").splice(0)[1]
              : cell.split("-").splice(0)[1]
          var yy = cell.split("-").splice(0)[0]
          var tt = cell.split("-").splice(0)[4]
          var d = dd + "." + mm + "." + yy + " " + tt

          // var newDate= mm + "/" + dd + "/" + yy
          var date = new moment(d, "DD.MM.YYYY HH.mm").toDate("en-US")

          // var ddd= newDate + " " + date.toLocaleTimeString('en-US')
          // new_date = ddd
          // new_date = date.toLocaleTimeString('en-US')
          //new_date = fDate
          var new_date1 = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).format(new Date(date))

          new_date = moment
            .utc(new_date1)
            .tz("America/New_York")
            .format("MM/DD/YYYY hh:mm:ss A")
        }
      } else {
        new_date = fDate
      }
    } else if (chartType === "DAILY") {
      fDate =
        cell.split("-").splice(0)[3] +
        "-" +
        cell.split("-").splice(0)[1] +
        "-" +
        cell.split("-").splice(0)[0]

      new_date = fDate
    } else if (chartType === "WEEKLY") {
      var newDate = cell.split("-").splice(0)[2]
      var month = cell.split("-").splice(0)[1]
      var year = cell.split("-").splice(0)[0]
      if (month == "1") {
        month = "Jan"
      } else if (month == "2") {
        month = "Feb"
      } else if (month == "3") {
        month = "Mar"
      } else if (month == "4") {
        month = "April"
      } else if (month == "5") {
        month = "May"
      } else if (month == "6") {
        month = "Jun"
      } else if (month == "7") {
        month = "July"
      } else if (month == "8") {
        month = "Aug"
      } else if (month == "9") {
        month = "sept"
      } else if (month == "10") {
        month = "Oct"
      } else if (month == "11") {
        month = "Nov"
      } else if (month == "12") {
        month = "Dec"
      }

      fDate = newDate + " " + month + " " + year
      new_date = fDate
    } else {
      fDate = cell
      new_date = fDate
    }

    return new_date
  }

  const noDataHandler = () => {
    if (isFetching) return <Spinner />
    else return "No Data Found To Display"
  }

  const isNotEmpty = Array.isArray(chartType)
    ? chartType.length
    : Object.keys(chartType).length

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 20, // which size per page you want to locate as default
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
    noDataText: noDataHandler()
  }

  const handleMenuClassName = e => {
    var inActiveClass = "cm_ttl"
    var activeClass = "cm_ttl active"
    switch (e.target.innerText) {
      case "Short Term Events Log":
        if (
          e.target.className === "cm_ttl active card-header" ||
          e.currentTarget.className === "cm_ttl active card-header"
        ) {
          setmenuShortType(inActiveClass)
          setmenuLongType(inActiveClass)
          setmenuMediumType(inActiveClass)
          setmenuNearType(inActiveClass)
        } else {
          setmenuShortType(activeClass)
          setmenuLongType(inActiveClass)
          setmenuMediumType(inActiveClass)
          setmenuNearType(inActiveClass)
        }
        break
      case "Near Events Log":
        if (
          e.target.className === "cm_ttl card-header" ||
          e.currentTarget.className === "cm_ttl card-header"
        ) {
          setmenuNearType(activeClass)
          setmenuShortType(inActiveClass)
          setmenuLongType(inActiveClass)
          setmenuMediumType(inActiveClass)
        } else {
          setmenuNearType(inActiveClass)
        }
        break
      case "Medium Term Events Log":
        if (
          e.target.className === "cm_ttl card-header" ||
          e.currentTarget.className === "cm_ttl card-header"
        ) {
          setmenuMediumType(activeClass)
          setmenuShortType(inActiveClass)
          setmenuNearType(inActiveClass)
          setmenuLongType(inActiveClass)
        } else {
          setmenuMediumType(inActiveClass)
        }
        break

      case "Long Term Events Log":
        if (
          e.target.className === "cm_ttl card-header" ||
          e.currentTarget.className === "cm_ttl card-header"
        ) {
          setmenuLongType(activeClass)
          setmenuMediumType(inActiveClass)
          setmenuShortType(inActiveClass)
          setmenuNearType(inActiveClass)
        } else {
          setmenuLongType(inActiveClass)
        }
        break
      default:
        if (
          e.target.className === "cm_ttl card-header" ||
          e.currentTarget.className === "cm_ttl card-header"
        )
          setmenuShortType(activeClass)
        else setmenuShortType(inActiveClass)
        break
    }
  }
  const newUrlFormatter = (cell, row) => {
    var date = dateFormatForall(
      row.time.split(":")[0].split("-")[0] +
        "-" +
        row.time.split(":")[0].split("-")[1] +
        "-" +
        row.time.split(":")[0].split("-")[3]
    )
    var time = timeFormatALL(
      row.time.split(":")[0].split("-")[4] + ":" + row.time.split(":")[1]
    )

    return (
      <>
        <Form.Group className="text-center">
          <Button
            className="viewLog_btn"
            variant="primary"
            onClick={() => openViewLogModal(row.type, date, time)}
          >
            View Log
          </Button>
        </Form.Group>
      </>
    )
  }

  const openViewLogModal = (type, date, time) => {
    fetchViewLogRequest({ type: type, date: date, time: time })
    var tempEstDateTime = estdateTime(
      date.split("-")[2] +
        "." +
        date.split("-")[1] +
        +"." +
        date.split("-")[0] +
        " " +
        time
    )
    setEstDateTime(tempEstDateTime)
    setViewLogModal(true)
  }

  return (
    <div className="full_width">
      <div className="page_name">
        <h2>Event Monitoring Logs</h2>
      </div>
      <div className="inner_main">
        <div className="full_width">
          <div className="row">
            <div className="col-sm-12">
              <div className="white_box mrgbtm50">
                <div className="cm_ttl">
                  <h2>Success API Execution</h2>
                </div>
                <div className="inner_box_body">
                  <div className="table_head log_thead">
                    <div className="select_eq">
                      <div className="fl_eq_box">
                        {isNotEmpty ? (
                          <Form.Control
                            as="select"
                            value={chartType}
                            onChange={evt => {
                              setChartType(evt.target.value)
                              if (evt.target.value === "DAILY") {
                                // chartData.labels = DAILY
                              } else if (evt.target.value === "WEEKLY") {
                                // chartData.labels = weeklyLabel()
                              }
                              fetchEventsLogRequest({
                                groupBy: evt.target.value
                              })
                            }}
                          >
                            <option value="HOURLY">Hourly</option>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                            {/* <option value="YEARLY">Yearly</option> */}
                          </Form.Control>
                        ) : (
                          <Spinner />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="chart_cover">
                    {isLineEmpty ? (
                      <Line
                        height={350}
                        data={chartData}
                        options={{
                          // responsive: true,

                          maintainAspectRatio: false,
                          scales: {
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

            <div className="col-sm-12">
              <div className="log_acc_main acc_main min_inherit">
                <Accordion className="log_acc_inner" defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle
                      className={menuShortType}
                      as={Card.Header}
                      eventKey="0"
                      onClick={handleMenuClassName}
                    >
                      <h2>Short Term Events Log</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <div className="inner_box_body padL3T5">
                        <div className="table_head">
                          <div className="select_eq">
                            <div className="fl_eq_box">
                              <input
                                placeholder="Search..."
                                type="text"
                                className="search_icon form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tbl_main log_tbl_main">
                          <div className="inner_tbl">
                            <BootstrapTable
                              data={eventsLogs.shortTerm}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                            >
                              <TableHeaderColumn
                                dataField="time"
                                isKey
                                editable={false}
                                expandable={false}
                                dataFormat={formateDate}
                                // width="15%"
                              >
                                Date & Time
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalEvents"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Event
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Success
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalFailed"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Failed
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="pctSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Success %
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataFormat={newUrlFormatter}
                                editable={false}
                                expandable={false}
                                dataField="type"
                                hidden={chartType === "HOURLY" ? false : true}
                                // width="55%"
                              >
                                View Log
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Accordion.Toggle
                      className={menuNearType}
                      as={Card.Header}
                      eventKey="1"
                      onClick={handleMenuClassName}
                    >
                      <h2>Near Events Log</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <div className="inner_box_body padL3T5">
                        <div className="table_head">
                          <div className="select_eq">
                            <div className="fl_eq_box">
                              <input
                                placeholder="Search..."
                                type="text"
                                className="search_icon form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tbl_main log_tbl_main">
                          <div className="inner_tbl">
                            <BootstrapTable
                              data={eventsLogs.nearTerm}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                            >
                              <TableHeaderColumn
                                dataField="time"
                                isKey
                                editable={false}
                                expandable={false}
                                dataFormat={formateDate}
                                // width="15%"
                              >
                                Date & Time
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalEvents"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Event
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Success
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalFailed"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Failed
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="pctSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Success %
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataFormat={newUrlFormatter}
                                editable={false}
                                expandable={false}
                                dataField="type"
                                hidden={chartType === "HOURLY" ? false : true}
                                // width="55%"
                              >
                                View Log
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Accordion.Toggle
                      className={menuMediumType}
                      as={Card.Header}
                      eventKey="2"
                      onClick={handleMenuClassName}
                    >
                      <h2>Medium Term Events Log</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <div className="inner_box_body padL3T5">
                        <div className="table_head">
                          <div className="select_eq">
                            <div className="fl_eq_box">
                              <input
                                placeholder="Search..."
                                type="text"
                                className="search_icon form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tbl_main log_tbl_main">
                          <div className="inner_tbl">
                            <BootstrapTable
                              data={eventsLogs.mediumTerm}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                            >
                              <TableHeaderColumn
                                dataField="time"
                                isKey
                                editable={false}
                                expandable={false}
                                dataFormat={formateDate}
                                // width="15%"
                              >
                                Date & Time
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalEvents"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Event
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Success
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalFailed"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Failed
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="pctSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Success %
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataFormat={newUrlFormatter}
                                editable={false}
                                expandable={false}
                                dataField="type"
                                hidden={chartType === "HOURLY" ? false : true}
                                // width="55%"
                              >
                                View Log
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Accordion.Toggle
                      className={menuLongType}
                      as={Card.Header}
                      eventKey="3"
                      onClick={handleMenuClassName}
                    >
                      <h2>Long Term Events Log</h2>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <div className="inner_box_body padL3T5">
                        <div className="table_head">
                          <div className="select_eq">
                            <div className="fl_eq_box">
                              <input
                                placeholder="Search..."
                                type="text"
                                className="search_icon form-control"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tbl_main log_tbl_main">
                          <div className="inner_tbl">
                            <BootstrapTable
                              data={eventsLogs.longTerm}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                            >
                              <TableHeaderColumn
                                dataField="time"
                                isKey
                                editable={false}
                                expandable={false}
                                dataFormat={formateDate}
                                // width="15%"
                              >
                                Date & Time
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalEvents"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Event
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Success
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="totalFailed"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Total Failed
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="pctSuccess"
                                editable={false}
                                expandable={false}
                                // width="15%"
                              >
                                Success %
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataFormat={newUrlFormatter}
                                editable={false}
                                expandable={false}
                                dataField="type"
                                hidden={chartType === "HOURLY" ? false : true}
                                // width="55%"
                              >
                                View Log
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </div>
                        </div>
                      </div>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="viewLog">
            {viewLogModal ? (
              <ViewLogModal
                viewLogs={viewLogs}
                estDateTime={estDateTime}
                InstanceLog={InstanceLog}
                isFetching={isFetching}
                fetchFailedEventLogRequest={fetchFailedEventLogRequest}
                failedEventLog={failedEventLog}
                fetchInstanceLogRequest={fetchInstanceLogRequest}
                isViewLogModal={isViewLogModalOpen =>
                  setViewLogModal(isViewLogModalOpen)
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logs
