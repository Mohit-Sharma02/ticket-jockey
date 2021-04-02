import React from "react"

export const TYPE_SALE_LISTING = "sale"
export const TYPE_TRANSFER_LISTING = "transfer"
export const TYPE_PROBLEM_BUYING_LISTING = "problemBuying"

//problem buying reason
export const PROBLEM_BUYING_REASON = [
  "Promo Code Needed",
  "Seat Not Available",
  "TM App Error",
  "It’s not you It’s us",
  "Other",
  "Will Call Only",
  "Price does not Match"
]

export const STEP2_INFO =
  'Is This Ticket Actually Purchased? If So Please Click "Ticket purchased" Button'

export const STEP3_INFO = (
  <div>
    <span>
      <b>[A]</b> The PO From 1Ticket Is Not Attached To Invoice, Please Check On
      1Ticket That The PDF Was Downloaded & Listing Created In Skybox.
      Additionally, Check That The Ticket Details Of The 1Ticket Listing Match
      The Sold Ticket (quantity, section, row, event date & time).
    </span>
    <br />
    <br />
    <span>
      <b>[B]</b> If A Different Section or Row Purchased, Then please hit Manual
      PO Transfer listed below and select appropriate 1Ticket listing and press
      Submit.
    </span>
  </div>
)

export const COLOR = [
  "#86b1eb",
  "#434348",
  "#8ef17e",
  "#f2a55e",
  "red",
  "#008000",
  "#00008B",
  "#800080",
  "#FF1493",
  "#FF00FF",
  "#4B0082",
  "#A52A2A",
  "#D2691E",
  "#DAA520",
  "#696969"
]

export const POINTSTYLE = [
  "rectRot",
  "rect",
  "triangle",
  "star",
  "circle",
  "rectRot",
  "rect",
  "triangle",
  "star",
  "circle",
  "rectRot",
  "rect",
  "triangle",
  "star",
  "circle"
]

// Secondary Market Locations
export const SECONDARY_MARKET_LOCATION = [
  "Stubhub",
  "Vivid Seats",
  "Seatgeek",
  "Ticket Network",
  "Tickpick",
  "Viagogo"
]

// Customer Display Name
export const CUSTOMER_DISPLAY_NAME = [
  "seatgeek",
  "ticketnetwork",
  "vividseats",
  "viagogo",
  "gametime",
  "tickpick",
  "stubhub"
]

//Ticket Master url
export const TICKETMASTERURL = "https://www1.ticketmaster.com/event/"
