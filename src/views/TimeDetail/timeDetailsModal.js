import React, { useState } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, FormControl, FormGroup } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import TimeEdit from "./EditTimeDetails"

import moment from "moment"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
var rowToEdit = {}
const TimeDetailsModal = ({
  isViewModal,
  AllUserDetails,
  updateAdminClockTimerRequest,
  start,
  end,
  name,
  userInfo
}) => {
  // let newArrayData = AllUserDetails
  const [viewModal, setViewModal] = useState(true)
  const [showTimeEdit, setShowTimeEdit] = useState(false)

  const cellEditProp = {
    mode: "click",
    blurToSave: true,

    afterSaveCell: (oldValue, newValue, row, column) => {
      var keys = Object.keys(oldValue) //get keys from object as an array
      keys.forEach(function(key, i) {
        if (key == newValue) {
          oldValue[newValue] = row
        }
      })
    }
  }

  const selectRow = {
    mode: "checkbox",
    customComponent: CustomMultiSelectTable
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
    setViewModal(false)
    confirmAlert({
      title: "Warning",
      message: <span>Are you sure you want to delete these Time?</span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            dropRowKeys.forEach(element => {
              var data1 = AllUserDetails.timeEntry.filter(function(emp) {
                if (emp.id === element) {
                  return false
                }
                return true
              })
              AllUserDetails.timeEntry = data1
            })
            updateAdminClockTimerRequest({
              timer: AllUserDetails,
              start: moment(start).format("YYYY-MM-DD"),
              end: moment(end).format("YYYY-MM-DD"),
              name: name
            })
            setViewModal(true)
            if (isViewModal != undefined) isViewModal(true)
            next()
          }
        }
      ]
    })
  }
  const buttonFormatter = (cell, row) => {
    return (
      <div className="bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          style={{
            backgroundColor: "black",
            display: userInfo.role === "manager" ? "none" : ""
          }}
          disabled={userInfo.role === "manager" ? true : false}
          onClick={() => {
            rowToEdit = row
            setViewModal(false)
            setShowTimeEdit(true)
          }}
        >
          Update Time
        </Button>
      </div>
    )
  }

  const setPhilipensTimeClockIn = (row, cell) => {
    // var currentDate = moment(new Date()).format("YYYY-MM-DD") + " " + row

    var currentDate =
      moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD") + " " + row
    var newPhilipensTime = moment(currentDate, "YYYY-MM-DD hh:mm:ss A")
      .add(13, "hours")
      .format("hh:mm:ss A")
    return (
      <div>
        <span>
          {/* {moment(currentDate)
            .add(13, "hours")
            .format("hh:mm:ss A")} */}
          {newPhilipensTime}
        </span>
      </div>
    )
  }

  const setPhilipensTimeClockOut = (row, cell) => {
    //var currentDate = moment(new Date()).format("YYYY-MM-DD") + " " + row
    var currentDate =
      moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD") + " " + row
    var newPhilipensTime = moment(currentDate, "YYYY-MM-DD hh:mm:ss A")
      .add(13, "hours")
      .format("hh:mm:ss A")
    return (
      <div>
        <span>
          {row === "00:00:00"
            ? "-"
            : // moment(currentDate)
              //   .add(13, "hours")
              // .format("hh:mm:ss A")
              newPhilipensTime}
        </span>
      </div>
    )
  }

  const setESTClockOut = (row, cell) => {
    return (
      <div>
        <span>{row === "00:00:00" ? "-" : row}</span>
      </div>
    )
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm
  }

  return (
    <div className="animated">
      {showTimeEdit ? (
        <TimeEdit
          rowToEdit={rowToEdit}
          updateAdminClockTimerRequest={updateAdminClockTimerRequest}
          AllUserDetails={AllUserDetails}
          name={name}
          star={start}
          end={end}
          userInfo={userInfo}
          isTimeEdit={isTimeEditOpen => setShowTimeEdit(isTimeEditOpen)}
          isTimeModal={isTimeModalOpen => setViewModal(isTimeModalOpen)}
          isViewModal={isViewModal}
        />
      ) : (
        ""
      )}

      <Modal
        size="lg"
        centered
        className="btn_reg_cls"
        show={viewModal}
        onHide={() => {
          setViewModal(false)
          if (isViewModal != undefined) isViewModal(false)
        }}
      >
        <Modal.Header
          // closeButton
          className="eventLog"
          style={{ background: "black" }}
        >
          <Modal.Title
            className="order_title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <span>{AllUserDetails.userName} Time Line</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setViewModal(false)
                if (isViewModal != undefined) isViewModal(false)
              }}
            >
              <i class="fa fa-times"></i>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tbl_main">
            <div className="inner_tbl">
              {userInfo.role && userInfo.role === "manager" ? (
                <BootstrapTable
                  data={AllUserDetails.timeEntry}
                  version="4"
                  striped
                  hover
                  pagination
                  options={options}
                  cellEdit={cellEditProp}
                  tableHeaderClass="custom-select-header-class"
                  tableBodyClass="custom-select-body-class"
                >
                  <TableHeaderColumn
                    dataField="id"
                    hidden
                    isKey
                    editable={true}
                  >
                    EST Clock In
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="clockIn" editable={false}>
                    EST Clock In
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="clockOut"
                    dataFormat={setESTClockOut}
                    editable={false}
                  >
                    EST Clock Out
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="clockIn"
                    dataFormat={setPhilipensTimeClockIn}
                    editable={false}
                  >
                    Philippines Clock In
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="clockOut"
                    dataFormat={setPhilipensTimeClockOut}
                    editable={false}
                  >
                    Philippines Clock Out
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="duration" editable={false}>
                    Duration
                  </TableHeaderColumn>
                </BootstrapTable>
              ) : (
                <BootstrapTable
                  data={AllUserDetails.timeEntry}
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
                >
                  <TableHeaderColumn
                    dataField="id"
                    hidden
                    isKey
                    editable={true}
                  >
                    EST Clock In
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="clockIn"
                    editable={false}
                    //customEditor={{ getElement: createTimeEditor }}
                  >
                    EST Clock In
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="clockOut"
                    dataFormat={setESTClockOut}
                    editable={false}
                  >
                    EST Clock Out
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="clockIn"
                    dataFormat={setPhilipensTimeClockIn}
                    editable={false}
                  >
                    Philippines Clock In
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="clockOut"
                    dataFormat={setPhilipensTimeClockOut}
                    editable={false}
                  >
                    Philippines Clock Out
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="duration" editable={false}>
                    Duration
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="button"
                    dataFormat={buttonFormatter}
                    dataAlign="center"
                    editable={false}
                    width="20%"
                  >
                    Action
                  </TableHeaderColumn>
                </BootstrapTable>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  )
}

export default TimeDetailsModal
