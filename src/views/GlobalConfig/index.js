import { connect } from "react-redux"

import {
  fetchGlobalConfigRequest,
  deleteGlobalConfigRequest,
  addGlobalConfigRequest,
  updateGlobalConfigRequest
} from "../../actions/globalConfig"
import { getGlobalConfigs } from "../../reducers"
import GlobalConfig from "./GlobalConfig"

const GlobalConfigContainer = connect(
  state => ({
    globals: getGlobalConfigs(state)
  }),
  {
    fetchGlobalConfigRequest,
    deleteGlobalConfigRequest,
    addGlobalConfigRequest,
    updateGlobalConfigRequest
  }
)(GlobalConfig)

export default GlobalConfigContainer
