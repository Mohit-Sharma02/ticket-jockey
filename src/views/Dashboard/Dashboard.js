import React, { useEffect, useState } from "react"
// import { AppSwitch } from "@coreui/react"
import { Button, FormGroup, Input } from "reactstrap"
// import BootstrapSwitchButton from "bootstrap-switch-button-react"
import { Row, Col, Form, OverlayTrigger, Tooltip, Modal } from "react-bootstrap"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
// import styled from "styled-components"

import Spinner from "../../components/Spinner"
import ListingsDataTable from "./ListingsDataTable"
import RedListingsDataTable from "./RedListingsDataTable"
import OrdersDataTable from "./OrdersDataTable"
import OrderFlowDataTable from "./OrderFlowDataTable"
// import DataTableWithCollapseAndFetching from "../../components/DataTableWithCollapseAndFetching"
import { TYPE_SALE_LISTING, TYPE_TRANSFER_LISTING } from "../../constants"
// import { RoleManger } from "../../effects"
import {
  PROBLEM_BUYING_REASON,
  SECONDARY_MARKET_LOCATION
} from "../../constants"

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Statistics from "./Statistics"
import ClockTimer from "./ClockTimer"
import ManualPdfTransfer from "./ManuaPDFTransfer"
import moment from "moment-timezone"
import { withRouter } from "react-router-dom"
import { getCurrentWorkingEmployee } from "../../utils/validation"
// import { getEvenuePDF } from "../../reducers/listings"
var generator = require("generate-password")

const Dashboard = ({
  isFetching,
  isResetPasswordFetching,
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  openSaleslistings,
  openTransferslistings,
  tryBuyAgainRequest,
  manualTransferRequest,
  purchasedTicketInfo,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  // deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  problemBuyingRequest,
  doneBuyingRequest,
  // fetchUpcomingOpenOrdersRequest,
  upcomingOpenOrders,
  fetchOpenListingsRequest,
  // fetchSimulateTrackedListingsRequest,
  trackedListings,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  orderFlowListings,
  fetchPDFAttachmentRequest,
  fetchOrderfullfillmentRequest,
  fullfillOrder,
  pdfAttachment,
  sendEmailRequest,
  globals,
  fetchGlobalConfigRequest,
  cloakListings,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  soldStatisticsLog,
  fetchPDFDownlaodedRequest,
  pdfDownloaded,
  saveSelectEvent,
  userInfo,
  appReceiveAlert,
  updateEventTmOrderNumber,
  history,
  fetchClockTimerRequest,
  clockTimerList,
  createTimerRequest,
  fetchEvenuePDFRequest,
  evenuePDf
}) => {
  useEffect(() => {
    fetchGlobalConfigRequest()
    fetchOpenSalesRequest()
    fetchOpenTransfersRequest()
    fetchOrderFlowRequest()
    fetchClockTimerRequest({
      StartDate: moment(new Date()).format("YYYY-MM-DD"),
      EndDate: moment(new Date())
        .add(1, "days")
        .format("YYYY-MM-DD"),
      name: "",
      id: userInfo._id + ":" + moment().format("YYYY-MM-DD")
    })
    const tId = setInterval(() => {
      fetchOpenListingsRequest()
    }, 1000 * 60 * 5) //polling every 5 minutes

    return () => {
      tId && clearInterval(tId)
    }
  }, [])
  const [modal, setModal] = useState(false)
  const [soldQuantity, setSoldQuantity] = useState("")
  const [orderNum, setOrderNum] = useState("")
  const [secondaryMarketOrderNum, setSecondaryMarketOrderNum] = useState("")
  const [secondaryMarketLocation, setSecondaryMarketLocation] = useState("")
  // const [reason, setReason] = useState(PROBLEM_BUYING_REASON[0])
  const [reason, setReason] = useState("")
  // const [emailOption, setEmailOption] = useState("")
  const [problemNotes, setProblemNotes] = useState("")
  const [showPdfTransfer, setShowPdfTransfer] = useState(false)
  const [purchasedKey, setPurchasedKey] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [spinnerTime, setSpinnerTime] = useState(false)

  const [newPass, setNewPass] = useState("")
  const [eventKey, setEventKey] = useState("")
  const [showRowSec, setShowRowSec] = useState(false)
  const [purchaseSection, setPurchaseSection] = useState("")
  const [purchaseRow, setPurchaseRow] = useState("")
  const [isPurchaseSecRow, setIsPurchaseSecRow] = useState(false)
  let passwordNew = ""

  // if (isFetching) return <Spinner />
  const {
    email, //the successful response from calling the "/buyingTicket" api
    password,
    phoneNumber,
    address,
    name,
    capOne,
    amex,
    comdata,
    citi1,
    citi2,
    locked,
    globalPromos,
    eventInfo: {
      listingId,
      eventName,
      eventDate,
      eventAddress,
      seat,
      quantitySold,
      baseCost,
      unitCost,
      ticketMasterUrl,
      eventUrl,
      promos,
      venueId
    },
    userPurchaseSummary
  } = purchasedTicketInfo //the state of the tickets that are about to being purchased

  const [section, row] = seat ? seat.split(", ") : []

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button color="primary" className="btn-pill" onClick={onBtnClick}>
        Simulate
      </Button>
    )
  }

  const customConfirm = (key, row) => {
    simulateSoldListingRequest({ soldListing: row, quantity: soldQuantity })
  }

  const modalOptions = {
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
    handleConfirmDeleteRow: next => {
      next()
    },
    // onDeleteRow: customConfirm,
    afterDeleteRow: customConfirm,
    // afterInsertRow: handleInsertedRow,
    insertText: "Add Configration"
  }

  const selectRow = {
    mode: "checkbox",
    customComponent: CustomMultiSelectTable
  }

  return (
    <div className="animated fadeIn">
      <Modal
        show={
          //After clicking the actions button, pop up a modal either when the logged user has a email or the 'userPurchaseSummary' is fetched
          !!email ||
          (userPurchaseSummary && Object.values(userPurchaseSummary).length > 0)
        }
        size="lg"
        className={"dash-popup"}
        centered
        // style={{ maxWidth: "45%", fontSize: "20px" }}
      >
        <Modal.Header>
          <h4 className="modal-title">
            {email
              ? "Here is the information of the event"
              : "Here is the user summary of purchases"}{" "}
          </h4>

          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={resetPurchasedTicketInfo}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        {email ? (
          <Modal.Body>
            <form-group>
              <div className="row">
                <div className="col-10">
                  <label>Email:</label> <span>{email}</span>
                </div>
                {venueId !== undefined ? (
                  ""
                ) : (
                  <div className="col-2">
                    <div style={{ float: "right" }}>
                      <div className="tbl_btn" style={{ marginLeft: "26%" }}>
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip>Reset Password</Tooltip>}
                        >
                          <Button
                            className="icon_btn"
                            active
                            color="primary"
                            aria-pressed="true"
                            onClick={() => {
                              var d = new Date()
                              var myTimezone = "America/New_York"
                              var myDatetimeFormat = "MM/DD/YYYY hh:mm a"
                              var new_date = moment(d)
                                .tz(myTimezone)
                                .format(myDatetimeFormat)
                              passwordNew = generator.generate({
                                length: 10,
                                numbers: true
                              })
                              setNewPass("1" + passwordNew)
                              resetEmailPasswordRequest({
                                email,
                                password: "1" + passwordNew,
                                updatedDate: new_date,
                                capOne,
                                amex,
                                comdata,
                                citi1,
                                citi2,
                                isActive: 1
                              })
                            }}
                          >
                            <img
                              src={require("./../../assets/img/refresh.png")}
                              alt="reset Password"
                            />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form-group>
            <form-group>
              <label>Password:</label>{" "}
              <span>{newPass === "" ? password : newPass}</span>
            </form-group>
            {phoneNumber && phoneNumber ? (
              <form-group>
                <label>Phone Number:</label> <span>{phoneNumber}</span>
              </form-group>
            ) : (
              ""
            )}
            {address && address ? (
              <form-group>
                <label>Address:</label> <span>{address}</span>
              </form-group>
            ) : (
              ""
            )}
            {name && name ? (
              <form-group>
                <label>Name:</label> <span>{name}</span>
              </form-group>
            ) : (
              ""
            )}
            <form-group>
              <div className="row">
                <div className="col-sm-2">
                  <span className="cc_title">Credit Card</span>
                </div>
                <div className="col-sm-10">
                  <div>
                    {"  "}
                    <b>Use credit cards, in this order of priority</b>
                  </div>
                  <div className="ov_scroll">
                    <table className="table">
                      <thead>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          CapOne
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Amex
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Comdata
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Citi #1
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Citi #2
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.month || "NA"}`}
                            /{" "}
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            <b> Card: </b>
                            {amex === undefined
                              ? "NA"
                              : `${amex.digit || "NA"}`}
                            <br />
                            <b> CVV: </b>
                            {amex === undefined ? "NA" : `${amex.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {amex === undefined
                              ? "NA"
                              : `${amex.month || "NA"}`}
                            /
                            {amex === undefined ? "NA" : `${amex.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.month || "NA"}`}
                            /
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.month || "NA"}`}
                            /
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.month || "NA"}`}
                            /
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.year || "NA"}`}
                            <br />
                          </td>
                        </tr>
                      </tbody>{" "}
                      <tbody />
                    </table>
                  </div>
                </div>
              </div>
            </form-group>
            <form-group>
              <label>Event Name:</label> <span>{eventName}</span>
            </form-group>
            <form-group>
              <label>Event Date:</label>
              <span> {eventDate}</span>
            </form-group>
            <form-group>
              <label>Event Address:</label>
              <span> {eventAddress}</span>
            </form-group>
            <form-group>
              <div className="fl_w">
                <label>Section:</label>
                <span>{section}</span>
              </div>
              <div className="fl_w">
                <label>Row: </label>
                <span>{row}</span>
              </div>
            </form-group>
            <form-group>
              <label>Quantity:</label>
              <span> {quantitySold}</span>
            </form-group>
            <form-group>
              <label>Base Cost:</label>
              <span>
                {" "}
                {baseCost
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(baseCost)
                  : ""}
              </span>
            </form-group>
            <form-group>
              <label>Final Cost:</label>
              <span>
                {" "}
                {unitCost
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(unitCost)
                  : ""}
              </span>
            </form-group>
            <form-group>
              {venueId !== undefined ? (
                <label>EVenue Link:</label>
              ) : (
                <label>TM Link:</label>
              )}
              <div className="row">
                <div className="col-10">
                  <span> {eventUrl !== "" ? eventUrl : ticketMasterUrl}</span>
                </div>
                <div className="col-2 copy-link_btn">
                  <CopyToClipboard
                    text={eventUrl !== "" ? eventUrl : ticketMasterUrl}
                    onCopy={() => ""}
                  >
                    <div style={{ float: "right" }}>
                      <div className="tbl_btn">
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip>Copy to ClipBoard</Tooltip>}
                        >
                          {/* <button className="copy-link_btn">Copy Link</button> */}
                          <Button
                            className="icon_btn"
                            active
                            color="primary"
                            aria-pressed="true"
                          >
                            <img
                              src={require("./../../assets/img/sheet.png")}
                              alt="copy Link"
                            />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </form-group>
            {locked ? (
              <form-group>
                <label>Promos:</label>
                <span>
                  {globalPromos && globalPromos
                    ? globalPromos.map(evt =>
                        Object.entries(evt).map(([key, value]) => (
                          <>
                            <span>
                              {key} : {value}
                            </span>
                            <br />
                          </>
                        ))
                      )
                    : ""}

                  {promos && promos
                    ? Object.entries(promos).map(([key, value]) => (
                        <>
                          <span>
                            {key} : {value}
                          </span>
                          <br />
                        </>
                      ))
                    : ""}
                </span>
              </form-group>
            ) : (
              ""
            )}
          </Modal.Body>
        ) : (
          <Modal.Body>
            {Object.entries(userPurchaseSummary)
              .sort((a, b) => a[1] - b[1])
              .map(([key, value]) => (
                <Row key={key}>
                  <Col className="col-7">
                    <p>Email: {key}</p>
                  </Col>
                  <Col className="col-5">
                    <p>Ticket Purchased: {value}</p>
                  </Col>
                </Row>
              ))}
          </Modal.Body>
        )}
        <Modal.Footer>
          {email ? (
            <div>
              <div className="row">
                <div className="col-sm-4">
                  <FormGroup>
                    <Input
                      type="select"
                      name="reason"
                      onChange={evt => {
                        setReason(evt.target.value)
                        setErrorMessage("")
                      }}
                      value={reason}
                    >
                      <option value="">--Select Reason--</option>
                      {PROBLEM_BUYING_REASON.map((reason, i) => (
                        <option key={i}>{reason}</option>
                      ))}
                    </Input>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  </FormGroup>
                </div>
                <div className="col-sm-4">
                  <FormGroup>
                    <Input
                      type="text"
                      name="problemNotes"
                      onChange={evt => setProblemNotes(evt.target.value)}
                      placeholder="Add Problem Notes"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-sm-4">
                  <FormGroup>
                    <Button
                      color="danger"
                      onClick={() => {
                        if (reason === "") {
                          setErrorMessage("Please Select Reason")
                        } else {
                          problemBuyingRequest({
                            listingId,
                            reason,
                            problemNotes
                          })
                          resetPurchasedTicketInfo()
                        }
                      }}
                    >
                      {"Problem Buying"}
                    </Button>
                  </FormGroup>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-sm-8">
                  <div className="fl_w">
                    <div className="row">
                      <div className="col-sm-12">
                        <FormGroup controlId="secRowChk" className="chk-secRow">
                          <Form.Check
                            checked={isPurchaseSecRow}
                            type="checkbox"
                            id="secRowChk"
                            name="secRowChk"
                            onChange={evt => {
                              if (!evt.target.checked) {
                                setShowRowSec(false)
                              } else {
                                setShowRowSec(true)
                              }
                              setIsPurchaseSecRow(evt.target.checked)
                            }}
                            label="If You purchase different section and row then please check the checkbox"
                          />
                        </FormGroup>
                      </div>
                      {showRowSec ? (
                        <>
                          <div className="col-sm-6">
                            <FormGroup>
                              <Input
                                type="text"
                                placeholder="Section"
                                name="section"
                                onChange={evt =>
                                  setPurchaseSection(evt.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </div>
                          <div className="col-sm-6">
                            <FormGroup>
                              <Input
                                type="text"
                                placeholder="Row"
                                name="Row"
                                onChange={evt =>
                                  setPurchaseRow(evt.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="col-sm-12">
                        <FormGroup>
                          <Input
                            type="text"
                            placeholder="TM Order Number"
                            name="orderNumber"
                            onChange={evt => setOrderNum(evt.target.value)}
                          ></Input>
                        </FormGroup>
                      </div>

                      <div className="col-sm-6">
                        <FormGroup>
                          <Input
                            type="text"
                            name="secondaryOrderNumber"
                            onChange={evt =>
                              setSecondaryMarketOrderNum(evt.target.value)
                            }
                            placeholder="Secondary market order number"
                          ></Input>
                        </FormGroup>
                      </div>
                      <div className="col-sm-6">
                        <FormGroup>
                          <Input
                            type="select"
                            name="secondaryMarketLocation"
                            onChange={evt => {
                              setSecondaryMarketLocation(evt.target.value)
                              setErrorMessage("")
                            }}
                            value={secondaryMarketLocation}
                          >
                            <option value="">
                              Secondary market purchase location
                            </option>
                            {SECONDARY_MARKET_LOCATION.map((location, i) => (
                              <option key={i}>{location}</option>
                            ))}
                          </Input>
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <Button
                    color="success"
                    disabled={
                      (!orderNum &&
                        !secondaryMarketOrderNum &&
                        !secondaryMarketLocation) ||
                      (secondaryMarketOrderNum && !secondaryMarketLocation) ||
                      (!secondaryMarketOrderNum && secondaryMarketLocation)
                    }
                    onClick={() => {
                      doneBuyingRequest({
                        listingId,
                        orderNum,
                        secondaryMarketOrderNum,
                        secondaryMarketLocation,
                        purchaseRow,
                        purchaseSection,
                        isPurchaseSecRow
                        // emailOption: emailOption || email,
                        // problemNotes
                      })
                      resetPurchasedTicketInfo()
                      setShowRowSec(false)
                      setIsPurchaseSecRow(false)
                      setPurchaseRow("")
                      setPurchaseSection("")
                    }}
                  >
                    {"I'm done purchasing!"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Row className=" container-fluid justify-content-center align-items-center">
              <Button
                color="secondary"
                onClick={() => {
                  resetPurchasedTicketInfo()
                }}
              >
                {"Done"}
              </Button>
            </Row>
          )}
        </Modal.Footer>
        {isResetPasswordFetching ? (
          <div className="overlay-buyTicket">
            <div className="row">
              <div className="col-sm-12">
                <Spinner spinnerTime={spinnerTime} />
              </div>
              <div
                className="col-sm-12"
                style={{ color: "black", textAlign: "center" }}
              >
                <b>Please Wait Resetting Your Password...</b>
              </div>
            </div>
          </div>
        ) : (
          <div>{""}</div>
        )}
      </Modal>

      <Modal
        show={modal}
        className={"modal-info"}
        centered
        // style={{ maxWidth: "70%", fontSize: "20px" }}
      >
        <Modal.Header>
          <h4 className="modal-title">Select Simulate Sold Listing</h4>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="number"
              name="soldquantity"
              value={soldQuantity}
              placeholder="Sold Quantity"
              onChange={evt => setSoldQuantity(evt.target.value)}
            />
          </Form.Group>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={trackedListings}
                version="4"
                striped
                hover
                pagination
                options={modalOptions}
                deleteRow
                selectRow={selectRow}
              >
                <TableHeaderColumn dataField="skyBoxInventoryId" isKey>
                  skyBoxInventoryId
                </TableHeaderColumn>
                <TableHeaderColumn dataField="unitCost">
                  unitCost
                </TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">
                  quantity
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Row className=" container-fluid justify-content-center align-items-center">
            <Button
              color="secondary"
              onClick={() => {
                setModal(false)
              }}
            >
              {"Close"}
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>

      <div className="full_width">
        <div className="page_name">
          <div className="row">
            <div className="col-sm-7">
              <h2>Dashboard</h2>
            </div>
            <div className="col-sm-5">
              <div className="dashSearch search_btn">
                <Form.Control
                  type="text"
                  value={eventKey}
                  placeholder="Search Event Name"
                  onChange={evt => setEventKey(evt.target.value)}
                  onKeyPress={evt => {
                    if (evt.key == "Enter" && eventKey != "") {
                      history.push({
                        pathname: `/managedEvents/${eventKey}`
                      })
                    }
                  }}
                />
                <Button
                  color="primary"
                  className="btn-pill"
                  disabled={eventKey == ""}
                  onClick={() => {
                    history.push({
                      pathname: `/managedEvents/${eventKey}`
                    })
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="inner_main dash_inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main">
                      <div className="inner_tbl overflo_scroll_cls">
                        {getCurrentWorkingEmployee(clockTimerList).map(item => {
                          return item
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={
                  userInfo.role.toLowerCase() === "manager"
                    ? "col-sm-8"
                    : "col-sm-8"
                }
                style={{
                  display: userInfo.role.toLowerCase() === "buyer" ? "none" : ""
                }}
              >
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Order Processing WorkFlow</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main flow_table">
                      <div className="inner_tbl">
                        <OrderFlowDataTable
                          data={
                            orderFlowListings.sortedOverFlowListings ||
                            Object.values(orderFlowListings.dict)
                          }
                          //  data={Object.values(orderFlowListings.dict)}
                          fetchPDFAttachmentRequest={fetchPDFAttachmentRequest}
                          pdfAttachment={pdfAttachment}
                          sendEmailRequest={sendEmailRequest}
                          globals={globals}
                          ticketPurchasedRequest={ticketPurchasedRequest}
                          cloakListings={cloakListings}
                          fetchCloakListingRequest={fetchCloakListingRequest}
                          manualTransferRequest={manualTransferRequest}
                          isFetching={isFetching}
                          fetchPDFDownlaodedRequest={fetchPDFDownlaodedRequest}
                          deleteOpenListingsRequest={deleteOpenListingsRequest}
                          pdfDownloaded={pdfDownloaded}
                          saveSelectEvent={saveSelectEvent}
                          appReceiveAlert={appReceiveAlert}
                          updateEventTmOrderNumber={updateEventTmOrderNumber}
                          fetchOrderfullfillmentRequest={
                            fetchOrderfullfillmentRequest
                          }
                          fullfillOrder={fullfillOrder}
                          fetchEvenuePDFRequest={fetchEvenuePDFRequest}
                          evenuePDf={evenuePDf}
                          isResetPasswordFetching={isResetPasswordFetching}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {userInfo.role.toLowerCase() === "manager" ? (
                ""
              ) : (
                <div
                  className="col-sm-4"
                  style={{
                    display:
                      userInfo.role.toLowerCase() === "buyer" ? "none" : ""
                  }}
                >
                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl">
                      <h2>Statistics</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <Statistics
                        ordersCostCount={openSaleslistings.ordersCostCount}
                        fetchSoldStatisticsRequest={fetchSoldStatisticsRequest}
                        soldStatisticsLog={soldStatisticsLog}
                        isFetching={isFetching}
                      />
                    </div>
                  </div>
                </div>
              )}

              {userInfo.role.toLowerCase() === "buyer" ||
              userInfo.role.toLowerCase() === "manager" ? (
                <div
                  className={"col-sm-12"}
                  className={
                    userInfo.role.toLowerCase() === "buyer"
                      ? "col-sm-12"
                      : "col-sm-4"
                  }
                >
                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl">
                      <h2>Timer</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <ClockTimer
                        fetchClockTimerRequest={fetchClockTimerRequest}
                        clockTimerList={clockTimerList}
                        createTimerRequest={createTimerRequest}
                        userInfo={userInfo}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="col-sm-12">
                <div className="fl_w">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Open Orders</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <ListingsDataTable
                                data={
                                  openSaleslistings.sortedOtherListings ||
                                  Object.values(openSaleslistings.dict)
                                }
                                type={TYPE_SALE_LISTING}
                                ticketPurchasedRequest={ticketPurchasedRequest}
                                isFetching={isFetching}
                                saveSelectEvent={saveSelectEvent}
                                updateEventTmOrderNumber={
                                  updateEventTmOrderNumber
                                }
                                actions={() => {
                                  return (
                                    <TableHeaderColumn
                                      width="10%"
                                      dataField="button"
                                      dataAlign="center"
                                      expandable={false}
                                      dataFormat={(cell, row) => {
                                        return (
                                          <div className="tbl_btn dash_btn">
                                            {!row.currentlyTryingToBuy && (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>Buy Ticket</Tooltip>
                                                }
                                              >
                                                <Button
                                                  className="icon_btn"
                                                  active
                                                  color="primary"
                                                  aria-pressed="true"
                                                  onClick={() => {
                                                    setErrorMessage("")
                                                    tryBuyAgainRequest(row)
                                                  }}
                                                >
                                                  <i
                                                    className="fa fa-ticket"
                                                    aria-hidden="true"
                                                  ></i>
                                                </Button>
                                              </OverlayTrigger>
                                            )}{" "}
                                            <OverlayTrigger
                                              placement="left"
                                              overlay={
                                                <Tooltip>Buyer Summary</Tooltip>
                                              }
                                            >
                                              <Button
                                                className="icon_btn"
                                                active
                                                color="primary"
                                                aria-pressed="true"
                                                onClick={() => {
                                                  fetchUserSummaryRequest(
                                                    row.eventId
                                                  )
                                                }}
                                              >
                                                <i
                                                  className="fa fa-shopping-basket"
                                                  aria-hidden="true"
                                                ></i>
                                              </Button>
                                            </OverlayTrigger>
                                            {row.eventPostponed ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Event PostPonded
                                                  </Tooltip>
                                                }
                                              >
                                                <i
                                                  className="fa fa-warning"
                                                  aria-hidden="true"
                                                  style={{ color: "yellow" }}
                                                ></i>
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.marketType &&
                                            row.marketType
                                              .toLowerCase()
                                              .includes("evenue") ? (
                                              <>
                                                <OverlayTrigger
                                                  placement="left"
                                                  overlay={
                                                    <Tooltip>
                                                      EVenue Event
                                                    </Tooltip>
                                                  }
                                                >
                                                  <div className="evenueIcon">
                                                    <i
                                                      class="fa fa-venus-mars"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </div>
                                                </OverlayTrigger>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("seatgeek") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Seatgeek Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/seetgreek.png")}
                                                  alt="Seatgeek Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .replace(/ /g, "")
                                              .toLowerCase()
                                              .includes("vividseats") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    VividSeats Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/vividSeat.png")}
                                                  alt="VividSeat Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("tickpick") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Tickpick Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/tickpick.png")}
                                                  alt="Tickpick Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("mytickettracker") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    TicketTracker Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/ticketTracker.png")}
                                                  alt="TicketTracker Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("ticketnetwork") ||
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("ticket network") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    TicketNetWork Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/ticketNetwork.png")}
                                                  alt="TicketNetWork Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("gametime") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    GameTime Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/gametime.png")}
                                                  alt="GameTime Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("viagogo") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Viagogo Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/viagogo.png")}
                                                  alt="viagogo Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName
                                              .toLowerCase()
                                              .includes("stubhub") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Stubhub Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/stubhub.png")}
                                                  alt="Stubhub Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )
                                      }}
                                    >
                                      Actions
                                    </TableHeaderColumn>
                                  )
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Problematic Open Orders</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <RedListingsDataTable
                                data={
                                  openSaleslistings.sortedRedListings ||
                                  Object.values(openSaleslistings.dict)
                                }
                                type={TYPE_SALE_LISTING}
                                ticketPurchasedRequest={ticketPurchasedRequest}
                                isFetching={isFetching}
                                saveSelectEvent={saveSelectEvent}
                                updateEventTmOrderNumber={
                                  updateEventTmOrderNumber
                                }
                                actions={() => {
                                  return (
                                    <TableHeaderColumn
                                      width="10%"
                                      dataField="button"
                                      dataAlign="center"
                                      expandable={false}
                                      dataFormat={(cell, row) => {
                                        return (
                                          <div className="tbl_btn dash_btn">
                                            {!row.currentlyTryingToBuy && (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>Buy Ticket</Tooltip>
                                                }
                                              >
                                                <Button
                                                  className="icon_btn"
                                                  active
                                                  color="primary"
                                                  aria-pressed="true"
                                                  onClick={() => {
                                                    setErrorMessage("")
                                                    tryBuyAgainRequest(row)
                                                  }}
                                                >
                                                  <i
                                                    className="fa fa-ticket"
                                                    aria-hidden="true"
                                                  ></i>
                                                </Button>
                                              </OverlayTrigger>
                                            )}{" "}
                                            <OverlayTrigger
                                              placement="left"
                                              overlay={
                                                <Tooltip>Buyer Summary</Tooltip>
                                              }
                                            >
                                              <Button
                                                className="icon_btn"
                                                active
                                                color="primary"
                                                aria-pressed="true"
                                                onClick={() => {
                                                  fetchUserSummaryRequest(
                                                    row.eventId
                                                  )
                                                }}
                                              >
                                                <i
                                                  className="fa fa-shopping-basket"
                                                  aria-hidden="true"
                                                ></i>
                                              </Button>
                                            </OverlayTrigger>
                                            {row.eventPostponed ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Event PostPonded
                                                  </Tooltip>
                                                }
                                              >
                                                <i
                                                  className="fa fa-warning"
                                                  aria-hidden="true"
                                                  style={{ color: "yellow" }}
                                                ></i>
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.marketType &&
                                            row.marketType
                                              .toLowerCase()
                                              .includes("evenue") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    EVenue Event
                                                  </Tooltip>
                                                }
                                              >
                                                <div className="evenueIcon">
                                                  <i
                                                    className="fa fa-venus-mars"
                                                    aria-hidden="true"
                                                  ></i>
                                                </div>
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("seatgeek") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Seatgeek Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/seetgreek.png")}
                                                  alt="Seatgeek Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .replace(/ /g, "")
                                              .toLowerCase()
                                              .includes("vividseats") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    VividSeats Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/vividSeat.png")}
                                                  alt="VividSeat Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("tickpick") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Tickpick Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/tickpick.png")}
                                                  alt="Tickpick Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("mytickettracker") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    TicketTracker Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/ticketTracker.png")}
                                                  alt="TicketTracker Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .replace(/ /g, "")
                                              .toLowerCase()
                                              .includes("ticketnetwork") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    TicketNetWork Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/ticketNetwork.png")}
                                                  alt="TicketNetWork Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("gametime") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    GameTime Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/gametime.png")}
                                                  alt="GameTime Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("viagogo") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Viagogo Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/viagogo.png")}
                                                  alt="viagogo Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                            {row.customerDisplayName &&
                                            row.customerDisplayName
                                              .toLowerCase()
                                              .includes("stubhub") ? (
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Stubhub Event
                                                  </Tooltip>
                                                }
                                              >
                                                <img
                                                  className="marketImg"
                                                  src={require("./../../assets/img/stubhub.png")}
                                                  alt="Stubhub Event"
                                                />
                                              </OverlayTrigger>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )
                                      }}
                                    >
                                      Actions
                                    </TableHeaderColumn>
                                  )
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="white_box mrgbtm50">
                  <div className="cm_ttl dis_inline">
                    <h2>Open Transfers Listings</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main tranfer_lst_tbl_main">
                      <div className="inner_tbl">
                        <ListingsDataTable
                          data={Object.values(openTransferslistings.dict)}
                          type={TYPE_TRANSFER_LISTING}
                          title="Open Transfers Listings"
                          deleteOpenListingsRequest={deleteOpenListingsRequest}
                          isFetching={isFetching}
                          actions={() => {
                            return (
                              <TableHeaderColumn
                                dataField="button"
                                dataAlign="center"
                                expandable={false}
                                width="20%"
                                dataFormat={(cell, { listingId }) => {
                                  return (
                                    <Row className="justify-content-center align-items-center">
                                      <Col className="col-4">
                                        <div className="tbl_btn dash_btn">
                                          <OverlayTrigger
                                            placement="left"
                                            overlay={
                                              <Tooltip>
                                                Manual PO Transder
                                              </Tooltip>
                                            }
                                          >
                                            <Button
                                              className="icon_btn"
                                              active
                                              color="primary"
                                              aria-pressed="true"
                                              onClick={evt => {
                                                setShowPdfTransfer(true)
                                                setPurchasedKey(listingId)
                                              }}
                                            >
                                              <i
                                                className="fa fa-file-pdf-o"
                                                aria-hidden="true"
                                              ></i>
                                            </Button>
                                          </OverlayTrigger>
                                        </div>
                                      </Col>
                                    </Row>
                                  )
                                }}
                              >
                                Actions
                              </TableHeaderColumn>
                            )
                          }}
                        />
                      </div>

                      {showPdfTransfer ? (
                        <ManualPdfTransfer
                          cloakListings={cloakListings}
                          manualTransferRequest={manualTransferRequest}
                          purchasedKey={purchasedKey}
                          isPdfOpen={isPdfTransferOpen =>
                            setShowPdfTransfer(isPdfTransferOpen)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="white_box mrgbtm50">
                  <div className="cm_ttl dis_inline">
                    <h2>Upcoming Open Orders</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main">
                      <div className="inner_tbl">
                        <OrdersDataTable
                          data={Object.values(upcomingOpenOrders.dict)}
                        />
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

export default withRouter(Dashboard)
