import { FETCH_GLOBAL_SUCCESS } from "../actions/globalConfig"

const globals = (
  state = {
    globals: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_GLOBAL_SUCCESS:
      return {
        ...state,
        globals: action.payload
      }
    default:
      return state
  }
}

export default globals
export const getGlobalConfigs = state => state.globals
