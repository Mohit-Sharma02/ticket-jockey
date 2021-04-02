import React, { useState, useEffect, useRef } from "react"
import { Button } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import moment from "moment-timezone"
import {
  getRecentTotalHours,
  formatTimeInHoursMin
} from "../../utils/validation"
let recentTime = 0
const ClockTimer = ({
  fetchClockTimerRequest,
  clockTimerList,
  createTimerRequest,
  userInfo
}) => {
  const [clockIn, setClockIn] = useState(false)
  const [clockInDate, setClockInDate] = useState("")
  const [clockOutDate, setClockOutDate] = useState("")
  let [state, setState] = useState({ running: false, value: 0 })
  const [timer, setTimer] = useState(state.value)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentDateMonth, setcurrentDateMonth] = useState("")
  const [recentClockInTime, setRecentClockInTime] = useState(true)
  let countRef = useRef(null)
  let today = new Date().toLocaleDateString()
  useEffect(() => {
    // setcurrentDateMonth(today)
    //fetchClockTimerRequest(userInfo._id + ":" + moment().format("YYYY-MM-DD"))
    //fetchClockTimerRequest(userInfo._id)
  }, [])
  const myInistialTime = () => {
    setTimer(timer => timer + 1)
  }

  const handleStart = () => {
    var data = ""
    setIsActive(true)
    setIsPaused(true)
    setClockInDate(moment().format("YYYY-MM-DD"))
    // var data = new Date().toISOString()
    var data = new Date()
    if (timer > 0) {
      countRef.current = setInterval(myInistialTime, 1000)
      data = new Date().toUTCString()
      // setRecentClockInTime(true)
    } else {
      setTimer(recentTime)
      countRef.current = setInterval(myInistialTime, 1000)
      data = new Date().toISOString()
      clearInterval(timer)
      setRecentClockInTime(false)
    }
    createTimerRequest({
      _id: userInfo._id + ":" + moment().format("YYYY-MM-DD"),
      role: userInfo.role,
      userName: userInfo.firstName + " " + userInfo.lastName,
      timeEntry: {
        clockIn: moment(data)
          .tz("America/New_York")
          .format("hh:mm:ss A"),
        clockOut: "00:00:00",
        duration: "0"
      },
      StartDate: moment().format("YYYY-MM-DD"),
      EndDate: moment()
        .add(1, "days")
        .format("YYYY-MM-DD"),
      name: ""
    })
  }

  const checkRecentEntry = data => {
    var recentTime = data.userTimerInfo.filter(item => {
      if (item.clockOut === "-") {
        return item
      }
    })
    if (recentTime.length != 0) {
      return recentTime[0].clockIn
    }
    return 0
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(false)
    setRecentClockInTime(false)
    setClockOutDate(moment().format("YYYY-MM-DD"))
    // var data = new Date().toUTCString()
    var data = new Date()
    createTimerRequest({
      _id: userInfo._id + ":" + moment().format("YYYY-MM-DD"),
      // _id: userInfo._id + ":2021-01-21",
      role: userInfo.role,
      userName: userInfo.fistName + " " + userInfo.lastName,
      timeEntry: {
        clockIn:
          clockIn && clockInDate !== moment().format("YYYY-MM-DD")
            ? "00:00:00"
            : checkRecentEntry(clockTimerList),
        // clockIn: "00:00:00",
        clockOut: moment(data)
          .tz("America/New_York")
          .format("hh:mm:ss A"),
        duration: "0"
      },
      StartDate: moment().format("YYYY-MM-DD"),
      EndDate: moment()
        .add(1, "days")
        .format("YYYY-MM-DD"),
      name: ""
    })
  }

  if (
    clockTimerList != undefined &&
    clockTimerList.userTimerInfo &&
    timer == 0 &&
    checkRecentEntry(clockTimerList) &&
    !isPaused
  ) {
    var newDataArray = checkRecentEntry(clockTimerList)
    var newArray = new Date().toISOString()
    let newEstTime = moment(newArray)
      .tz("America/New_York")
      .format("hh:mm:ss A")
    var newTime =
      moment(newEstTime, "HH:mm:ss A").diff(
        moment().startOf("day"),
        "seconds"
      ) -
      moment(newDataArray, "HH:mm:ss A").diff(
        moment().startOf("day"),
        "seconds"
      )
    setTimer(newTime + parseInt(clockTimerList.recentClockInTime))
    countRef.current = setInterval(myInistialTime, 1000)
    setIsPaused(true)
    if (clockIn) {
      setRecentClockInTime(true)
    } else {
      setRecentClockInTime(false)
    }
  }

  const setRecentTimer = recentTimer => {
    recentTime = recentTimer
    const getSeconds = `0${recentTimer % 60}`.slice(-2)
    const minutes = `${Math.floor(recentTimer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(recentTimer / 3600)}`.slice(-2)
    return `${getHours} : ${getMinutes} :${getSeconds}`
  }

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} :${getSeconds}`
  }

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
    withFirstAndLast: true //> Hide the going to First and Last page button
  }

  const setPhilipensTimeClockIn = (row, cell) => {
    var currentDate =
      moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD") + " " + row
    var newPhilipensTime = moment(currentDate, "YYYY-MM-DD hh:mm:ss A")
      .add(13, "hours")
      .format("hh:mm:ss A")
    return (
      <div>
        <span>{formatTimeInHoursMin(newPhilipensTime)}</span>
      </div>
    )
  }

  const setPhilipensTimeClockOut = (row, cell) => {
    var currentDate =
      moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD") + " " + row
    var newPhilipensTime = moment(currentDate, "YYYY-MM-DD hh:mm:ss A")
      .add(13, "hours")
      .format("hh:mm:ss A")
    return (
      <div>
        <span>
          {row === "-" ? "-" : formatTimeInHoursMin(newPhilipensTime)}
        </span>
      </div>
    )
  }

  const setESTClockIn = (row, cell) => {
    return (
      <div>
        <span>{row === "00:00:00" ? "-" : formatTimeInHoursMin(row)}</span>
      </div>
    )
  }

  const setESTClockOut = (row, cell) => {
    return (
      <div>
        <span>{row === "-" ? "-" : formatTimeInHoursMin(row)}</span>
      </div>
    )
  }

  const setDuration = (row, cell) => {
    return (
      <div>
        <span>
          {row === undefined || row == 0
            ? 0
            : row.split(":")[0] + ":" + row.split(":")[1]}
        </span>
      </div>
    )
  }

  return (
    <div className="animated">
      <div className="table_head log_thead clock_Btn">
        <div className="row">
          <div className="col-sm-6">
            <Button
              disabled={isPaused}
              onClick={() => {
                setClockIn(true)
                handleStart()
              }}
            >
              Clock In
            </Button>
            <Button
              disabled={!isPaused}
              onClick={() => {
                setClockIn(true)
                handlePause()
              }}
            >
              Clock Out
            </Button>
          </div>
          <div className="col-sm-6">
            <span style={{ color: "black", float: "right" }}>
              {currentDateMonth}
            </span>
            <br />
            <span style={{ color: "black", float: "right" }}>
              Total Hours: {clockTimerList.totalHours}
            </span>
          </div>
        </div>
      </div>
      <div className="tbl_main">
        <div className="inner_tbl">
          <div className="clock_cover">
            {true ? (
              <>
                <div className="stopwatch-card">
                  <p>
                    {recentClockInTime &&
                    clockTimerList.recentClockInTime &&
                    clockTimerList.recentClockInTime
                      ? setRecentTimer(clockTimerList.recentClockInTime)
                      : formatTime()}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <BootstrapTable
            data={clockTimerList.userTimerInfo}
            version="4"
            striped
            hover
            pagination
            options={options}
          >
            <TableHeaderColumn dataField="_id" isKey hidden>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="clockIn" dataFormat={setESTClockIn}>
              In EST
            </TableHeaderColumn>
            <TableHeaderColumn dataField="clockOut" dataFormat={setESTClockOut}>
              Out EST
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="clockIn"
              dataFormat={setPhilipensTimeClockIn}
            >
              In Philippines
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="clockOut"
              dataFormat={setPhilipensTimeClockOut}
            >
              Out Philippines
            </TableHeaderColumn>
            <TableHeaderColumn dataField="duration" dataFormat={setDuration}>
              Duration
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    </div>
  )
}

export default ClockTimer
