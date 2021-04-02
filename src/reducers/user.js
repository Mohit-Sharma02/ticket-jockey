import {
  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_FAILURE,
  USER_LOGOUT,
  FETCH_USER_PROFILE_SUCCESS
} from "../actions/users"

const initialState = {
  userProfileInfo: {},
  userInfo: {},
  token: "",
  hasLoggedIn: false
}

const user = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_AUTHORIZATION_REQUEST:
      return initialState
    case USER_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        hasLoggedIn: true,
        userInfo: payload.account,
        token: payload.token
      }
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileInfo: payload
      }
    case USER_AUTHORIZATION_FAILURE:
    case USER_LOGOUT:
      return initialState
    default:
      return state
  }
}

export default user

export const getHasLoggedIn = state => state.hasLoggedIn
export const getUserInfo = state => state.userInfo
export const getUserProfileInfo = state => state.userProfileInfo
export const getAccessToken = state => state.token
