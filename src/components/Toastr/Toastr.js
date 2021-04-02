import React from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {
  ALERT_MSG_ERROR,
  ALERT_MSG_INFO,
  ALERT_MSG_WARN,
  ALERT_MSG_SUCCESS
} from "../../constants"

//info, error
const toastAction = {
  [`${ALERT_MSG_WARN}`]: toast.warn,
  [`${ALERT_MSG_SUCCESS}`]: toast.success,
  [`${ALERT_MSG_ERROR}`]: toast.error,
  [`${ALERT_MSG_INFO}`]: toast.info
}

const Toastr = ({
  alertMsg: { type = ALERT_MSG_WARN, message },
  appClearAlert
}) => {
  if (message) {
    const toast = toastAction[type] || toastAction[ALERT_MSG_WARN]
    if (toast) {
      toast(message, {
        onClose: appClearAlert
      })
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Toastr
