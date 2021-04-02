import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"

import {
  checkPermission,
  genPermission,
  USER_ROLE_ADMIN,
  USER_ROLE_BUYER,
  USER_ROLE_MANAGER
} from "../constants"
import { getUserInfo } from "../reducers"

const withAuthority = permission => (
  AuthorizedComponent,
  UnAuthorizedComponent = () => ""
) => props => {
  const {
    userInfo: { role }
  } = props

  if (!checkPermission(role)(permission)) return <UnAuthorizedComponent />

  return <AuthorizedComponent {...props} />
}

const withAuthorityContainer = permission =>
  compose(
    connect(state => ({
      userInfo: getUserInfo(state)
    })),
    withAuthority(genPermission(permission))
  )

export const RoleBuyer = withAuthorityContainer(USER_ROLE_BUYER)
export const RoleManger = withAuthorityContainer(USER_ROLE_MANAGER)
export const RoleAdmin = withAuthorityContainer(USER_ROLE_ADMIN)
