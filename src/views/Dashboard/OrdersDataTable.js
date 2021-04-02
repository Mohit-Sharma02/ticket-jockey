import React from "react"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"

import { dateSortFunc } from "../../utils"

const OrdersDataTable = ({ data, actions }) => {
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
    defaultSortName: "formattedEventDate", // default sort column name
    defaultSortOrder: "desc" // default sort order
  }

  const urlFormatter = text => (cell, row) => {
    return (
      <a href={cell} target="_blank">
        {text}
      </a>
    )
  }

  return (
    <div className="animated">
      <BootstrapTable
        data={data}
        version="4"
        striped
        hover
        pagination
        options={options}
      >
        <TableHeaderColumn
          dataField="invoiceId"
          isKey
          dataFormat={urlFormatter("InvoceIdUrl")}
        >
          InvoiceID
        </TableHeaderColumn>
        <TableHeaderColumn dataField="eventName">EventName</TableHeaderColumn>
        <TableHeaderColumn
          dataField="formattedEventDate"
          dataSort
          sortFunc={dateSortFunc}
        >
          EventDate
        </TableHeaderColumn>
        <TableHeaderColumn dataField="section">Section</TableHeaderColumn>
        <TableHeaderColumn dataField="row">Row</TableHeaderColumn>
        <TableHeaderColumn dataField="quantity">Quantity</TableHeaderColumn>
        <TableHeaderColumn dataField="notes">Notes</TableHeaderColumn>
        {actions && actions()}
      </BootstrapTable>
    </div>
  )
}

export default OrdersDataTable
