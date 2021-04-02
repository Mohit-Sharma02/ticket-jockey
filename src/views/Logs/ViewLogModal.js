import React, { useState, useEffect } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import FailedLogModal from "./FailedLogModal"
import { setBackendUrl } from "../../constants"

const ViewLogModal = ({
  isViewLogModal,
  viewLogs,
  isFetching,
  estDateTime,
  InstanceLog,
  fetchFailedEventLogRequest,
  failedEventLog
}) => {
  const [viewLogModal, setViewLogModal] = useState(true)
  const [spinnerTime, setSpinnerTime] = useState(false)
  const [failedLogModal, setFailedLogModal] = useState(false)

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
    return (
      <div className="tbl_btn">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>DownLoad Log</Tooltip>}
        >
          <Button
            className="icon_btn"
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              download(row.type, row.date, row.time, row.instanceId)
            }}
          >
            <img
              src={require("./../../assets/img/update-icon.png")}
              alt="Download Log"
            />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Failed Event Details</Tooltip>}
        >
          <Button
            className="icon_btn"
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              openFialedLogModal(
                row.type,
                row.date,
                row.time,
                row.instanceTimestamp,
                row.instanceId
              )
            }}
          >
            <img
              src={require("./../../assets/img/detail-icon.png")}
              alt="Failed Event Details"
            />
          </Button>
        </OverlayTrigger>
      </div>
    )
  }

  const openFialedLogModal = (
    type,
    date,
    time,
    instanceTimestamp,
    instanceId
  ) => {
    fetchFailedEventLogRequest({
      type: type,
      date: date,
      time: time,
      instanceTimestamp: instanceTimestamp,
      instanceId: instanceId
    })
    setViewLogModal(false)
    setFailedLogModal(true)
  }

  const download = (type, date, time, instanceId) => {
    let url = window.location.href
    var baseUrl = setBackendUrl(url)
    setTimeout(() => {
      const response = {
        file:
          baseUrl +
          "api/downloadInstanceDetailsLog?type=" +
          type +
          "&date=" +
          date +
          "&time=" +
          time +
          "&instanceId=" +
          instanceId +
          ""
      }
      window.open(response.file)
    }, 100)
  }

  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={viewLogModal}
        onHide={() => {
          setViewLogModal(false)
          if (isViewLogModal != undefined) isViewLogModal(false)
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
            <span>Instance Detail Log {estDateTime}</span>
            <span
              onClick={() => {
                setViewLogModal(false)
                if (isViewLogModal != undefined) isViewLogModal(false)
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
                  data={Object.values(viewLogs)}
                  version="4"
                  striped
                  hover
                  pagination
                  options={options}
                  tableHeaderClass="custom-select-header-class"
                  tableBodyClass="custom-select-body-class"
                >
                  <TableHeaderColumn
                    dataField="instanceId"
                    isKey
                    editable={false}
                    width="25%"
                  >
                    Instance Id
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="TotalEvent" editable={false}>
                    Total Events
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="TotalSuccess" editable={false}>
                    Total Success
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="TotalFailed" editable={false}>
                    Total Failed
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="Success" editable={false}>
                    Success %
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataFormat={newUrlFormatter}
                    editable={false}
                    expandable={false}
                    dataAlign="center"
                    // width="35%"
                  >
                    DownLoad Log
                  </TableHeaderColumn>
                </BootstrapTable>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {failedLogModal ? (
        <FailedLogModal
          failedEventLog={failedEventLog}
          estDateTime={estDateTime}
          isFetching={isFetching}
          isFailedLogModal={isfailedLogModalOpen =>
            setFailedLogModal(isfailedLogModalOpen)
          }
          isViewLogModal={isViewLogModalOpen =>
            setViewLogModal(isViewLogModalOpen)
          }
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default ViewLogModal
