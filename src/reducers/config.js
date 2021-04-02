import { SET_BOARDCASTING_STATUS } from "../actions/config"

const config = (
  state = {
    isBroadcasting: false
  },
  action
) => {
  switch (action.type) {
    case SET_BOARDCASTING_STATUS:
      return { ...state, isBroadcasting: action.payload }
    default:
      return state
  }
}

export default config
export const getIsBroadcasting = state => state.isBroadcasting
