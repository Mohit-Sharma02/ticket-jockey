import React from "react"
import DefaultLayout from "./containers/DefaultLayout"

const Dashboard = React.lazy(() => import("./views/Dashboard"))

const Search = React.lazy(() => import("./views/Search"))
const Event = React.lazy(() => import("./views/Event"))
const ManagedEvents = React.lazy(() => import("./views/ManagedEvents"))
const EventQueue = React.lazy(() => import("./views/EventQueue"))
const ManagedVenue = React.lazy(() => import("./views/ManagedVenue"))
const Promos = React.lazy(() => import("./views/Promos"))
const GlobalConfig = React.lazy(() => import("./views/GlobalConfig"))
const Logs = React.lazy(() => import("./views/Logs"))
const OrderStatus = React.lazy(() => import("./views/OrderStatus"))
const EVenue = React.lazy(() => import("./views/EVenue"))
const EmailManagement = React.lazy(() => import("./views/EmailManagement"))
const EventStatistic = React.lazy(() => import("./views/EventStatistic"))
const EventsLogInfo = React.lazy(() => import("./views/EventsLogInfo"))
const EvenueDetail = React.lazy(() => import("./views/EVenueDetail"))
const TimeDetail = React.lazy(() => import("./views/TimeDetail"))
const ProfileDetail = React.lazy(() => import("./views/ProfileDetail"))
const AxsVenues = React.lazy(() => import("./views/AxsVenues"))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

//Note Please Do not add any route in between the array, always add at the end of the array..
const routes = [
  { path: "/", name: "Home", component: DefaultLayout, exact: true },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/search", name: "Search", component: Search },
  {
    path: "/managedEvents/:keyword?",
    name: "ManagedEvents",
    component: ManagedEvents
  },
  { path: "/managedVenue", name: "ManagedVenue", component: ManagedVenue },
  { path: "/eventQueue", name: "EventQueue", component: EventQueue },
  { path: "/event/:eventId", name: "Event", component: Event },
  { path: "/promos", name: "Promos", component: Promos },
  { path: "/globalConfig", name: "GlobalConfig", component: GlobalConfig },
  { path: "/logs", name: "Logs", component: Logs },
  { path: "/orderStatus", name: "OrderStatus", component: OrderStatus },
  { path: "/eVenue", name: "EVenue", component: EVenue },
  {
    path: "/emailManagement",
    name: "EmailManagement",
    component: EmailManagement
  },
  {
    path: "/eventStatistic",
    name: "EventStatistic",
    component: EventStatistic
  },
  { path: "/eventsLogInfo", name: "EventsLogInfo", component: EventsLogInfo },
  {
    path: "/eVenueDetail/:venueId",
    name: "EvenueDetail",
    component: EvenueDetail
  },
  {
    path: "/timeDetail",
    name: "TimeDetail",
    component: TimeDetail
  },
  {
    path: "/userProfile",
    name: "ProfileDetail",
    component: ProfileDetail
  },
  { path: "/axsVenues", name: "AxsVenue", component: AxsVenues }
]

export default routes
