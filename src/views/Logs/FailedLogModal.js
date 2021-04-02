import React, { useState, useEffect } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"

const FailedLogModal = ({
  isFailedLogModal,
  failedEventLog,
  isFetching,
  estDateTime,
  isViewLogModal
}) => {
  const [FailedLogModal, setFailedLogModal] = useState(true)
  const [spinnerTime, setSpinnerTime] = useState(false)
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
    // noDataText: noDataHandler()
  }

  const newUrlFormatter = (cell, row) => {
    var ticketMasterUrl = "https://www.ticketmaster.com/event/" + row.eventId
    return (
      <a href={ticketMasterUrl} target="_blank">
        {row.eventId}
      </a>
    )
  }
  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={FailedLogModal}
        onHide={() => {
          setFailedLogModal(false)
          if (isFailedLogModal != undefined) isFailedLogModal(false)
          isViewLogModal(true)
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
            <span> Failed Event log {estDateTime}</span>
            <span
              onClick={() => {
                setFailedLogModal(false)
                if (isFailedLogModal != undefined) isFailedLogModal(false)
                isViewLogModal(true)
              }}
            >
              <i class="fa fa-times"></i>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tbl_main">
            <div className="inner_tbl">
              {isFetching ? (
                <Spinner spinnerTime={spinnerTime} />
              ) : (
                <BootstrapTable
                  data={Object.values(failedEventLog)}
                  version="4"
                  striped
                  hover
                  pagination
                  options={options}
                  tableHeaderClass="custom-select-header-class"
                  tableBodyClass="custom-select-body-class"
                >
                  <TableHeaderColumn
                    dataField="eventId"
                    isKey
                    editable={false}
                    width="30%"
                    dataFormat={newUrlFormatter}
                  >
                    Event Id
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    // width="25%"
                    dataField="reason"
                    editable={false}
                  >
                    Reason
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

export default FailedLogModal
