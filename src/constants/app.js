let url = window.location.href

var env = url.includes("localhost") ? "dev" : url.split(".")[0].split("-")[2]

export const WEB_SOCKET_URL = `https://tj-backend-${env}.mybluemix.net`

// export const WEB_SOCKET_URL = "https://tj-backend-dev.mybluemix.net"

//Alert
export const ALERT_MSG_WARN = "warn"
export const ALERT_MSG_INFO = "info"
export const ALERT_MSG_SUCCESS = "success"
export const ALERT_MSG_ERROR = "error"

//Web Socket
export const WEB_SOCKET_CLOSE = "WEB_SOCKET_CLOSE"

export const setBackendUrl = currentUrl => {
  var env = ""
  var baseUrl = ""

  env = url.includes("localhost") ? "dev" : "prod"
  baseUrl = `https://tj-backend-${env}.mybluemix.net/`
  return baseUrl
}
