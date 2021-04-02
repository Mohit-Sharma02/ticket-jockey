import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { Line } from "react-chartjs-2"
import Spinner from "../../components/Spinner"
import {
  DAY,
  MONTH,
  YEAR,
  MONTHLYCOMPARISION,
  SALESDATE
} from "../../constants/logs"
import moment from "moment-timezone"
import CustomerInfo from "./CustomerInfo"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker"

const Statistics = ({
  ordersCostCount,
  fetchSoldStatisticsRequest,
  soldStatisticsLog,
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
    //.subtract(1, "minutes")
    // .subtract(1, "seconds")
  )
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  )
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  )
  const [chartType, setChartType] = useState("DAY")
  const [currentDateMonth, setcurrentDateMonth] = useState("")
  const [showCustomerInfo, setShowCustomerInfo] = useState(false)
  const [customerInfo, setCustomerInfo] = useState("")
  let today = new Date().toLocaleDateString()
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
    // fetchSoldStatisticsRequest({ groupBy: "DAY" })
    fetchSoldStatisticsRequest({
      startDate: moment(start)
        .subtract(29, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
    })
    setcurrentDateMonth(today)

    const tId = setInterval(() => {
      setChartType("DAY")
    }, 1000 * 60 * 5) //polling every 5 minutes

    return () => {
      tId && clearInterval(tId)
    }
  }, [])

  const weeklyLabel = () => {
    var weekArray = []
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate()
    var estDateTime = moment(new Date())
      .tz("America/New_York")
      .format("MM-DD-YYYY hh:mm:ss")
    // var first = date.getDate() - date.getDay() + 1 // First day is the day of the month - the day of the week
    // var last = first + 6
    var dateFormat = new Date(estDateTime)
    var first = dateFormat.getDate() - dateFormat.getDay() + 1 // First day is the day of the month - the day of the week
    var last = first + 6

    for (var j = first; j <= last; j++) {
      //  var indianCurrentDate = new Date(y, m, j)
      // var indianCurrentDate = new Date(y, m, j)
      var estDateTime = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
        j
      )
      weekArray.push(
        new Date(estDateTime)
          .toString()
          .split(" ")
          .slice(0, 3)
          .join(" ")
      )
    }

    return weekArray
  }

  const getTotalSales = () => {
    const chartData = []
    var labelArray = []
    labelArray = SALESDATE(soldStatisticsLog.soldList)
    labelArray.forEach(element => {
      var result = ""
      result = soldStatisticsLog.soldList.filter(log => log.time === element)

      if (result.length > 0) {
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2
        }).format(soldStatisticsLog.totalSales)
        chartData.push(Number(result[0].totalSaleby).toFixed(2))
      } else {
        chartData.push(0)
      }
    })

    return chartData
  }

  const checkForType = () => {
    return SALESDATE(
      soldStatisticsLog.soldList,
      moment(start).format("YYYY-MM-DD"),
      moment(end).format("YYYY-MM-DD")
    )
  }
  const getLineChartLine = () => {
    return "Sales"
  }
  var chartData = {
    labels: checkForType(),
    showInLegend: true,
    datasets: [
      {
        //label: "Sales By Hours",
        label: getLineChartLine(),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getTotalSales()
        // data: [45, 52, 56, 72, 99, 123, 135, 152]
      }
    ]
  }
  const isNull = ""
  const isNotEmpty = Array.isArray(chartType)
    ? chartType.length
    : Object.keys(chartType).length

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length

  const applyCallback = (startDate, endDate) => {
    setStart(startDate)
    setEnd(endDate)
    fetchSoldStatisticsRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss")
    })
    setStartOnLoad(false)
  }
  return (
    <div>
      <div className="table_head log_thead">
        <div className="statictis_select">
          <div className="row">
            <div className="col-sm-12">
              <div className="select_eq date_nw_cls">
                <div className="fl_eq_box">
                  {isNotEmpty ? (
                    <div className="date_picker dateCls">
                      <DateTimeRangeContainer
                        ranges={ranges}
                        start={startOnLoad ? onloadStart : start}
                        end={end}
                        local={local}
                        // maxDate={maxDate}
                        applyCallback={applyCallback}
                      >
                        <Form.Control
                          id="formControlsTextB"
                          type="text"
                          label="Text"
                          value={
                            startOnLoad
                              ? moment(start)
                                  .subtract(29, "days")
                                  .format("YYYY-MM-DD") +
                                " To " +
                                moment(end).format("YYYY-MM-DD")
                              : moment(start).format("YYYY-MM-DD") +
                                " To " +
                                moment(end).format("YYYY-MM-DD")
                          }
                          placeholder="Search...."
                        />
                      </DateTimeRangeContainer>
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
            {/* <div className="col-sm-6">
              <div className="select_eq">
                <div className="fl_eq_box" style={{ display: "none" }}>
                  {isNotEmpty ? (
                    <Form.Control
                      as="select"
                      value={chartType}
                      onChange={evt => {
                        setChartType(evt.target.value)
                      }}
                    >
                      <option value="SOLD">All Sold Listings</option>
                      <option value="DELIVER">Delivered orders only</option>
                    </Form.Control>
                  ) : (
                      <Spinner />
                    )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="statictis_details dash_statictis">
        <h4>Orders Total Cost</h4>
        <div className="stat_inner">
          <div className="row">
            <div className="col-7">
              <label>Total Cost of Green Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.greenOrdersTotalCost
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2
                    }).format(ordersCostCount.greenOrdersTotalCost)
                  : "0"}

                <i
                  class="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForGreenOrder)
                    setShowCustomerInfo(true)
                  }}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-7">
              <label>Total Cost of Purple Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.purpleOrdersTotalCost
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2
                    }).format(ordersCostCount.purpleOrdersTotalCost)
                  : "0"}

                <i
                  class="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForPurpleOrder)
                    setShowCustomerInfo(true)
                  }}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-7">
              <label>Total Cost of Red Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.redOrdersTotalCost
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2
                    }).format(ordersCostCount.redOrdersTotalCost)
                  : "0"}

                <i
                  class="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForRedOrder)
                    setShowCustomerInfo(true)
                  }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="statictis_details dash_statictis">
        <h4>Sales Details</h4>
        <div className="stat_inner">
          <div className="row">
            <div className="col-8">
              <label>Total Sales:</label>
            </div>
            <div className="col-4">
              <span>
                {soldStatisticsLog.totalSales
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2
                    }).format(soldStatisticsLog.totalSales)
                  : "0"}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Orders:</label>
            </div>
            <div className="col-4">
              <span>{soldStatisticsLog.totalOrders}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Tickets Sold:</label>
            </div>
            <div className="col-4">
              <span>{soldStatisticsLog.totalTicketsSold}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Profit:</label>
            </div>
            <div className="col-4">
              <span>
                {soldStatisticsLog.totalProfit
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(soldStatisticsLog.totalProfit)
                  : "0"}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Average Profit Margin:</label>
            </div>
            <div className="col-4">
              <span>
                {isNull
                  ? ""
                  : //     Math.round(soldStatisticsLog.averageProfitMargin * 100) /

                    //     100
                    // ).toFixed(2) + "%"
                    Number(soldStatisticsLog.averageProfitMargin).toFixed(2) +
                    "%"}
              </span>
            </div>
          </div>
        </div>
      </div>

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
                    var xLabel = d.datasets[t.datasetIndex].label
                    var yLabel = "$" + t.yLabel
                    return xLabel + ": " + yLabel
                  }
                }
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      callback: function(value, index, values) {
                        return "$" + value
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

      {showCustomerInfo ? (
        <CustomerInfo
          isOpen={isActive => setShowCustomerInfo(isActive)}
          data={customerInfo}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default Statistics
