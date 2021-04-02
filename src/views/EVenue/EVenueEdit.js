import React, { useState } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"
import {
  ALERT_MSG_ERROR,
  ALERT_MSG_INFO,
  ALERT_MSG_WARN,
  ALERT_MSG_SUCCESS
} from "../../constants"

const EVenuesEdit = ({
  updateEVenueRequest,
  rowToEdit,
  isEVenueEdit,
  appReceiveAlert,
  fetchEVenueRequest
}) => {
  const [eVenueModal, seteVenueModal] = useState(true)

  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={eVenueModal}
        onHide={() => {
          seteVenueModal(false)
          fetchEVenueRequest()
          if (isEVenueEdit != undefined) isEVenueEdit(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="E-Venue_title" style={{ color: "black" }}>
            Edit E-Venue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ "max-height": "calc(100vh - 110px)", "overflow-y": "auto" }}
        >
          <div>
            <Form>
              {Object.keys(rowToEdit).map((key, i) => {
                let name = ""
                if (key === "name") name = "Name"
                if (key === "scraperURL") name = "Event List  URL"

                if (key === "url") name = "Url"
                if (key === "timezone") name = "Time Zone"
                // if (key === "stockType") name = "Stock Type"
                if (key === "city") name = "City"
                if (key === "state") name = "State"
                if (key === "zip") name = "Zip"
                if (key === "address") name = "Address"
                if (key === "country") name = "Country"
                if (key === "skyboxVenueId") name = "skyboxVenueId"
                if (key === "linkID") name = "linkID"
                if (key === "itC") name = "itC"
                if (key === "distributorId") name = "distributorId"
                if (key === "dataAccountId") name = "dataAccountId"
                if (key === "daylightSavingsTime") name = "daylightSavingsTime"
                if (key === "host") name = "API Call Host"
                if (key === "APIBASEURL") name = "API Base Url"
                if (key === "is_group") name = "Ticket has group purchase"
                if (key === "is_sectionfull")
                  name = "Section name need full display"

                if (key === "venueId") return null
                if (key === "stockType") return null
                if (key === "is_deleted") return null
                if (key === "is_blackList") return null
                if (key === "blackListTime") return null
                if (key === "priceMarkupPct") return null
                if (key === "is_priceMarkupPct") return null
                if (key === "status") return null
                return (
                  <Form.Group key={i}>
                    <div className="row">
                      <div className="col-sm-4">
                        <Form.Label
                          style={{
                            margin: "0",
                            width: "250px",
                            float: "left",
                            paddingRight: "15px",
                            lineHeight: "50px",
                            textAlign: "right",
                            color: "rgba(25, 38, 48, 0.5)",
                            fontWeight: "500"
                          }}
                        >
                          {name} <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                      </div>
                      <div className="col-sm-8">
                        <Form.Control
                          type="text"
                          // placeholder={key}
                          disabled={key === "url" ? true : false}
                          placeholder={
                            key === "url" ? "eg: http://www.xyz.com/" : key
                          }
                          style={{
                            height: "50px",
                            padding: "0 10px",
                            float: "left",
                            fontSize: "15px",
                            color: "#212529",
                            background: "#fff !important",
                            border: "1px solid rgba(25, 38, 48, 0.5)"
                          }}
                          defaultValue={rowToEdit[key]}
                          onChange={evt => (rowToEdit[key] = evt.target.value)}
                        />
                      </div>
                    </div>
                  </Form.Group>
                )
              })}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              seteVenueModal(false)
              fetchEVenueRequest()
              if (isEVenueEdit != undefined) isEVenueEdit(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (
                rowToEdit.name === "" &&
                rowToEdit.url === "" &&
                rowToEdit.timezone === "" &&
                rowToEdit.city === "" &&
                rowToEdit.state === "" &&
                rowToEdit.zip === "" &&
                rowToEdit.address === "" &&
                rowToEdit.scraperURL === "" &&
                rowToEdit.listingMainClass === "" &&
                rowToEdit.detailsEventURLClass === "" &&
                rowToEdit.eventTimeClass === "" &&
                rowToEdit.eventMonthClass === "" &&
                rowToEdit.eventDayClass === "" &&
                rowToEdit.eventYearClass === ""
              ) {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: 'All  "*"  Information is Required!'
                })
                seteVenueModal(true)
              } else if (rowToEdit.name === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Name is Required"
                })

                seteVenueModal(true)
              }
              // else if (rowToEdit.url === "") {
              //   appReceiveAlert({
              //     type: ALERT_MSG_ERROR,
              //     message: "Url is Required"
              //   })

              //   seteVenueModal(true)
              // }
              // else if (rowToEdit.url.search("http://www.")) {
              //   appReceiveAlert({
              //     type: ALERT_MSG_ERROR,
              //     message:
              //       "Url Required in this Formate eg:https://www.xyz.com/"
              //   })
              //   seteVenueModal(true)
              // }
              else if (rowToEdit.timezone === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Time Zone is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.city === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "City is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.state === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "State is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.zip === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Zip Code is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.address === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Address is Required"
                })
                seteVenueModal(true)
              } else if (rowToEdit.scraperURL === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event List Url is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.listingMainClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Listing Main Class is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.detailsEventURLClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Details Event URL is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.eventTimeClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event Time Class is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.eventMonthClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event Month Class is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.eventDayClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event Day Class is Required"
                })

                seteVenueModal(true)
              } else if (rowToEdit.eventYearClass === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event Year Class is Required"
                })

                seteVenueModal(true)
              } else {
                updateEVenueRequest(rowToEdit)
                seteVenueModal(false)
                if (isEVenueEdit != undefined) isEVenueEdit(false)
              }
              fetchEVenueRequest()
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EVenuesEdit
