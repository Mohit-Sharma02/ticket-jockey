import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import createFilter from "redux-persist-transform-filter"

import rootReducer from "../reducers"
import rootSaga from "../sagas"

const persistConfig = {
  key: "root",
  storage,
  debug: true,
  whitelist: ["user", "tickets"]
  // transforms: [createFilter("app", ["isBroadcasting"])]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const storeEnhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(persistedReducer, storeEnhancer)
const persistor = persistStore(store)

const configureStore = () => {
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export default configureStore
export const clearStore = () => persistor.purge()
