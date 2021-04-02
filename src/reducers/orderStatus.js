import * as actions from "../actions/orderStatus"

const initialState = {
  eventInfo: []
}

const initialListing = {
  ids: [],
  dict: {}
}

const listings = (
  state = {
    orderStatuslistings: {}
  },
  action
) => {
  switch (action.type) {
    case actions.FETCH_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orderStatuslistings: action.payload
      }

    default:
      return state
  }
}

export default listings

export const getOrderStatusListings = state => state.orderStatuslistings
