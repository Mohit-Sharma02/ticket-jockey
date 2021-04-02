import React, { useState, useRef } from "react"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import Spinner from "../../components/Spinner"
import Stepper from "react-stepper-horizontal"
import { Button, Modal, OverlayTrigger, Tooltip, Form } from "react-bootstrap"
import { STEP2_INFO, STEP3_INFO } from "../../constants"
import { dateSortFuncForEvent } from "../../utils"
import JSZip from "jszip"
import TicketPurchased from "./ticketPurchased"
import ManualPdfTransfer from "./ManuaPDFTransfer"
import scrollToComponent from "react-scroll-to-component"
import { withRouter } from "react-router-dom"
import { ALERT_MSG_ERROR } from "../../constants"
import { confirmAlert } from "react-confirm-alert"

const OrderFlowDataTable = ({
  data,
  fetchPDFAttachmentRequest,
  //pdfAttachment,
  sendEmailRequest,
  globals,
  ticketPurchasedRequest,
  cloakListings,
  fetchCloakListingRequest,
  manualTransferRequest,
  isFetching,
  fetchPDFDownlaodedRequest,
  fetchOrderfullfillmentRequest,
  fullfillOrder,
  deleteOpenListingsRequest,
  // pdfDownloaded,
  history,
  saveSelectEvent,
  appReceiveAlert,
  updateEventTmOrderNumber,
  evenuePDf,
  fetchEvenuePDFRequest,
  isResetPasswordFetching
}) => {
  const isNotEmpty = Array.isArray(data)
    ? data.length
    : Object.keys(data).length
  const [stepModal, setStepModal] = useState(false)
  const [emailModal, setEmailModal] = useState(false)
  const [evenuePdf, setEvenuePdfModal] = useState(false)
  const [modalBody, setModalBody] = useState("")
  const [modalBodyForPDF, setModalBodyForPDF] = useState("")
  const [modalFooter, setModalFooter] = useState("")
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [emailBody, setemailBody] = useState("")
  // const [dynamicClassName, setDynamicClassName] = useState("")
  const [showTicketPurchased, setShowTicketPurchased] = useState(false)
  const [showManualPdfTransfer, setShowManualPdfTransfer] = useState(false)
  const [purchasedKey, setPurchasedKey] = useState("")
  const [defaultSort, setdefaultSort] = useState("eventDetails")
  const [defaultOrder, setdefaultOrder] = useState("desc")
  //Variable used  For Sorting and Filter
  const [checked, setChecked] = useState(true)
  const refTimeToBuy = useRef(null)
  const refTicketTobuy = useRef(null)
  const refEventSort = useRef(null)
  const refStep1 = useRef(null)
  const refStep2 = useRef(null)
  const refStep3 = useRef(null)
  const refStep4 = useRef(null)
  let refScroll = useRef(null)
  const [pdfUrlList, setPdfUrlList] = useState([])
  const [tmOrderNumber, setTmOrderNumber] = useState(false)
  const [OrderNotes, setOrderNotes] = useState(false)
  const [tmOrderEventId, setTmOrderEventId] = useState("")
  const [evenueDetails, setEvenueDetails] = useState("")
  const [spinnerTime, setSpinnerTime] = useState(false)
  const [orderNum, setOrderNumber] = useState("")
  //
  const noDataHandler = () => {
    if (isFetching) return <Spinner />
    else return "No Data Found To Display"
  }

  const onPageChange = () => {
    scrollToComponent(refScroll, { offset: 0, align: "top" })
  }
  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 5, // which size per page you want to locate as default
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
    expandBy: "column",
    //defaultSortName: defaultSort,
    //defaultSortOrder: defaultOrder,
    noDataText: noDataHandler(),
    onPageChange: onPageChange
  }

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.invoiceIdUrl} target="_blank">
        {row.invoiceId}
      </a>
    )
  }

  const stepBar = (cell, row) => {
    var activeStep = 0
    // var showMailBtn = false
    // var showQrCode = false
    //  setPurchasedKey(row.listingId)
    // if (row.isPDFDownloaded) setShowMailBtn(true)
    // else setShowMailBtn(false)
    if (row.readyToBuy) activeStep = 0
    if (row.purchaseSuccessStatus) activeStep = 1
    if (row.pdfTransferred) activeStep = 2

    // if (row.pdfAttached) activeStep = 3
    //if (row.fulfillmentCompleted) activeStep = 4
    if (row.fulfillmentCompleted) activeStep = 3
    return (
      <div className="row">
        <div
          className={
            (row.isPDFDownloaded && !row.fulfillmentCompleted) ||
            row.pdfButtonStatus ||
            ((row.purchaseSuccessStatus || row.pdfTransferred) &&
              row.marketType &&
              row.marketType.toLowerCase().includes("evenue") &&
              !row.fulfillmentCompleted)
              ? "col-10"
              : "col-12"
          }
        >
          <Stepper
            size={32}
            titleFontSize={12}
            circleTop={1}
            steps={[
              {
                title: "Time To Buy"
              },
              {
                title: "Ticket Purchased",
                onClick: e => {
                  e.preventDefault()
                  if (activeStep >= 1) {
                    setModalFooter("")
                    setModalBodyForPDF("")
                    setShowTicketPurchased(false)
                  } else {
                    setModalFooter(modalFooterButton(row))
                    setModalBodyForPDF("")
                    setShowTicketPurchased(false)
                    setShowManualPdfTransfer(false)
                  }

                  setPurchasedKey(row.listingId)
                  setModalBody(STEP2_INFO)
                  setStepModal(true)
                }
              },
              {
                title: "PO Attached To Invoice",
                onClick: e => {
                  e.preventDefault()

                  if (activeStep >= 2) {
                    setModalFooter("")
                    setModalBodyForPDF("")
                    setShowManualPdfTransfer(false)
                  } else {
                    setModalBodyForPDF()
                    setModalFooter(modalFooterForPDF(row))
                    setShowTicketPurchased(false)
                    setShowManualPdfTransfer(false)
                    fetchCloakListingRequest(row.skyBoxEventId)
                  }
                  setPurchasedKey(row.listingId)
                  setModalBody(STEP3_INFO)
                  setStepModal(true)
                }
              },
              {
                title: "Order Fullfiled"
              }
            ]}
            activeStep={activeStep}
            enabledSteps={[2]}
          />
        </div>
        <div className="col-2">
          <div className="tbl_btn">
            {row.isPDFDownloaded && !row.fulfillmentCompleted ? (
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip>Send Email</Tooltip>}
              >
                <Button
                  active
                  color="primary"
                  aria-pressed="true"
                  onClick={() => {
                    fetchPDFAttachmentRequest(row.invoiceId)
                    EmailDetails(row)
                  }}
                >
                  <img src={require("./../../assets/img/detail-icon.png")} />{" "}
                </Button>
              </OverlayTrigger>
            ) : (
              ""
            )}
            {row.pdfButtonStatus ? (
              <>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>DownLoad PDF</Tooltip>}
                >
                  <Button
                    active
                    color="primary"
                    aria-pressed="true"
                    onClick={() => {
                      var listingId =
                        row.listingId !== undefined ? row.listingId : ""
                      var orderNum =
                        row.orderNum !== undefined
                          ? row.orderNum.split("/")[0] !== undefined
                            ? row.orderNum.split("/")[0]
                            : ""
                          : ""
                      row.listingId = listingId
                      row.orderNum = orderNum
                      if (row.orderNum === "") {
                        appReceiveAlert({
                          type: ALERT_MSG_ERROR,
                          message: "No TM order number, cannot download PDF"
                        })
                        return false
                      } else {
                        fetchPDFDownlaodedRequest(row)
                      }
                    }}
                  >
                    <img src={require("./../../assets/img/qr-code.png")} />{" "}
                  </Button>
                </OverlayTrigger>
              </>
            ) : (
              ""
            )}

            {row.pdfTransferred && !row.fulfillmentCompleted ? (
              <>
                <OverlayTrigger
                  placement="left"
                  overlay={<Tooltip>Fulfill order</Tooltip>}
                >
                  <Button
                    active
                    color="primary"
                    aria-pressed="true"
                    onClick={() => {
                      console.log("row", row)
                      if (
                        row.customerDisplayName === "" ||
                        row.customerDisplayName === null ||
                        row.customerDisplayName === undefined ||
                        row.externalReference === "" ||
                        row.externalReference === null ||
                        row.externalReference === undefined
                      ) {
                        appReceiveAlert({
                          type: ALERT_MSG_ERROR,
                          message:
                            "Customer Name or External Reference is not available , order cannot fullfill"
                        })
                        return false
                      } else {
                        fetchOrderfullfillmentRequest(row)
                      }
                    }}
                  >
                    <img src={require("./../../assets/img/fullfillment.png")} />{" "}
                  </Button>
                </OverlayTrigger>
              </>
            ) : (
              ""
            )}

            {row.isPrintDateAvailable &&
            new Date(row.pdfPrintDate) > new Date() ? (
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip>Print Delay</Tooltip>}
              >
                <Button active color="primary" aria-pressed="true">
                  <img src={require("./../../assets/img/printDelay.png")} />{" "}
                </Button>
              </OverlayTrigger>
            ) : (
              ""
            )}

            {(row.purchaseSuccessStatus || row.pdfTransferred) &&
            row.marketType &&
            row.marketType.toLowerCase().includes("evenue") &&
            !row.fulfillmentCompleted ? (
              <OverlayTrigger
                placement="left"
                overlay={<Tooltip>Download EVenue PDF</Tooltip>}
              >
                <Button
                  active
                  color="primary"
                  aria-pressed="true"
                  onClick={() => {
                    // setOrderNumber("GSNQCNQC20OSC0813:1606425001427q3dih7wmtlc")
                    setOrderNumber(row.listingId)
                    fetchEvenuePDFRequest(row.listingId)
                    eVenueDetails(row)
                  }}
                >
                  <img src={require("./../../assets/img/evenue-pdf.png")} />{" "}
                </Button>
              </OverlayTrigger>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
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
        <span>
          <b>Seat:</b> {row.seat}
        </span>
        <br />
        <span>
          <b>Qty:</b> {row.quantitySold}
        </span>
        <br />
        <span>
          <b>Base Cost: </b>
          {row.baseCost
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(row.baseCost)
            : ""}
        </span>
        <br />
        <span>
          <b> Final Cost: </b>
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

  const modalFooterButton = row => {
    return (
      <Button
        className="btn-pill"
        style={{ background: "black" }}
        onClick={evt => {
          setShowTicketPurchased(true)
        }}
      >
        Ticket Purchased
      </Button>
    )
  }
  const modalFooterForPDF = row => {
    return (
      <div>
        <Button
          style={{ background: "black" }}
          onClick={evt => {
            setStepModal(false)
            setShowManualPdfTransfer(true)
          }}
        >
          Manual PO Transfer
        </Button>
        <Button
          style={{ background: "black" }}
          onClick={evt => {
            setStepModal(false)
            confirmAlert({
              title: "Warning",
              message: (
                <span>
                  Are you sure you want to delete these email Information?
                </span>
              ),
              closeOnClickOutside: false,
              buttons: [
                {
                  label: "Cancel",
                  onClick: () => {
                    setStepModal(true)
                  }
                },
                {
                  label: "Confirm",
                  onClick: () => {
                    setStepModal(true)
                    deleteOpenListingsRequest([row.listingId])
                  }
                }
              ]
            })
          }}
        >
          Complete order
        </Button>
      </div>
    )
  }

  // const onFileChange = e => {
  //   let selectedFile = e.target.files
  //   var zip = new JSZip()

  //   var fileZip = zip.folder("PDF")
  //   for (var i = 0; i < selectedFile.length; i++) {
  //     fileZip.file(i, selectedFile[i])
  //   }
  //   zip.generateAsync({ type: "base64" }).then(function(base64) {
  //     filedata = base64
  //   })
  // }

  const isExpandRow = () => {
    return true
  }

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>External Ref: </label>{" "}
          <span className="row_val"> {`${row.externalReference || ""}`} </span>
        </div>
        {row.orderNum || (!row.orderNum && !row.secondaryMarketOrderNum) ? (
          <div className="expand_row_inner">
            <label>TM Order Number </label> {/* <div> */}
            {tmOrderNumber && tmOrderEventId === row.eventId ? (
              <>
                <Form.Control
                  type="text"
                  className="orderFlowDetails_form_control"
                  id={row.eventId}
                  defaultValue={`${row.orderNum || ""}`}
                  onChange={evt => {
                    row.orderNum = evt.target.value
                  }}
                />
                <Button
                  className="orderFlowDetails_tm_btn"
                  variant="primary"
                  id={row.eventId}
                  onClick={() => {
                    var tm_order_Number = row.orderNum
                    var listingId =
                      row.listingId !== undefined ? row.listingId : ""
                    if (tm_order_Number !== "") {
                      updateEventTmOrderNumber({
                        listingId: listingId,
                        orderNum: tm_order_Number
                      })
                      setTmOrderNumber(false)
                    } else {
                      appReceiveAlert({
                        type: ALERT_MSG_ERROR,
                        message: "Please enter Tm Order Number"
                      })
                    }
                  }}
                >
                  Update Order Number
                </Button>
              </>
            ) : (
              <span
                className="row_val"
                onClick={() => {
                  setTmOrderNumber(true)
                  setTmOrderEventId(row.eventId)
                }}
                style={{ cursor: "pointer", display: "block" }}
              >
                {row.orderNum ? `${row.orderNum}` : <>&nbsp;</>}
              </span>
            )}
          </div>
        ) : (
          <div>
            <div className="expand_row_inner">
              <label>Secondary Market Order Number </label>{" "}
              <span className="row_val">
                {" "}
                {`${row.secondaryMarketOrderNum || ""}`}{" "}
              </span>
            </div>
            <div className="expand_row_inner">
              <label>Secondary market purchase location </label>{" "}
              <span className="row_val">
                {" "}
                {`${row.secondaryMarketLocation || ""}`}{" "}
              </span>
            </div>
          </div>
        )}

        <div className="expand_row_inner">
          <label>Sales Time </label>{" "}
          <span className="row_val"> {`${row.saleTime || ""}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Event Id: </label>{" "}
          <a
            href={row.eventUrl !== "" ? row.eventUrl : row.ticketMasterUrl}
            target="_blank"
          >
            {row.eventId}
          </a>{" "}
          {/* <Form.Group className="text-center"> */}
          <Button
            className="orderFlowDetails_btn"
            variant="primary"
            onClick={() => {
              saveSelectEvent(row)
              history.push({
                pathname: `/event/${row.eventId}`,
                state: { from: "OrderStatus" }
              })
            }}
          >
            View Event Details
          </Button>
        </div>
        {row.isPrintDateAvailable ? (
          <div className="expand_row_inner">
            <label>PDF Print Date </label>{" "}
            <span className="row_val"> {`${row.pdfPrintDate || ""}`} </span>
          </div>
        ) : (
          ""
        )}

        <div className="expand_row_inner">
          <label>Order Notes </label> {/* <div> */}
          {OrderNotes && tmOrderEventId === row.eventId ? (
            <>
              <Form.Control
                type="text"
                className="orderFlowDetails_form_control"
                id={row.eventId}
                defaultValue={`${row.orderNotes || ""}`}
                onChange={evt => {
                  row.orderNotes = evt.target.value
                }}
              />
              <Button
                className="orderFlowDetails_tm_btn"
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

  const EmailDetails = row => {
    var exRef = `${row.externalReference || ""}`

    var costomer_Name = `${row.customerDisplayName || ""}`
    var customerid = `${row.customerId || ""}`
    var emailAddress = ""

    var globalConfigs = globals.find(
      global => global.keyName == "customerEmailIds"
    )

    emailAddress = globalConfigs.value[customerid]

    setTo(emailAddress)
    setSubject("Order # " + exRef + " PDF Attached")
    setemailBody(
      "Hi " +
        costomer_Name +
        ", \n\n Please see tickets attached for order # " +
        exRef +
        " and deliver to customer. \n\n\n Thank you! \n Ticket Jockey"
    )
    setPdfUrlList(row.pdfUrls)
    setEmailModal(true)
  }

  const eVenueDetails = row => {
    setEvenueDetails(row)
    setEvenuePdfModal(true)
  }

  // for Sorting
  const handleInputChange = e => {
    var field = e.split("-").slice(0)[0]
    var order = e.split("-").slice(1)[0]
    refEventSort.current.handleSort(order, field)
  }

  //

  const handleRemoveClick = index => {
    const list = [...pdfUrlList]
    list.splice(index, 1)
    setPdfUrlList(list)
  }

  // for filter

  const orderDetailsFilter = tag => {
    refTimeToBuy.current.applyFilter("")
    refTicketTobuy.current.applyFilter("")
    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: "0",
        comparator: "="
      })
    }

    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: ">="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: ">="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 4,
        comparator: "="
      })
    }

    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 1,
        comparator: "="
      })
    }

    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: "="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 4,
        comparator: "="
      })
    }

    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 5,
        comparator: "<="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "<="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: "<="
      })
    }

    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 4,
        comparator: "<="
      })
    }

    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: ">="
      })
      refTicketTobuy.current.applyFilter({
        number: 8,
        comparator: "<="
      })
    }
    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 1,
        comparator: "!="
      })
      refTicketTobuy.current.applyFilter({
        number: 8,
        comparator: "!="
      })
    }

    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "="
      })
    }

    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: ">="
      })
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: ">="
      })
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<="
      })
    }

    if (
      !refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: ">="
      })
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<"
      })
    }
    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<="
      })
      refTimeToBuy.current.applyFilter({
        number: 1,
        comparator: "<="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<="
      })
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "<="
      })
    }

    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "<"
      })
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: "<="
      })
    }
    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 3,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 4,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 5,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      refStep2.current.checked &&
      !refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "<="
      })
    }
    if (
      !refStep1.current.checked &&
      refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "!="
      })

      refTimeToBuy.current.applyFilter({
        number: 1,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "!="
      })

      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "!="
      })
    }
    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      refStep3.current.checked &&
      !refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 10,
        comparator: "!="
      })
      refTicketTobuy.current.applyFilter({
        number: 9,
        comparator: "!="
      })
      refTimeToBuy.current.applyFilter({
        number: 4,
        comparator: "!="
      })
      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "!="
      })
    }

    if (
      refStep1.current.checked &&
      !refStep2.current.checked &&
      !refStep3.current.checked &&
      refStep4.current.checked
    ) {
      refTicketTobuy.current.applyFilter({
        number: 8,
        comparator: "!="
      })

      refTimeToBuy.current.applyFilter({
        number: 2,
        comparator: "!="
      })
    }
  }

  const trClassName = row => {
    if (row.isDownloadPDFeVenue !== "") {
      if (row.isDownloadPDFeVenue === true) {
        return "green-evenue-bg-cl"
      } else {
        return "red-evenue-bg-cl"
      }
    } else {
      return ""
    }
  }
  return (
    <div className="animated">
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
              <b>Please Wait downloading PDF...</b>
            </div>
          </div>
        </div>
      ) : (
        <Modal
          className={"dash-popup"}
          centered
          size="lg"
          show={evenuePdf}
          onHide={() => {
            setEvenuePdfModal(false)
          }}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header className="info_Box" closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              EVenue Ticket Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form-Group>
                <label>Event Name:</label>{" "}
                <span>{evenueDetails.eventName}</span>
              </Form-Group>

              <Form-Group>
                <label>Event Date:</label>
                <span> {evenueDetails.eventDate}</span>
              </Form-Group>
              <Form-Group>
                <label>Event Address:</label>
                <span> {evenueDetails.eventAddress}</span>
              </Form-Group>
              <Form-Group>
                <div className="fl_w">
                  <label>Section:</label>
                  <span>{evenueDetails.section}</span>
                </div>
                <div className="fl_w">
                  <label>Row: </label>
                  <span>{evenueDetails.row}</span>
                </div>
              </Form-Group>
              <Form-Group>
                <label>Quantity:</label>
                <span> {evenueDetails.quantitySold}</span>
              </Form-Group>
              <Form-Group>
                <label>Base Cost:</label>
                <span>
                  {" "}
                  {evenueDetails.baseCost
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(evenueDetails.baseCost)
                    : ""}
                </span>
              </Form-Group>
              <Form-Group>
                <label>Final Cost:</label>
                <span>
                  {" "}
                  {evenueDetails.unitCost
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD"
                      }).format(evenueDetails.unitCost)
                    : ""}
                </span>
              </Form-Group>
              <Form-Group>
                <label>EVenue PDF Link:</label>
                {evenuePDf !== undefined ? (
                  !evenuePDf.success ? (
                    <div className="row">
                      <div className="col-10">
                        <span style={{ color: "red", width: "100%" }}>
                          {evenuePDf.message}
                        </span>
                      </div>
                      <div className="col-2 copy-link_btn">
                        <div style={{ float: "right" }}>
                          <div className="tbl_btn">
                            <OverlayTrigger
                              placement="left"
                              overlay={<Tooltip>Please Try Again</Tooltip>}
                            >
                              <Button
                                className="icon_btn"
                                active
                                color="primary"
                                aria-pressed="true"
                                onClick={() => {
                                  fetchEvenuePDFRequest(orderNum)
                                }}
                              >
                                <img
                                  src={require("./../../assets/img/refresh.png")}
                                  alt="try again Link"
                                />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      {evenuePDf.PDFticketUrls !== undefined
                        ? evenuePDf.PDFticketUrls.map(item => (
                            <div className="col-10">
                              <a href={item} target="_blank" download>
                                Ticket_{item.split("/")[5]}
                              </a>
                            </div>
                          ))
                        : ""}
                    </div>
                  )
                ) : (
                  ""
                )}
              </Form-Group>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}

      <Modal
        size="md"
        centered
        show={stepModal}
        onHide={() => {
          setStepModal(false)
          setModalBody("")
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="info_Box" closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Step Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="info_Body">
          {modalBody}
          {modalBodyForPDF}
        </Modal.Body>
        <Modal.Footer>{modalFooter}</Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        centered
        show={emailModal}
        onHide={() => {
          setEmailModal(false)
          setModalBody("")
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header className="info_Box" closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Email Template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="info_Body">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email To</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="Email_txt"
                value={to}
                onChange={evt => setTo(evt.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                className="Email_txt"
                value={subject}
                onChange={evt => setSubject(evt.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="ControlTextarea1">
              <Form.Label>Email Body</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                value={emailBody}
                className="Email_txt"
                onChange={evt => setemailBody(evt.target.value)}
              />
            </Form.Group>
            <div className="row">
              <div className="col-2">
                <Form.Group controlId="ControlTextarea1">
                  <Form.Label>Attachment: </Form.Label>
                </Form.Group>
              </div>
              <div className="col-2">
                {pdfUrlList.map((item, i) => (
                  <div className="row">
                    <div className="col-8">
                      <a href={item.pdfUrl} target="_blank" download>
                        Ticket_{item.seatNumber}.pdf{" "}
                      </a>
                    </div>
                    <div className="col-4">
                      <a
                        className="cs_icon rem_cs_icon"
                        onClick={() => handleRemoveClick(i)}
                      >
                        <div class="red_txt">
                          <i class="fa fa-times"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
                {/* {pdfAttachment != null ? (
                  <div>
                    <a href={`data:application/zip;base64,${pdfAttachment}`}>
                      Pdf_Attachment.zip
                    </a>
                  </div>
                ) : (
                  <Form.Group controlId="ControlTextarea1">
                    <div className="image-upload">
                      <label htmlFor="file-input"></label>
                      <input
                        id="file-input"
                        accept=".pdf"
                        type="file"
                        onChange={onFileChange}
                        multiple
                      />
                    </div>
                  </Form.Group>
                )} */}
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                // var attachment = null
                var attachment = pdfUrlList != undefined ? pdfUrlList : null
                // if (filedata === "") attachment = pdfAttachment
                // else attachment = filedata

                sendEmailRequest({
                  to,
                  subject,
                  body: emailBody.replace("\n", " "),
                  attachment
                  // pdfUrlList
                })
                setEmailModal(false)
              }}
            >
              Send Email
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {showTicketPurchased ? (
        <TicketPurchased
          purchasedKey={purchasedKey}
          ticketPurchasedRequest={ticketPurchasedRequest}
          isOpen={isActive => setStepModal(isActive)}
          isTicketPurchase={isTicketPurchaseOpen =>
            setShowTicketPurchased(isTicketPurchaseOpen)
          }
        />
      ) : (
        ""
      )}

      {showManualPdfTransfer ? (
        <ManualPdfTransfer
          cloakListings={cloakListings}
          manualTransferRequest={manualTransferRequest}
          purchasedKey={purchasedKey}
          isActive={isOpen => setStepModal(isOpen)}
          isPdfOpen={isPdfTransferOpen =>
            setShowManualPdfTransfer(isPdfTransferOpen)
          }
        />
      ) : (
        ""
      )}

      {/* For Sorting */}

      {isFetching || isResetPasswordFetching ? (
        ""
      ) : (
        <div className="sorting_tbl_nw">
          <div className="select_orderDetails">
            <div className="fl_orderDetails">
              <Form.Label style={{ color: "black", fontSize: "14px" }}>
                Sort By:
              </Form.Label>
              <Form.Control
                as="select"
                onChange={evt => {
                  handleInputChange(evt.target.value)
                }}
              >
                <option value="eventDetails-desc"> Event Date - Asc </option>
                <option value="eventDetails-asc"> Event Date - Desc </option>

                <option value="saleTime-asc"> Sales Date - Asc </option>
                <option value="saleTime-desc"> Sales Date - Desc </option>
              </Form.Control>
            </div>
          </div>

          <div className="orderDetails_filter check_group">
            <Form.Group>
              <Form.Label style={{ color: "black", fontSize: "14px" }}>
                Order Details Filter:
              </Form.Label>
              <Form.Check
                type="checkbox"
                name="2"
                value="1"
                defaultChecked={checked}
                onChange={evt => orderDetailsFilter(evt)}
                label="1"
                style={{ width: "38px", fontSize: "14px" }}
                ref={refStep1}
              />
              <Form.Check
                type="checkbox"
                name="2"
                value="2"
                defaultChecked={true}
                onChange={evt => orderDetailsFilter(evt)}
                label="2"
                style={{ width: "38px", fontSize: "14px" }}
                ref={refStep2}
              />
              <Form.Check
                type="checkbox"
                name="2"
                value="3"
                defaultChecked={true}
                onChange={evt => orderDetailsFilter(evt)}
                label="3"
                style={{ width: "38px", fontSize: "14px" }}
                ref={refStep3}
              />
              <Form.Check
                type="checkbox"
                name="2"
                value="4"
                defaultChecked={true}
                onChange={evt => orderDetailsFilter(evt)}
                label="4"
                style={{ width: "38px", fontSize: "14px" }}
                ref={refStep4}
              />
            </Form.Group>
          </div>
        </div>
      )}
      {isFetching ? (
        <Spinner />
      ) : (
        <div
          class="order_tbl_main"
          ref={div => {
            refScroll = div
          }}
        >
          <BootstrapTable
            data={data}
            version="4"
            striped
            hover
            pagination
            options={options}
            trClassName={trClassName}
            expandableRow={isExpandRow}
            expandComponent={expandRow}
            expandColumnOptions={{ expandColumnVisible: true }}
            ref={refEventSort}
            search
          >
            <TableHeaderColumn dataField="listingId" isKey hidden>
              Listing Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="externalReference" hidden>
              externalReference
            </TableHeaderColumn>
            <TableHeaderColumn dataField="orderNum" hidden>
              orderNum
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventName" hidden>
              EventName
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventAddress" hidden>
              Venue
            </TableHeaderColumn>
            <TableHeaderColumn dataField="eventId" hidden>
              eventId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="invoiceId" hidden>
              invoiceId
            </TableHeaderColumn>

            <TableHeaderColumn
              ref={refTimeToBuy}
              dataField="filter"
              filter={{
                type: "NumberFilter",
                delay: 1000,
                numberComparators: ["=", ">", "<", "<=", ">=", "!="]
              }}
              width="50%"
              expandable={false}
              hidden
            >
              Order Details
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="fiter2"
              width="50%"
              expandable={false}
              ref={refTicketTobuy}
              filter={{
                type: "NumberFilter",
                //delay: 1000,
                numberComparators: ["=", ">", "<", "<=", ">=", "!="]
              }}
              hidden
            >
              Order Details
            </TableHeaderColumn>
            <TableHeaderColumn dataSort={true} dataField="eventDate" hidden>
              Event Date
            </TableHeaderColumn>
            <TableHeaderColumn dataSort={true} dataField="saleTime" hidden>
              saleTime
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="invoiceId"
              width="12%"
              dataFormat={urlFormatter}
              expandable={false}
              //hidden
            >
              invoiceId
            </TableHeaderColumn>
            <TableHeaderColumn
              width="28%"
              dataSort
              dataFormat={detailsFormatter}
              dataField="eventDetails"
              expandable={false}
              //sort={"asc"}
              sortFunc={dateSortFuncForEvent}
              //hidden
            >
              Event Details
            </TableHeaderColumn>
            <TableHeaderColumn
              width="20%"
              dataFormat={sectionFormatter}
              dataField="TicketDetails"
              expandable={false}
              //hidden
            >
              Ticket Details
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={stepBar}
              dataAlign="center"
              dataField="name"
              width="50%"
              expandable={false}
              // //  hidden
            >
              Order Details
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      )}
    </div>
  )
}

export default withRouter(OrderFlowDataTable)
