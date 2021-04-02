import { createAction } from "redux-actions"

export const FETCH_GLOBAL_REQUEST = "FETCH_GLOBAL_REQUEST"
export const fetchGlobalConfigRequest = createAction(FETCH_GLOBAL_REQUEST)
export const FETCH_GLOBAL_SUCCESS = "FETCH_GLOBAL_SUCCESS"
export const fetchGlobalConfigSuccess = createAction(FETCH_GLOBAL_SUCCESS)

export const DELETE_GLOBAL_REQUEST = "DELETE_GLOBAL_REQUEST"
export const deleteGlobalConfigRequest = createAction(DELETE_GLOBAL_REQUEST)

export const ADD_GLOBAL_REQUEST = "ADD_GLOBAL_REQUEST"
export const addGlobalConfigRequest = createAction(ADD_GLOBAL_REQUEST)

export const UPDATE_GLOBAL_REQUEST = "UPDATE_GLOBAL_REQUEST"
export const updateGlobalConfigRequest = createAction(UPDATE_GLOBAL_REQUEST)
