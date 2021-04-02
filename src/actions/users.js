import { createAction } from "redux-actions"

export const USER_AUTHORIZATION_REQUEST = "USER_AUTHORIZATION_REQUEST"
export const USER_AUTHORIZATION_SUCCESS = "USER_AUTHORIZATION_SUCCESS"
export const USER_AUTHORIZATION_FAILURE = "USER_AUTHORIZATION_FAILURE"
export const USER_LOGOUT = "USER_LOGOUT"

export const userAuthorizationRequest = createAction(USER_AUTHORIZATION_REQUEST)
export const userAuthorizationSuccess = createAction(USER_AUTHORIZATION_SUCCESS)
export const userAuthorizationFailure = createAction(USER_AUTHORIZATION_FAILURE)

export const userLogOut = createAction(USER_LOGOUT)

export const USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST"
export const userUpdateProfileRequest = createAction(
  USER_UPDATE_PROFILE_REQUEST
)

export const FETCH_USER_PROFILE_REQUEST = "FETCH_USER_PROFILE_REQUEST"
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS"

export const fetchUserProfileRequest = createAction(FETCH_USER_PROFILE_REQUEST)
export const fetchUserProfileSuccess = createAction(FETCH_USER_PROFILE_SUCCESS)
