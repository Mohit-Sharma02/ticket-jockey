import React from "react"

import Spinner from "../components/Spinner"

export const WithFetching = Component => props => {
  const { isFetching } = props

  return isFetching ? <Spinner /> : <Component {...props} />
}
