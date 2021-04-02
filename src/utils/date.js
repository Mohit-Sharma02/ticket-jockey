import moment from "moment-timezone"

const dateFormatStr = "MM/DD/YY, hh:mm a"
const defaultTimeZone = "America/New_York"

export const dateSortFunc = (a, b, order, sortField) => {
  const diff =
    moment(a[sortField], dateFormatStr).unix() -
    moment(b[sortField], dateFormatStr).unix()

  return order === "desc" ? diff : diff * -1
}

export const dateFormatterWithTZ = time => timezone =>
  moment(time)
    .tz(timezone || defaultTimeZone)
    .format(dateFormatStr)

export const dateFormatter = time => moment(time).format(dateFormatStr)

// For EventDate sort Of OverFlow Table
export const dateSortFuncForEvent = (a, b, order, sortField) => {
  var aa = new Date(a.eventDate).getTime()
  var bb = new Date(b.eventDate).getTime()
  if (order === "asc") {
    const diff = bb - aa
    return diff
  } else {
    const diff = aa - bb
    return diff
  }
}

// For modifying dateFormate
export const dateFormatForall = date => {
  var dateParam = new Date(date)
  var Year = dateParam.getFullYear()
  var month = dateParam.getMonth() + 1
  var date = dateParam.getDate()
  if (date < 10) date = "0" + date
  else date = date
  if (month < 10) month = "0" + month
  else month = month
  return Year + "-" + month + "-" + date
}

// For modifying time
export const timeFormatALL = time => {
  var hours = time.split(":")[0]
  var minutes = time.split(":")[1]
  if (hours < 10) hours = "0" + hours
  else hours = hours
  if (minutes < 10) minutes = "0" + minutes
  else minutes = minutes
  return hours + ":" + minutes
}

export const estdateTime = dateTime => {
  var date = new moment(dateTime, "DD.MM.YYYY HH.mm").toDate("en-US")
  var indianDateTime = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(date))

  return moment
    .utc(indianDateTime)
    .tz("America/New_York")
    .format("MM/DD/YYYY hh:mm:ss A")
}
