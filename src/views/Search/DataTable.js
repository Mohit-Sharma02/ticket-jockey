import React, { memo, useState } from "react"
//import { Card, Button, CardBody } from "reactstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { withRouter } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"

import { stockTypes } from "../../constants"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"

const composeMap = events =>
  events.reduce((accu, event) => {
    accu[event.eventId] = event
    return accu
  }, {})

const DataTable = ({
  createManagedEventsRequest,
  events,
  history,
  saveSelectEvent,
  clearSelectEvent
}) => {
  const [stepModal, setStepModal] = useState(false)
  const [modalBody, setModalBody] = useState("")
  const [isShow, setIsShow] = useState(false)
  const cellEditProp = {
    mode: "click",
    blurToSave: true
  }

  // const onSelectRow = (row, isSelected, e) => {
  // }

  const selectRow = {
    mode: "checkbox",
    showOnlySelected: true,
    clickToSelect: true,
    //unselectable: [2],
    selected: [0],
    customComponent: CustomMultiSelectTable
  }

  const createCustomDeleteButton = (onBtnClick, rowIndex, e) => {
    return (
      <>
        <Button color="primary" className="btn-pill" onClick={onBtnClick}>
          Manage
        </Button>
      </>
    )
  }

  const customConfirm = (next, dropRowKeys, row, cell) => {
    if (dropRowKeys.length == 1) {
      setIsShow(true)
      setStepModal(true)
    } else {
      confirmAlert({
        title: "Warning",
        message: <span>Are you sure you want to publish these listings?</span>,
        closeOnClickOutside: false,
        buttons: [
          {
            label: "Cancel"
          },
          {
            label: "Confirm",
            onClick: () => {
              const eventsMap = composeMap(events)
              dropRowKeys.shift()
              const selectedEvent = dropRowKeys.map(key => {
                const {
                  eventId,
                  eventName,
                  eventDate,
                  eventAddress,
                  timeZone,
                  stockType,
                  venueId,
                  VenueName,
                  VenueAddress,
                  VenueCity,
                  VenueState,
                  VenueCityState,
                  VenuePostalCode
                } = eventsMap[key]

                return {
                  eventId,
                  eventName,
                  eventDate,
                  eventAddress,
                  timeZone,
                  stockType,
                  VenueId: venueId,
                  VenueName,
                  VenueAddress,
                  VenueCity,
                  VenueState,
                  VenueCityState,
                  VenuePostalCode
                }
              })
              let eventInfo = { eventInfo: selectedEvent }

              createManagedEventsRequest({ events: eventInfo })
              next()
            }
          }
        ]
      })
    }
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

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            saveSelectEvent(row)
            history.push({
              pathname: `/event/${row.eventId}`
            })
          }}
        >
          Details
        </Button>
      </div>
    )
  }

  return (
    <div className="animated">
      <BootstrapTable
        data={events}
        version="4"
        striped
        hover
        pagination
        selectRow={selectRow}
        deleteRow
        options={options}
        cellEdit={cellEditProp}
        search
      >
        <TableHeaderColumn
          dataField="eventId"
          isKey
          editable={false}
          width="10%"
        >
          EventID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="venueId" editable={false}>
          VenueId
        </TableHeaderColumn>
        <TableHeaderColumn dataField="eventName" editable={false}>
          Event
        </TableHeaderColumn>
        <TableHeaderColumn dataField="eventAddress" editable={false}>
          Location
        </TableHeaderColumn>
        <TableHeaderColumn dataField="formattedEventDate" editable={false}>
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="stockType"
          dataAlign="left"
          editable={{ type: "select", options: { values: stockTypes } }}
        >
          StockType
        </TableHeaderColumn>
        {/* <TableHeaderColumn
          dataField="button"
          dataFormat={buttonFormatter}
          editable={false}
          dataAlign="center"
        >
          Action
        </TableHeaderColumn> */}
      </BootstrapTable>

      {isShow ? (
        <Modal
          size="md"
          centered
          show={stepModal}
          onHide={() => {
            setStepModal(false)
          }}
        >
          <Modal.Header closeButton style={{ background: "red" }}>
            <Modal.Title className="order_title">Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please Select Atleast One EventId</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setStepModal(false)
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  )
}

export default memo(withRouter(DataTable))
