import React, { useState, useEffect } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Button, Modal, Form } from "react-bootstrap"

const TicketPurchased = ({
  purchasedKey,
  ticketPurchasedRequest,
  isOpen,
  isTicketPurchase
}) => {
  const [orderNum, setOrderNum] = useState("")
  const [ticketModal, setTicketModal] = useState(true)

  return (
    <div className="animated">
      <Modal
        size="md"
        centered
        show={ticketModal}
        onHide={() => {
          setTicketModal(false)
          if (isTicketPurchase != undefined) isTicketPurchase(false)
        }}
      >
        <Modal.Header closeButton style={{ background: "blue" }}>
          <Modal.Title className="order_title">Enter Order Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group controlId="formOrderNumber">
                <Form.Label>
                  Order Number
                  <span className="order_error" style={{ color: "red" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="Order_txt"
                  value={orderNum}
                  placeholder="Order Number..."
                  onChange={evt => setOrderNum(evt.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTicketModal(false)
              if (isTicketPurchase != undefined) isTicketPurchase(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!orderNum}
            style={{ background: !orderNum ? "grey" : "skyblue" }}
            onClick={() => {
              ticketPurchasedRequest([
                { listingId: purchasedKey, orderNum: orderNum }
              ])
              setTicketModal(false)
              setOrderNum("")
              if (isOpen != undefined) isOpen(false)
            }}
          >
            Ticket Purchased
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TicketPurchased
