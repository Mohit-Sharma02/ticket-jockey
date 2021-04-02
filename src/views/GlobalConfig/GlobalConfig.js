import React, { useEffect } from "react"
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"

const selectRow = {
  mode: "checkbox",
  customComponent: CustomMultiSelectTable
}

const GlobalConfig = ({
  globals,
  fetchGlobalConfigRequest,
  deleteGlobalConfigRequest,
  addGlobalConfigRequest,
  updateGlobalConfigRequest
}) => {
  useEffect(() => {
    fetchGlobalConfigRequest()
  }, [])

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
      message: (
        <span>Are you sure you want to delete these global config?</span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            deleteGlobalConfigRequest(dropRowKeys)
            next()
          }
        }
      ]
    })
  }

  const handleInsertedRow = row => {
    addGlobalConfigRequest(row)
  }

  const cellEditProp = {
    mode: "click",
    blurToSave: true
  }

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            updateGlobalConfigRequest(row)
          }}
        >
          Update Configration
        </Button>
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
    handleConfirmDeleteRow: customConfirm,
    afterInsertRow: handleInsertedRow,
    insertText: "Add Configration"
  }

  return (
    <div className="inner_main">
      <div className="full_width">
        <div className="row">
          <div className="col-sm-12">
            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Global Configration</h2>
              </div>
              <div className="inner_box_body padL3T5">
                <div className="tbl_main cm_tbl_btn_main">
                  <div className="inner_tbl">
                    <BootstrapTable
                      data={globals}
                      version="4"
                      striped
                      hover
                      pagination
                      options={options}
                      cellEdit={cellEditProp}
                      deleteRow
                      insertRow
                      selectRow={selectRow}
                      search
                    >
                      <TableHeaderColumn dataField="keyName" isKey>
                        Key Name
                      </TableHeaderColumn>
                      <TableHeaderColumn dataField="value">
                        Value
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        // dataField="button"
                        dataFormat={buttonFormatter}
                        dataAlign="center"
                        editable={false}
                        width="300"
                      >
                        Action
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

export default GlobalConfig
