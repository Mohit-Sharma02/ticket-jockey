import React, { useEffect, useState, withRouter } from "react"
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button, Card, Form, FormControl, Modal } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import moment from "moment-timezone"
import TimeDetailsModal from "./timeDetailsModal"
import Accordion from "react-bootstrap/Accordion"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker"
import { confirmAlert } from "react-confirm-alert" // Import
import ReactAutocomplete from "react-autocomplete"
import { getDates } from "../../utils/validation"
let now = new Date()
let local = {
  format: "YYYY-MM-DD hh:mm:ss A",
  sundayFirst: false
}
export const AddTimeModel = ({
  onModalClose,
  onSave,
  columns,
  users,
  appReceiveAlert,
  createTimerRequest,
  fetchClockTimerRequest,
  start,
  end,
  name,
  data
}) => {
  const [userName, setUserName] = useState("")
  const [newStart, setNewStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  )
  const [newEnd, setNewEnd] = useState(
    moment(newStart)
      .add(1, "days")
      .subtract(1, "seconds")
  )

  const handleSaveBtnClick = () => {
    var Difference_In_Time =
      new Date(newEnd).getTime() - new Date(newStart).getTime()
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

    var id = []
    if (
      Difference_In_Days > 0 &&
      moment(newEnd).format("YYYY-MM-DD") !=
        moment(newStart).format("YYYY-MM-DD")
    ) {
      var dayList = getDates(
        moment(newStart).format("YYYY-MM-DD"),
        moment(newEnd).format("YYYY-MM-DD")
      )
      for (var date of dayList) {
        id.push(userName.split(":")[0] + ":" + date)
      }
      createTimerRequest({
        timer: {
          _id: id,
          role: userName.split(":")[2],
          userName: userName.split(":")[1],
          timeEntry: {
            clockIn: moment(newStart).format("YYYY-MM-DD hh:mm:ss A"),
            clockOut: moment(newEnd).format("YYYY-MM-DD hh:mm:ss A"),
            duration: Difference_In_Days
          },
          created_by: "admin"
        },
        created_by_admin: true,
        StartDate: moment(start).format("YYYY-MM-DD"),
        EndDate: moment(end).format("YYYY-MM-DD"),
        name: name
      })
    } else {
      id.push(
        userName.split(":")[0] + ":" + moment(newStart).format("YYYY-MM-DD")
      )
      var clockIn = moment(newStart).format("hh:mm:ss A")
      var clockOut = moment(newEnd).format("hh:mm:ss A")
      var duration = moment(clockOut, "HH:mm:ss A").diff(
        moment(clockIn, "HH:mm:ss A")
      )
      createTimerRequest({
        timer: {
          _id: id,
          role: userName.split(":")[2],
          userName: userName.split(":")[1],
          timeEntry: {
            clockIn: moment(newStart).format("YYYY-MM-DD hh:mm:ss A"),
            clockOut: moment(newEnd).format("YYYY-MM-DD hh:mm:ss A"),
            duration: moment
              .utc(duration)
              .format("HH:mm:ss")
              .toString()
          },
          created_by: "admin"
        },
        created_by_admin: true,
        StartDate: moment(start).format("YYYY-MM-DD"),
        EndDate: moment(end).format("YYYY-MM-DD"),
        name: name
      })
    }
    onModalClose(false)
  }

  const applyCallback = (startDate, endDate) => {
    setNewStart(startDate)
    setNewEnd(endDate)
  }
  const headerStyle = {
    color: "black"
  }
  return (
    <div>
      <div className="animated">
        <Modal
          className="ReactModalPortal addTimePop"
          size="lg"
          centered
          show={true}
          onHide={onModalClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="EmailManagement_title"
              style={headerStyle}
              id="example-modal-sizes-title-lg"
            >
              Add Time
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
          // style={{
          //   maxHeight: "calc(100vh - 180px)",
          //   overflowY: "auto"
          // }}
          >
            <Form.Group>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Label>
                    Date: <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-8">
                  <DateTimeRangeContainer
                    //  ranges={ranges}

                    twelveHoursClock
                    start={newStart}
                    end={newEnd}
                    local={local}
                    applyCallback={applyCallback}
                  >
                    <FormControl
                      id="formControlsTextB"
                      type="text"
                      label="Text"
                      style={{ width: "80%" }}
                      value={
                        moment(newStart).format("YYYY-MM-DD hh:mm:ss A") +
                        " To " +
                        moment(newEnd).format("YYYY-MM-DD hh:mm:ss A")
                      }
                      placeholder="Search...."
                    />
                  </DateTimeRangeContainer>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Label>
                    User:<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-8">
                  <Form.Control
                    as="select"
                    value={userName}
                    onChange={evt => setUserName(evt.target.value)}
                  >
                    <option value="">--Select--</option>
                    {users.map(user => {
                      return (
                        <>
                          <option
                            value={
                              user._id + ":" + user.username + ":" + user.role
                            }
                          >
                            {user.username}
                          </option>
                        </>
                      )
                    })}
                  </Form.Control>
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
              onClick={() => handleSaveBtnClick(columns, onSave)}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

let AllUserDetails = ""
const TimeDetail = ({
  fetchClockTimerRequest,
  clockTimerList,
  updateAdminClockTimerRequest,
  isFetching,
  createTimerRequest,
  deleteUserRequest,
  userInfo
}) => {
  // let now = new Date()
  // let maxDate = moment(start).add(24, "hour")
  const [viewModal, setViewModal] = useState(false)
  const [name, setName] = useState("")
  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  )
  const [end, setEnd] = useState(
    moment(start)
      .add(1, "days")
      .add(1, "seconds")
  )
  const [spinnerTime, setSpinnerTime] = useState(false)

  let ranges = {
    "Today Only": [moment(start), moment(end)],
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
    ]
  }
  // let local = {
  //   format: "DD-MM-YYYY HH:mm",
  //   sundayFirst: false
  // }
  const noDataHandler = () => {
    return "No Data Found To Display"
  }

  const buttonFormatter = (cell, row) => {
    return (
      <Button
        active
        color="primary"
        aria-pressed="true"
        style={{
          backgroundColor: "black"
        }}
        onClick={() => openViewModal(row)}
      >
        Details
      </Button>
    )
  }

  const getTotalHours = (cell, row) => {
    var date = moment(row.date).format("YYYY-MM-DD") + " " + row.totalHours
    var totalHours = 0
    if (row.totalHours === "23:59:59") {
      totalHours = "24:00"
    } else {
      totalHours = moment(date).format("HH:mm")
    }
    return <span>{totalHours}</span>
  }

  const openViewModal = row => {
    AllUserDetails = row
    setViewModal(true)
  }

  const createCustomModal = (onModalClose, onSave, columns) => {
    const attr = {
      onModalClose,
      onSave,
      columns
    }
    return (
      <AddTimeModel
        {...attr}
        createTimerRequest={createTimerRequest}
        users={clockTimerList.users}
        fetchClockTimerRequest={fetchClockTimerRequest}
        start={start}
        end={end}
        name={name}
        data={clockTimerList.timerInfo}
      />
    )
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

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span>Are you sure you want to delete this Users?</span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            deleteUserRequest({
              id: dropRowKeys,
              StartDate: moment(start).format("YYYY-MM-DD"),
              EndDate: moment(end).format("YYYY-MM-DD"),
              name: name
            })
            next()
          }
        }
      ]
    })
  }

  const selectRowForTime = {
    mode: "checkbox"
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
    withFirstAndLast: true, //> Hide the going to First and Last page button
    noDataText: noDataHandler(), // page: 1, // which page you want to show as default
    insertModal: createCustomModal,
    insertText: "Add Time",
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm
  }
  useEffect(() => {
    fetchClockTimerRequest({
      StartDate: moment(start).format("YYYY-MM-DD"),
      EndDate: moment(end).format("YYYY-MM-DD"),
      name: name
    })
  }, [])
  const applyCallback = (startDate, endDate) => {
    setStart(startDate)
    setEnd(endDate)
  }
  const clearFilter = () => {
    setName("")
    setStart(
      moment(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
      )
    )
    setEnd(
      moment(start)
        .add(1, "days")
        .add(1, "seconds")
    )
    fetchClockTimerRequest({
      StartDate: moment(
        moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        )
      ).format("YYYY-MM-DD"),
      EndDate: moment(
        moment(
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        )
          .add(1, "days")
          .add(1, "seconds")
      ).format("YYYY-MM-DD"),
      name: ""
    })
  }
  return (
    <div className="animated">
      <div className="full_width">
        <div className="page_name">
          <h2>Time Entry Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Time Entry</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main  order_tbl_main nw_od_cls">
                      <div className="inner_tbl">
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
                                        Start & End Date
                                      </label>
                                      <div className="date_picker dateCls">
                                        <div
                                          style={{
                                            top: "251px",
                                            left: "140px"
                                          }}
                                        >
                                          <DateTimeRangeContainer
                                            ranges={ranges}
                                            start={start}
                                            end={end}
                                            local={local}
                                            // maxDate={maxDate}
                                            applyCallback={applyCallback}
                                          >
                                            <FormControl
                                              id="formControlsTextB"
                                              type="text"
                                              label="Text"
                                              value={
                                                moment(start).format(
                                                  "YYYY-MM-DD"
                                                ) +
                                                " To " +
                                                moment(end).format("YYYY-MM-DD")
                                              }
                                              placeholder="Search...."
                                            />
                                          </DateTimeRangeContainer>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="fl_eq_box autoComplete">
                                      <label className="searchHead">
                                        User Name
                                      </label>
                                      <ReactAutocomplete
                                        getItemValue={item => item.label}
                                        items={
                                          clockTimerList.usersForSerach &&
                                          clockTimerList.usersForSerach
                                            ? clockTimerList.usersForSerach
                                            : []
                                        }
                                        shouldItemRender={(item, value) =>
                                          item
                                            .toLowerCase()
                                            .indexOf(value.toLowerCase()) > -1
                                        }
                                        getItemValue={item => item}
                                        renderItem={(item, isHighlighted) => (
                                          <div
                                            className="autoDropdown"
                                            key={item}
                                          >
                                            {item}
                                          </div>
                                        )}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        onSelect={val => setName(val)}
                                        placeholder="User Name"
                                      />
                                    </div>

                                    {/* <div className="fl_eq_box">
                                      <label className="searchHead">Name</label>
                                      <Form.Control
                                        type="text"
                                        value={name}
                                        placeholder="Search..."
                                        onChange={evt =>
                                          setName(evt.target.value)
                                        }
                                      />
                                    </div> */}

                                    <div className="fl_eq_box src_btn">
                                      <label className="searchHead">
                                        &nbsp;
                                      </label>
                                      <div className="fl_w">
                                        <Button
                                          color="primary"
                                          className="btn-pill"
                                          onClick={() => {
                                            fetchClockTimerRequest({
                                              StartDate: moment(start).format(
                                                "YYYY-MM-DD"
                                              ),
                                              EndDate: moment(end).format(
                                                "YYYY-MM-DD"
                                              ),
                                              name: name
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
                                            setName("")
                                            setStart(
                                              moment(
                                                new Date(
                                                  now.getFullYear(),
                                                  now.getMonth(),
                                                  now.getDate(),
                                                  0,
                                                  0,
                                                  0,
                                                  0
                                                )
                                              )
                                            )
                                            setEnd(
                                              moment(start)
                                                .add(1, "days")
                                                .add(1, "seconds")
                                            )
                                            clearFilter()
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

                        <div className="tbl_main date_tbl">
                          <div className="inner_tbl">
                            {isFetching ? (
                              <Spinner spinnerTime={spinnerTime} />
                            ) : userInfo.role === "manager" ? (
                              <BootstrapTable
                                data={clockTimerList.timerInfo}
                                version="4"
                                striped
                                hover
                                pagination
                                options={options}
                              >
                                <TableHeaderColumn dataField="_id" isKey hidden>
                                  ID
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="userName">
                                  Name
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="date">
                                  Date
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataFormat={getTotalHours}
                                  dataField="totalHours"
                                >
                                  Total Hours
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataFormat={buttonFormatter}
                                  editable={false}
                                  dataAlign="center"
                                  editable={false}
                                  dataField="button"
                                >
                                  Actions
                                </TableHeaderColumn>
                              </BootstrapTable>
                            ) : (
                              <BootstrapTable
                                data={clockTimerList.timerInfo}
                                version="4"
                                striped
                                hover
                                pagination
                                insertRow
                                deleteRow
                                options={options}
                                selectRow={selectRowForTime}
                              >
                                <TableHeaderColumn dataField="_id" isKey hidden>
                                  ID
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="userName">
                                  Name
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="date">
                                  Date
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataFormat={getTotalHours}
                                  dataField="totalHours"
                                >
                                  Total Hours
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataFormat={buttonFormatter}
                                  editable={false}
                                  dataAlign="center"
                                  editable={false}
                                  dataField="button"
                                >
                                  Actions
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

            <div className="viewLog">
              {viewModal ? (
                <TimeDetailsModal
                  isViewModal={isViewModalOpen => setViewModal(isViewModalOpen)}
                  AllUserDetails={AllUserDetails}
                  updateAdminClockTimerRequest={updateAdminClockTimerRequest}
                  start={start}
                  end={end}
                  name={name}
                  userInfo={userInfo}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeDetail
