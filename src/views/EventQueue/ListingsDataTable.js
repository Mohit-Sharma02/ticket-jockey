import React, { useRef } from "react"
import { Button, ButtonGroup } from "reactstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

const selectRow = {
  mode: "checkbox"
}

const ListingsDataTable = ({
  data,
  deleteManagedEventsQueueRequest,
  addManagedEventFromQueueRequest
}) => {
  const tableRef = useRef()

  const createCustomButtonGroup = props => {
    return (
      <ButtonGroup>
        {props.showSelectedOnlyBtn}
        <Button
          color="primary"
          aria-pressed="true"
          onClick={evt => {
            const selectedRowKeys = tableRef.current.state.selectedRowKeys

            selectedRowKeys.length &&
              deleteManagedEventsQueueRequest(selectedRowKeys)

            tableRef.current.handleDropRow(selectedRowKeys) //handleDropRow will call the function ,customConfirm, passed to the 'handleConfirmDeleteRow' property of options
          }}
        >
          Delete Events From Queue
        </Button>
        <Button
          color="primary"
          aria-pressed="true"
          onClick={evt => {
            const selectedRowKeys = tableRef.current.state.selectedRowKeys

            selectedRowKeys.length &&
              addManagedEventFromQueueRequest(selectedRowKeys)

            tableRef.current.handleDropRow(selectedRowKeys)
          }}
        >
          Add To Managed Events
        </Button>
      </ButtonGroup>
    )
  }

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span> Are you sure you want to do this? </span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            next()
          }
        }
      ]
    })
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
    handleConfirmDeleteRow: customConfirm,
    btnGroup: createCustomButtonGroup
  }

  const urlFormatter = text => (cell, row) => {
    return (
      <a href={cell} target="_blank">
        {text}
      </a>
    )
  }

  return (
    <div className="inner_main">
      <div className="full_width">
        <div className="row">
          <div className="col-sm-12">
            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Managed Events Queue</h2>
              </div>
              <div className="inner_box_body padL3T5">
                <div className="tbl_main">
                  <div className="inner_tbl">
                    <BootstrapTable
                      ref={tableRef}
                      data={data}
                      version="4"
                      striped
                      hover
                      pagination
                      options={options}
                      selectRow={selectRow}
                      deleteRow
                      search
                    >
                      <TableHeaderColumn isKey dataField="eventId">
                        EventID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ticketMasterUrl"
                        dataFormat={urlFormatter("TicketMaster")}
                      >
                        TicketMasterUrl
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="eventName">
                        EventName
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="eventAddress">
                        Venue
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="formattedEventDate">
                        EventDate
                      </TableHeaderColumn>
                    </BootstrapTable>
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

export default ListingsDataTable
