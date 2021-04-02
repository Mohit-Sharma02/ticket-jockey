import React, { Suspense, useEffect } from "react"
import { Redirect, Route, Switch, withRouter } from "react-router-dom"
// import { Container } from "reactstrap"
import { connect } from "react-redux"

import {
  // AppAside,
  // AppBreadcrumb,
  // AppFooter,
  // AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react"
// sidebar nav config
import navigation from "../../_nav"
// routes config
import routes from "../../routes"
import {
  // initWebSocketRequest,
  // closeWebSocket,
  initFirebaseRequest,
  closeFirebase
} from "../../actions/app"
import { userLogOut } from "../../actions/users"
import Dashboard from "../../views/Dashboard"
import {
  withUserLoginContainer,
  RoleManger,
  RoleBuyer,
  RoleAdmin
} from "../../effects"
import { routeMapping } from "../../utils/validation"
import { getUserInfo, getAccessToken, getGlobalConfigs } from "../../reducers"
import { restApiClient, awsApiClient, emailScrapingClient } from "../../api"
import { fetchGlobalConfigRequest } from "../../actions/globalConfig"

// const DefaultAside = React.lazy(() => import("./DefaultAside"))
const DefaultFooter = React.lazy(() => import("./DefaultFooter"))
const DefaultHeader = React.lazy(() => import("./DefaultHeader"))

// const SideBarContainer = withRouter(
//   RoleManger(() => (
//     <AppSidebar fixed display="lg">
//       <AppSidebarHeader />
//       <AppSidebarForm />
//       <Suspense>
//         <AppSidebarNav navConfig={navigation} />
//       </Suspense>
//       <AppSidebarFooter />
//       <AppSidebarMinimizer />
//     </AppSidebar>
//   ))
// )

const RouteContainter = withRouter(
  RoleAdmin(() => {
    const routesCompoenent = routes.map((route, idx) => {
      return route.component ? (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      ) : null
    })

    return (
      <Switch>
        {routesCompoenent}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    )
  }, Dashboard)
)
const RouteManagerContainter = withRouter(
  RoleManger(() => {
    var routeValue = routeMapping(routes, "manager")
    const routesCompoenent = routeValue.map((route, idx) => {
      return route.component ? (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      ) : null
    })

    return (
      <Switch>
        {routesCompoenent}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    )
  }, Dashboard)
)

// } else if (userInfo.role === "buyer") {
const BuyerRouteContainter = withRouter(
  RoleBuyer(() => {
    var routeValue = routeMapping(routes, "Buyer")
    const routesCompoenent = routeValue.map((route, idx) => {
      return route.component ? (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      ) : null
    })

    return (
      <Switch>
        {routesCompoenent}
        <Redirect from="/" to="/dashboard" />
      </Switch>
    )
  }, Dashboard)
)
// }

const DefaultLayout = ({
  // initWebSocketRequest,
  initFirebaseRequest,
  // closeWebSocket,
  closeFirebase,
  userLogOut,
  userInfo,
  token,
  fetchGlobalConfigRequest,
  globals
}) => {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  )

  useEffect(() => {
    // initWebSocketRequest()

    // Refresh Page Every 5 Minute
    // setInterval(() => {
    //   window.location.reload()
    // }, 300000)

    restApiClient.defaults.params = {
      ...restApiClient.defaults.params,
      username: userInfo.username
    } //add username as a parameter of api request

    restApiClient.defaults.headers = {
      ...restApiClient.defaults.headers,
      "x-access-token": token
    } //add token as a header of api request

    awsApiClient.defaults.headers = {
      ...awsApiClient.defaults.headers,
      "x-access-token": token
    } //add token as a header of api request

    initFirebaseRequest()
    fetchGlobalConfigRequest()

    return () => {
      // closeWebSocket()
      closeFirebase()
    }
  }, [])

  var globalConfigs = globals.find(
    global => global.keyName == "AWSTicketDomain"
  )

  var emailScarpURL = globals.find(
    global => global.keyName == "emailScrapingURL"
  )

  if (globalConfigs != undefined) {
    awsApiClient.defaults.baseURL = globalConfigs.value + "/api"
  } else {
    // For Dev
    awsApiClient.defaults.baseURL =
      "https://tj.php-development-services.com/api"
  }

  if (emailScarpURL != undefined) {
    emailScrapingClient.defaults.baseURL = emailScarpURL.value + "/api"
  } else {
    // For Dev
    emailScrapingClient.defaults.baseURL =
      "http://ticketMasterApi.rlogical.com/api"
  }

  if (userInfo.role.toLowerCase() === "manager") {
    return (
      <div className="App">
        <Suspense fallback={loading()}>
          <DefaultHeader
            userLogOut={userLogOut}
            navConfig={navigation}
            userInfo={userInfo}
          />
        </Suspense>
        <div className="rightAside">
          <main className="main">
            <Suspense fallback={loading()}>
              <RouteManagerContainter />
            </Suspense>
          </main>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </div>
      </div>
    )
  } else if (userInfo.role.toLowerCase() === "buyer") {
    return (
      <div className="App">
        <Suspense fallback={loading()}>
          <DefaultHeader
            userLogOut={userLogOut}
            navConfig={navigation}
            userInfo={userInfo}
          />
        </Suspense>
        <div className="rightAside">
          <main className="main">
            <Suspense fallback={loading()}>
              <BuyerRouteContainter />
            </Suspense>
          </main>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Suspense fallback={loading()}>
          <DefaultHeader
            userLogOut={userLogOut}
            navConfig={navigation}
            userInfo={userInfo}
          />
        </Suspense>
        <div className="rightAside">
          <main className="main">
            <Suspense fallback={loading()}>
              <RouteContainter />
            </Suspense>
          </main>
          <Suspense fallback={loading()}>
            <DefaultFooter />
          </Suspense>
        </div>
      </div>
    )
  }

  // return (
  //   <div className="App">
  //     <Suspense fallback={loading()}>
  //       <DefaultHeader userLogOut={userLogOut} navConfig={navigation} />
  //     </Suspense>
  //     <div>
  //       <main className="main">
  //         <Suspense fallback={loading()}>
  //           <RouteContainter />
  //         </Suspense>
  //       </main>
  //     </div>
  //     <Suspense fallback={loading()}>
  //       <DefaultFooter />
  //     </Suspense>
  //   </div>
  // )
}

export default connect(
  state => ({
    userInfo: getUserInfo(state),
    token: getAccessToken(state),
    globals: getGlobalConfigs(state)
  }),
  {
    // initWebSocketRequest,
    initFirebaseRequest,
    fetchGlobalConfigRequest,
    // closeWebSocket,
    closeFirebase,
    userLogOut
  }
)(withUserLoginContainer(DefaultLayout))
