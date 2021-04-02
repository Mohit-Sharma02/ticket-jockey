import React, { useState } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"
import { FormGroup, Input, Label } from "reactstrap"

const ManualPDFTransfer = ({
  isActive,
  manualTransferRequest,
  purchasedKey,
  cloakListings,
  isPdfOpen
}) => {
  const [manualPdfModal, setManualPdfModal] = useState(true)
  const [selectedOption, setSelectedOption] = useState({ value: "" })
  const selectChange = event => {
    selectedOption.value = event
    setSelectedOption(selectedOption)
  }

  return (
    <div className="animated">
      <Modal
        size="md"
        centered
        show={manualPdfModal}
        onHide={() => {
          cloakListings = []
          setManualPdfModal(false)
          if (isActive != undefined) isActive(true)
          isPdfOpen(false)
        }}
      >
        <Modal.Header closeButton style={{ background: "blue" }}>
          <Modal.Title className="order_title">Manual PO Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group controlId="formOrderNumber">
                <Form.Label>
                  Cloak Listing
                  <span style={{ color: "red" }}> * </span>
                </Form.Label>
                <br />
                {cloakListings.length == 0 ? (
                  <span>No Record Is Present</span>
                ) : (
                  cloakListings.map(list => (
                    <FormGroup check>
                      <Input
                        type="radio"
                        id={list.id}
                        value={JSON.stringify(list)}
                        key={list.id}
                        name="clockListing"
                        onChange={evt => {
                          selectChange(evt.target.value)
                        }}
                      />
                      <Label htmlFor={list.id}>
                        Row: {list.row}, Section:{list.section}, Qantity:
                        {list.quantity}, Price:{list.listPrice}
                      </Label>
                    </FormGroup>
                  ))
                )}
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              cloakListings = []
              setManualPdfModal(false)
              if (isActive != undefined) isActive(true)
              isPdfOpen(false)
            }}
          >
            Close
          </Button>
          <Button
            //style={{ background: "SkyBlue" }}
            disabled={cloakListings.length == 0}
            style={{
              background: cloakListings.length == 0 ? "grey" : "skyblue"
            }}
            onClick={evt => {
              //setManualPdfModal(false)
              manualTransferRequest({
                listingId: purchasedKey,
                cloakListing: JSON.parse(selectedOption.value)
              })
              setManualPdfModal(false)
              if (isActive != undefined) isActive(false)
              isPdfOpen(false)
            }}
          >
            Manual PO Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManualPDFTransfer
