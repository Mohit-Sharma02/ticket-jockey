import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import { confirmAlert } from "react-confirm-alert" // Import
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardHeader,
  Button
} from "reactstrap"

import DataTable from "./DataTable"
import CreateVenueForm from "./widgets/CreateVenueForm"
import Spinner from "../../components/Spinner"
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect"

const Search = ({
  appReceiveAlert,
  saveSelectEvent,
  searchEventFilters,
  saveFiltersChange,
  addSearchFilter,
  clearSelectEvent,
  clearSearchEvents,
  createManagedEventsRequest,
  createManagedVenueRequest,
  selectModalSkyboxEvents,
  fetchEventsByKeywordRequest,
  fetchEventsByKeywordClear,
  searchSkyboxVenueIdRequest,
  setSkyBoxVenueId,
  setTMasterVenueId,
  closeModalSkyBoxEventsNotFounded,
  skyBoxVenueId,
  tMasterVenueId,
  events,
  skyBoxEventsDup,
  noSkyboxEvents,
  totalEventsNum,
  isFetching,
  location
}) => {
  const [keyword, setKeyword] = useState("")
  const [filter, setFilter] = useState("")
  const selectedSkyBoxEvents = {}

  useEffect(() => {
    return () => {
      clearSearchEvents()
    }
  }, [])

  const handleFilterChange = evt => {
    saveFiltersChange({
      [evt.target.name]: evt.target.checked
    })
  }

  const handleRadioChange = (evt, selectedEvent) => {
    const { name } = evt.target
    selectedSkyBoxEvents[name] = selectedEvent
  }

  const selectRow = {
    mode: "checkbox"
    // customComponent: CustomMultiSelectTable
  }

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button
        color="primary"
        className="btn-pill react-bs-table-del-btn"
        onClick={onBtnClick}
      >
        Manage
      </Button>
    )
  }

  const composeMap = events =>
    events.reduce((accu, event) => {
      accu[event.eventId] = event
      return accu
    }, {})

  const customConfirm = (next, dropRowKeys) => {
    if (window.confirm("Are you sure you want to publish these listings?")) {
      const eventsMap = composeMap(noSkyboxEvents)
      const selectedEvent = dropRowKeys.map(key => {
        return eventsMap[key]
      })
      let eventInfo = { eventInfo: selectedEvent }
      createManagedEventsRequest({ events: eventInfo })
      next()
      closeModalSkyBoxEventsNotFounded()
    }
  }

  const cellEditProp = {
    mode: "click",
    blurToSave: true
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
    <div>
      <Modal
        isOpen={!!Object.keys(skyBoxEventsDup).length}
        className={"modal-danger"}
      >
        <ModalHeader>Please select the right skybox event</ModalHeader>
        <ModalBody>
          {Object.entries(skyBoxEventsDup).map(([eventId, skyboxEvents]) => {
            return (
              <Card key={`${eventId}`} style={{ backgroundColor: "white" }}>
                <CardHeader style={{ backgroundColor: "grey" }}>
                  EventId: {eventId}
                </CardHeader>
                <CardBody>
                  {skyboxEvents.map((event, idx) => {
                    const { name, date, venue } = event

                    console.log("CardHeader", event)

                    return (
                      <FormGroup
                        style={{ marginLeft: "1rem" }}
                        className="radio"
                        key={`${eventId}-${idx}`}
                      >
                        <Input
                          className="form-check-input"
                          type="radio"
                          id={`${eventId}-${idx}`}
                          name={eventId}
                          value={event}
                          onChange={evt => handleRadioChange(evt, event)}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor={`${eventId}-${idx}`}
                        >
                          {`
                            Event: ${name}
                            Date: ${date} Location: ${venue.name}`}
                        </Label>
                      </FormGroup>
                    )
                  })}
                </CardBody>
              </Card>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              selectModalSkyboxEvents(selectedSkyBoxEvents)
            }}
          >
            Ok
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={noSkyboxEvents.length > 0}
        style={{ maxWidth: "60%", fontSize: "20px" }}
        className={"modal-danger"}
      >
        <ModalHeader>
          Please Manage Event Again (Not Found In Skybox)
        </ModalHeader>
        <ModalBody>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={noSkyboxEvents}
                version="4"
                striped
                hover
                pagination
                options={options}
                cellEdit={cellEditProp}
                deleteRow
                // insertRow
                selectRow={selectRow}
              >
                <TableHeaderColumn
                  dataField="eventId"
                  isKey
                  editable={false}
                  width="15%"
                >
                  EventID
                </TableHeaderColumn>
                <TableHeaderColumn
                  width="10%"
                  dataField="VenueId"
                  editable={false}
                >
                  VenueId
                </TableHeaderColumn>
                <TableHeaderColumn dataField="eventName" editable={true}>
                  Event
                </TableHeaderColumn>
                <TableHeaderColumn dataField="eventAddress" editable={true}>
                  Location
                </TableHeaderColumn>
                <TableHeaderColumn dataField="eventDate" editable={false}>
                  Date
                </TableHeaderColumn>
                {/* <TableHeaderColumn
                  dataField="stockType"
                  dataAlign="left"
                  editable={{ type: "select", options: { values: stockTypes } }}
                >
                  StockType
                </TableHeaderColumn> */}
              </BootstrapTable>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              closeModalSkyBoxEventsNotFounded()
              // selectModalSkyboxEvents(selectedSkyBoxEvents)
            }}
          >
            close
          </Button>
        </ModalFooter>
      </Modal>

      <div className="full_width">
        <div className="page_name">
          <h2>Search</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-6 mb_full_991">
                <CreateVenueForm
                  setSkyBoxVenueId={setSkyBoxVenueId}
                  skyBoxVenueId={skyBoxVenueId}
                  setTMasterVenueId={setTMasterVenueId}
                  tMasterVenueId={tMasterVenueId}
                  searchSkyboxVenueIdRequest={searchSkyboxVenueIdRequest}
                  firstSearchEvent={(events.length >= 1 && events[0]) || ""}
                  handleCreate={info => {
                    if (!keyword) return window.alert("Please input keyword!")

                    if (!info.tMasterVenueId)
                      return window.alert("Please input TMaster venue id!")

                    if (!info.skyboxVenueId)
                      return window.alert("Please input Skybox venue id!")

                    // if (!info.startDate || !info.endDate)
                    //   return window.alert("Please fill out date!")

                    const filters = Object.entries(searchEventFilters)
                      .filter(([filter, bool]) => bool)
                      .map(([filter, bool]) => filter)

                    // const filterStr = filters.join("\n")

                    confirmAlert({
                      title: "Warning",
                      message: (
                        <span>
                          {`Are you sure you want to create a managed venue with
                        these filters? `}
                          {filters.map((value, index) => {
                            return <label>{value}</label>
                          })}
                        </span>
                      ),
                      closeOnClickOutside: false,
                      buttons: [
                        {
                          label: "Cancel"
                        },
                        {
                          label: "Confirm",
                          onClick: () => {
                            createManagedVenueRequest({
                              keyword,
                              filters,
                              ...info
                            })
                          }
                        }
                      ]
                    })
                  }}
                />
              </div>
              <div className="col-sm-6 mb_full_991">
                <div className="white_box mrgbtm50 bx_min_HH">
                  <div className="cm_ttl">
                    <h2>Search Events</h2>
                  </div>
                  <div className="inner_box_body">
                    <Form>
                      <Form.Group>
                        <Form.Label>Live Experiences:</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          returnkeytype="search"
                          value={keyword}
                          onChange={evt => setKeyword(evt.target.value)}
                          onKeyPress={evt => {
                            if (
                              evt.key === "Enter" ||
                              evt.charCode === 13 ||
                              evt.which === 13 ||
                              evt.keyCode === 13
                            ) {
                              if (!keyword) {
                                return appReceiveAlert({
                                  message: "Please Input Event Keyword"
                                })
                              }

                              fetchEventsByKeywordClear()
                              fetchEventsByKeywordRequest({ keyword })
                            }
                          }}
                          placeholder="Find millions of live experiences"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Filter:</Form.Label>
                        <div className="pos_rel check_group">
                          {Object.keys(searchEventFilters).map(filter => (
                            <Form.Group controlId="formBasicCheckbox1">
                              <Form.Check
                                checked={searchEventFilters[filter]}
                                type="checkbox"
                                id={filter}
                                name={filter}
                                onChange={evt => handleFilterChange(evt)}
                                label={filter}
                              />
                            </Form.Group>
                          ))}
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Filter Type:</Form.Label>
                        <div className="pos_rel">
                          <Form.Control
                            type="text"
                            id="filter"
                            name="filter"
                            placeholder="Type filter name"
                            value={filter}
                            onChange={evt => setFilter(evt.target.value)}
                          />
                          <span
                            className="add_tag"
                            onClick={() => {
                              if (!filter)
                                return window.alert("Please input filter!")
                              addSearchFilter({ [`${filter}`]: true })
                              saveFiltersChange({
                                [`${filter}`]: true
                              })
                              setFilter("")
                            }}
                          >
                            Add Filter
                          </span>
                        </div>
                      </Form.Group>
                      {isMobile ? (
                        <Form.Group className="text-center">
                          <Button
                            className="big_btn"
                            variant="primary"
                            onClick={evt => {
                              if (!keyword) {
                                return appReceiveAlert({
                                  message: "Please Input Event Keyword"
                                })
                              }
                              fetchEventsByKeywordClear()
                              fetchEventsByKeywordRequest({ keyword })
                            }}
                          >
                            search
                          </Button>
                        </Form.Group>
                      ) : (
                        ""
                      )}
                    </Form>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Search Events</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    {/* <div className="table_head"> */}
                    {/* <ToggleButtonGroup
                    className="cs_btn_group"
                    type="radio"
                    name="options"
                    defaultValue={1}
                  >
                    <ToggleButton value={1}>Blacklist</ToggleButton>
                    <ToggleButton value={2}>Show Selected Only</ToggleButton>
                  </ToggleButtonGroup> */}

                    {/* <div className="select_eq">
                    <div className="float-right">
                      <div className="fl_eq_box">
                        <Form.Control className="" as="select">
                          <option value="">Search by event</option>
                          <option value="1">Type 1</option>
                          <option value="2">Type 2</option>
                        </Form.Control>
                      </div>

                      <div className="fl_eq_box">
                        <Form.Control as="select">
                          <option value="">Search by type</option>
                          <option value="1">Type 1</option>
                          <option value="2">Type 2</option>
                        </Form.Control>
                      </div>

                      <div className="fl_eq_box">
                        <Form.Control
                          className="search_icon"
                          type="text"
                          placeholder="Search..."
                        />
                      </div>

                      <span className="del_btn" href="javascript:;">
                        <img
                          src={require("./../../assets/img/close-icon.png")}
                        />
                      </span>
                    </div>
                  </div> */}
                    {/* </div> */}
                    <div className="tbl_main">
                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : Object.keys(events).length ? (
                          <DataTable
                            events={events}
                            totalEventsNum={totalEventsNum}
                            location={location}
                            createManagedEventsRequest={
                              createManagedEventsRequest
                            }
                            saveSelectEvent={saveSelectEvent}
                            clearSelectEvent={clearSelectEvent}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
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

export default Search
