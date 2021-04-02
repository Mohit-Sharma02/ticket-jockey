import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getHasLoggedIn } from "../reducers"

const withUserLogin = Component => props => {
  const { hasLoggedIn } = props

  return hasLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
  //return <Component {...props} />
}

export const withUserLoginContainer = compose(
  connect(state => ({
    hasLoggedIn: getHasLoggedIn(state)
  })),
  withUserLogin
)
