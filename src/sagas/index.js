import { all } from "redux-saga/effects"

import app from "./app"
import user from "./user"
import events from "./events"
import tickets from "./tickets"
import listings from "./listings"
import venues from "./venues"
import config from "./config"
import promos from "./promos"
import globals from "./globalConfig"
import logs from "./logs"
import orders from "./orderStatus"
import eVenues from "./eVenue"
import emailManagement from "./emailManagement"
import eventStatistic from "./eventStatistic"
import clockTimer from "./clockTimer"
import axsVenues from "./axsVenues"

function* rootSaga() {
  yield all([
    app(),
    user(),
    tickets(),
    events(),
    listings(),
    venues(),
    config(),
    promos(),
    globals(),
    logs(),
    orders(),
    eVenues(),
    emailManagement(),
    eventStatistic(),
    clockTimer(),
    axsVenues()
  ])
}

export default rootSaga
