import * as actions from "../actions/emailManagement"

const emailManagement = (
  state = {
    emailmanagement: []
  },
  action
) => {
  switch (action.type) {
    case actions.FETCH_EMAIL_MANAGEMENT_SUCCESS:
      return {
        ...state,
        emailmanagement: action.payload
      }
    default:
      return state
  }
}

export default emailManagement

export const getEmailManagement = state => state.emailmanagement
