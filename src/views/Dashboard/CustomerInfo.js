import React, { useState } from "react"
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-confirm-alert/src/react-confirm-alert.css" // Import css
import { Modal } from "react-bootstrap"

const CustomerInfo = ({ isOpen, data }) => {
  const [customerInfoModal, setCustomerInfoModal] = useState(true)
  return (
    <div className="animated">
      <Modal
        size="md"
        centered
        show={customerInfoModal}
        onHide={() => {
          setCustomerInfoModal(false)
          isOpen(false)
        }}
      >
        <Modal.Header closeButton style={{ background: "black" }}>
          <Modal.Title
            className="order_title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <span> Total Cost Of Customers</span>
            <span
              onClick={() => {
                setCustomerInfoModal(false)
                isOpen(false)
              }}
            >
              <i class="fa fa-times"></i>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {Object.values(data).map((key, i) => (
              <>
                <div className="row">
                  <div className="col-8">
                    <label className="customerInfo">
                      {Object.keys(key)}:{"  "}{" "}
                    </label>
                  </div>
                  <div className="col-4">
                    <span>
                      {Object.values(key)
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2
                          }).format(Object.values(key))
                        : "0"}
                    </span>
                    <br />
                  </div>
                </div>
              </>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CustomerInfo
