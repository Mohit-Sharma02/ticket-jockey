import React from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

import * as constants from "../../constants"

const errorHandlers = type => {
  switch (type) {
    case constants.ERROR_EVENT_NOT_FOUND:
      return () => window.history.back()
    default:
      break
  }
}

const ErrorModal = ({ errorMsg: { type, message }, clearError }) => (
  <Modal isOpen={!!message} className={"modal-danger"}>
    <ModalHeader toggle={clearError}>Error</ModalHeader>
    <ModalBody>{message}</ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        onClick={() => {
          type && errorHandlers(type)()
          clearError()
        }}
      >
        Ok
      </Button>
    </ModalFooter>
  </Modal>
)

export default ErrorModal
