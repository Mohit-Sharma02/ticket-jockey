import { createAction } from "redux-actions"

//Email Management
export const CREATE_EMAIL_MANAGEMENT_REQUEST = "CREATE_EMAIL_MANAGEMENT_REQUEST"
export const CREATE_EMAIL_MANAGEMENT_SUCCESS = "CREATE_EMAIL_MANAGEMENT_SUCCESS"
export const CREATE_EMAIL_MANAGEMENT_FAILURE = "CREATE_EMAIL_MANAGEMENT_FAILURE"

export const createEmailManagementRequest = createAction(
  CREATE_EMAIL_MANAGEMENT_REQUEST
)

export const createEmailManagementSuccess = createAction(
  CREATE_EMAIL_MANAGEMENT_SUCCESS
)

export const createEmailManagementFailure = createAction(
  CREATE_EMAIL_MANAGEMENT_FAILURE
)
export const DELETE_EMAIL_MANAGEMENT_REQUEST = "DELETE_EMAIL_MANAGEMENT_REQUEST"
export const DELETE_EMAIL_MANAGEMENT_SUCCESS = "DELETE_EMAIL_MANAGEMENT_SUCCESS"
export const DELETE_EMAIL_MANAGEMENT_FAILURE = "DELETE_EMAIL_MANAGEMENT_FAILURE"

export const deleteEmailManagementRequest = createAction(
  DELETE_EMAIL_MANAGEMENT_REQUEST
)
export const deleteEmailManagementSuccess = createAction(
  DELETE_EMAIL_MANAGEMENT_SUCCESS
)

export const FETCH_EMAIL_MANAGEMENT_REQUEST = "FETCH_EMAIL_MANAGEMENT_REQUEST"
export const FETCH_EMAIL_MANAGEMENT_SUCCESS = "FETCH_EMAIL_MANAGEMENT_SUCCESS"

export const fetchEmailManagementRequest = createAction(
  FETCH_EMAIL_MANAGEMENT_REQUEST
)
export const fetchEmailManagementSuccess = createAction(
  FETCH_EMAIL_MANAGEMENT_SUCCESS
)

export const UPDATE_EMAIL_MANAGEMENT_REQUEST = "UPDATE_EMAIL_MANAGEMENT_REQUEST"
export const UPDATE_EMAIL_MANAGEMENT_SUCCESS = "UPDATE_EMAIL_MANAGEMENT_SUCCESS"

export const updateEmailManagementRequest = createAction(
  UPDATE_EMAIL_MANAGEMENT_REQUEST
)
export const updateEmailManagementSuccess = createAction(
  UPDATE_EMAIL_MANAGEMENT_SUCCESS
)
