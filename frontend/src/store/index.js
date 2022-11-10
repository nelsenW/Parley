import {combineReducers, applyMiddleware, createStore, compose} from "redux"
import thunk from "redux-thunk"
import session from "./session"
import servers from "./servers"
import messages from "./messages"
import channels from "./channels"
import users from "./users"
import online from "./online"
import friendships from "./friendships"
import dms from "./dms"

const rootReducer = combineReducers({
  session,
  servers,
  messages,
  channels,
  users,
  online,
  friendships,
  dms
});

let enhancer

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
