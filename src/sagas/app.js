import { put, take, call, cancelled, fork, cancel } from "redux-saga/effects"
import { eventChannel } from "redux-saga"
// import io from "socket.io-client"
import firebase from "firebase"

import * as appActions from "../actions/app"
import * as userActions from "../actions/users"
import * as listingsActions from "../actions/listings"

import * as configApi from "../api/globalConfig"
import // WEB_SOCKET_URL,
// TYPE_SALE_LISTING,
// TYPE_TRANSFER_LISTING,
// FIRBASE_CONFIG
"../constants"

// function createSocketChannel(socket) {
//   return eventChannel(emiter => {
//     socket.on("connect", () => {
//       console.log("socket is connecting.....")
//     })

//     socket.on("disconnect", () => {
//       console.log("socket is disconnecting.....")
//     })

//     socket.on("reconnect", () => {
//       console.log("socket is reconnecting.....")
//       emiter({ color: "warn" })
//     })

//     socket.on("new_message", msg => {
//       emiter(msg)
//     })

//     return () => {
//       socket && socket.close()
//     }
//   })
// }

function createFirebaseChannel() {
  return eventChannel(emiter => {
    const db = firebase
      .app()
      .database()
      .ref()

    const listener = db.on("child_changed", snapshot => {
      emiter(snapshot.val())
    })

    return () => {
      listener.off()
    }
  })
}

// function* initWebSocketSaga() {
//   try {
//     const webSocket = new io(WEB_SOCKET_URL)

//     yield put(appActions.initWebSocketSuccess(webSocket))

//     const socketChannel = yield call(createSocketChannel, webSocket)

//     while (true) {
//       try {
//         const { dashboardToast, color } = yield take(socketChannel)

//         if (dashboardToast) {
//           yield put(
//             appActions.appReceiveAlert({ message: dashboardToast, type: color })
//           )
//         }

//         yield put(listingsActions.fetchOpenListingsRequest())
//       } catch (error) {
//         if (error.response.status === 403)
//           yield put(userActions.userAuthorizationFailure(error))
//         else yield put(appActions.appReceiveError(error))
//       } finally {
//         if (yield cancelled()) {
//           socketChannel.close()
//         }
//       }
//     }
//   } catch (error) {
//     if (error.response.status === 403)
//       yield put(userActions.userAuthorizationFailure(error))
//     else yield put(appActions.appReceiveError(error))
//   }
// }

function* initFirebaseSaga() {
  try {
    if (!firebase.apps.length) {
      const { data } = yield call(configApi.fetchGlobals)

      firebase.initializeApp(data.firebaseConfig)
    }

    // if (firebase.messaging.isSupported()) {
    //   const token = yield firebase.messaging().getToken()

    //   const { data } = yield call(
    //     configApi.registerToTopic,
    //     token,
    //     "allTJDevices"
    //   )
    // }

    const firebaseChannel = yield call(createFirebaseChannel)

    while (true) {
      try {
        const { dashboardToast, color } = yield take(firebaseChannel)

        if (dashboardToast) {
          yield put(
            appActions.appReceiveAlert({ message: dashboardToast, type: color })
          )
        }

        yield put(listingsActions.fetchOpenListingsRequest())
      } catch (error) {
        if (error.response.status === 403)
          yield put(userActions.userAuthorizationFailure(error))
        else yield put(appActions.appReceiveError(error))
      } finally {
        if (yield cancelled()) {
          firebaseChannel.close()
        }
      }
    }
  } catch (error) {
    if (error.response.status === 403)
      yield put(userActions.userAuthorizationFailure(error))
    else yield put(appActions.appReceiveError(error))
  }
}

function* watchWebSocketSaga() {
  while (true) {
    // yield take(appActions.INIT_WEB_SOCKET_REQUEST)
    // const task = yield fork(initWebSocketSaga)

    yield take(appActions.INIT_FIREBASE_REQUEST)
    const firebaseTask = yield fork(initFirebaseSaga)

    // yield take(appActions.CLOSE_WEB_SOCKET)
    // cancel(task)

    yield take(appActions.CLOSE_FIREBASE)
    cancel(firebaseTask)
  }
}

export default watchWebSocketSaga
