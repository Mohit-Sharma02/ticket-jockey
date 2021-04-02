import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import TicketPurchased from "./ticketPurchased"
import { dateSortFuncForEvent } from "../../utils"

import {
  TYPE_TRANSFER_LISTING,
  TYPE_SALE_LISTING,
  TYPE_PROBLEM_BUYING_LISTING
} from "../../constants"
import { withRouter } from "react-router-dom"

const selectRow = {
  mode: "checkbox",
  clickToExpand: true
}

// const priceFormat = cell => cell && <i>{`$${cell}`}</i>

const ListingsDataTable = ({
  data,
  actions,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  type,
  saveSelectEvent,
  history,
  updateEventTmOrderNumber
}) => {
  const isNotEmpty = Array.isArray(data)
    ? data.length
    : Object.keys(data).length

  const [showTicketPurchased, setShowTicketPurchased] = useState(false)
  const [purchasedKey, setPurchasedKey] = useState("")
  const [OrderNotes, setOrderNotes] = useState(false)
  const [tmOrderEventId, setTmOrderEventId] = useState("")

  const trClassName = (row, rowIndex) => {
    if (!row) return ""

    if (type === TYPE_SALE_LISTING) {
      const { currentlyTryingToBuy, problemBuying, readyToBuy } = row

      if (currentlyTryingToBuy) {
        return "yellow-bg-cl"
      }

      if (problemBuying) {
        return "red-bg-cl"
      }

      if (readyToBuy != undefined && !readyToBuy) {
        return "purple-bg-cl"
      }

      return "green-bg-cl blink"
    } else if (type === TYPE_TRANSFER_LISTING) {
      return ""
    }
  }

  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button color="primary" className="btn-pill" onClick={onBtnClick}>
          {type == TYPE_TRANSFER_LISTING
            ? "Complete Order"
            : "Ticket Purchased"}
        </Button>

        {showTicketPurchased ? (
          <TicketPurchased
            purchasedKey={purchasedKey}
            ticketPurchasedRequest={ticketPurchasedRequest}
            isTicketPurchase={isTicketPurchaseOpen =>
              setShowTicketPurchased(isTicketPurchaseOpen)
            }
          />
        ) : (
          ""
        )}
      </>
    )
  }

  const customConfirm = (next, dropRowKeys) => {
    if (type === TYPE_TRANSFER_LISTING) {
      deleteOpenListingsRequest(dropRowKeys)
    } else if (
      type === TYPE_SALE_LISTING ||
      type === TYPE_PROBLEM_BUYING_LISTING
    ) {
      setShowTicketPurchased(true)
      setPurchasedKey(dropRowKeys[0])
      // ticketPurchasedRequest(dropRowKeys)
    }
    // next()
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
    handleConfirmDeleteRow: customConfirm,
    expandBy: "column",
    defaultSortName: "eventDetails" // default sort column name
    // defaultSortOrder: "desc" // default sort order
  }

  const TMAndGAFormatter = (cell, row) => {
    if (row.isGa == true) return row.gaAvailability
    else return row.highestRowsBack
  }

  const newUrlFormatter = (cell, row) => {
    return (
      <a
        href={row.eventUrl !== "" ? row.eventUrl : row.ticketMasterUrl}
        target="_blank"
      >
        {row.eventId}
      </a>
    )
  }

  const detailsFormatter = (cell, row) => {
    return (
      <div>
        <span>{row.eventName}</span>
        <br />
        <span>{row.eventAddress}</span>
        <br />
        <span>{row.eventDate}</span>
      </div>
    )
  }

  const sectionFormatter = (cell, row) => {
    return (
      <div>
        <span>Seat: {row.seat}</span>
        <br />
        <span>Qty: {row.quantitySold}</span>
        <br />
        <span>
          Base Cost:{" "}
          {row.baseCost
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(row.baseCost)
            : ""}
        </span>
        <br />
        <span>
          Final Cost:{" "}
          {row.unitCost
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(row.unitCost)
            : ""}
        </span>
      </div>
    )
  }

  const isExpandRow = () => {
    return true
  }

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>External Reference</label>{" "}
          <span className="row_val"> {`${row.externalReference || ""}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Sale Time</label>{" "}
          <span className="row_val"> {`${row.saleTime}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>InvoiceId</label>{" "}
          <span className="row_val">
            <a href={row.invoiceIdUrl} target="_blank">
              {row.invoiceId}
            </a>
            {type === TYPE_TRANSFER_LISTING ? (
              ""
            ) : (
              <Button
                className="problematic_btn"
                variant="primary"
                onClick={() => {
                  saveSelectEvent(row)
                  history.push({
                    pathname: `/event/${row.eventId}`,
                    state: { from: "ListingsDataTable" }
                  })
                }}
              >
                View Event
              </Button>
            )}
          </span>
        </div>
        <div className="expand_row_inner">
          <label>Order Notes </label>
          {OrderNotes && tmOrderEventId === row.eventId ? (
            <>
              <Form.Control
                type="text"
                className="problematic_form_control"
                id={row.eventId}
                defaultValue={`${row.orderNotes || ""}`}
                onChange={evt => {
                  row.orderNotes = evt.target.value
                }}
              />
              <Button
                className="problematic_btn"
                variant="primary"
                id={row.eventId}
                onClick={() => {
                  var order_Notes = row.orderNotes
                  var listingId =
                    row.listingId !== undefined ? row.listingId : ""
                  updateEventTmOrderNumber({
                    listingId: listingId,
                    orderNotes: order_Notes
                  })
                  setOrderNotes(false)
                }}
              >
                Update Notes
              </Button>
            </>
          ) : (
            <span
              className="row_val"
              onClick={() => {
                setOrderNotes(true)
                setTmOrderEventId(row.eventId)
              }}
              style={{ cursor: "pointer", display: "block" }}
            >
              {row.orderNotes ? `${row.orderNotes}` : <>&nbsp;</>}
            </span>
          )}
        </div>
      </div>
    )
  }
  if (type === TYPE_TRANSFER_LISTING) {
    return (
      <div className="animated">
        {isNotEmpty ? (
          <BootstrapTable
            data={data}
            version="4"
            striped
            hover
            pagination
            options={options}
            trClassName={trClassName}
            selectRow={selectRow}
            expandableRow={isExpandRow}
            expandComponent={expandRow}
            expandColumnOptions={{ expandColumnVisible: true }}
            deleteRow
            search
          >
            <TableHeaderColumn dataField="listingId" isKey hidden>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              width="12%"
              dataField="eventId"
              dataFormat={newUrlFormatter}
            >
              EventID
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={detailsFormatter}
              dataField="eventDetails"
              sort={"asc"}
              dataSort
              sortFunc={dateSortFuncForEvent}
            >
              Event Details
            </TableHeaderColumn>
            <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
              Ticket Details
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventName" hidden>
              EventName
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventAddress" hidden>
              Venue
            </TableHeaderColumn>
            <TableHeaderColumn dataField="invoiceId" hidden>
              InvoiceId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="customerDisplayName" hidden>
              CustomerDisplayName
            </TableHeaderColumn>
            {actions && actions()}
          </BootstrapTable>
        ) : (
          <Spinner />
        )}
      </div>
    )
  } else {
    return (
      <div className="animated">
        {isNotEmpty ? (
          <BootstrapTable
            data={data}
            version="4"
            striped
            hover
            pagination
            options={options}
            // trStyle={trStyle}
            trClassName={trClassName}
            selectRow={selectRow}
            expandableRow={isExpandRow}
            expandComponent={expandRow}
            expandColumnOptions={{ expandColumnVisible: true }}
            deleteRow
            search
          >
            <TableHeaderColumn dataField="listingId" isKey hidden>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              width="12%"
              dataField="eventId"
              dataFormat={newUrlFormatter}
            >
              EventID
            </TableHeaderColumn>
            {/* <TableHeaderColumn
          dataField="ticketMasterUrl"
          dataFormat={urlFormatter("TicketMaster")}
        >
          TicketMasterUrl
        </TableHeaderColumn> */}
            <TableHeaderColumn
              dataFormat={detailsFormatter}
              dataField="eventDetails"
              sort={"asc"}
              dataSort
              sortFunc={dateSortFuncForEvent}
            >
              Event Details
            </TableHeaderColumn>
            <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
              Ticket Details
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventName" hidden>
              EventName
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventAddress" hidden>
              Venue
            </TableHeaderColumn>
            <TableHeaderColumn dataField="invoiceId" hidden>
              invoiceId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="externalReference" hidden>
              externalReference
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventId" hidden>
              eventId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="customerDisplayName" hidden>
              CustomerDisplayName
            </TableHeaderColumn>
            {/* <TableHeaderColumn dataField="eventDate" hidden>EventDate</TableHeaderColumn> */}
            {/* <TableHeaderColumn dataField="eventName">EventName</TableHeaderColumn>
        <TableHeaderColumn dataField="eventAddress">Venue</TableHeaderColumn>
        <TableHeaderColumn dataField="eventDate">EventDate</TableHeaderColumn>
        <TableHeaderColumn dataField="seat">Seat</TableHeaderColumn>
        <TableHeaderColumn dataField="quantitySold">Qty Sold</TableHeaderColumn>
        <TableHeaderColumn dataField="saleTime">SaleTime</TableHeaderColumn>
        <TableHeaderColumn
          dataField="invoiceId"
          dataFormat={urlFormatter("InvoceIdUrl")}
        >
          InvoiceId
        </TableHeaderColumn>
        <TableHeaderColumn dataField="problemNotes">
          ProblemNotes
        </TableHeaderColumn>
        {type === TYPE_TRANSFER_LISTING && (
          <TableHeaderColumn dataField="orderNum">OrderNum</TableHeaderColumn>
        )} */}
            {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="currentlyTryingToBuy">
            CurrentlyTryingToBuy
          </TableHeaderColumn>
        )} */}
            {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="reasonProblemBuying">
            ReasonProblemBuying
          </TableHeaderColumn>
        )}*/}
            <TableHeaderColumn width="12%" dataFormat={TMAndGAFormatter}>
              TMRowsBack/GA availability
            </TableHeaderColumn>
            {/* <TableHeaderColumn
          width="10%"
          dataField="baseCost"
          dataFormat={priceFormat}
        >
          BaseCost
        </TableHeaderColumn> */}
            {actions && actions()}
          </BootstrapTable>
        ) : (
          <Spinner />
        )}
      </div>
    )
  }
}

export default withRouter(ListingsDataTable)
