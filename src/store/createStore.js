import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import BeaconsReducer from "../reducers/BeaconsReducer";
import GoogleSignInMiddleware from "../middlewares/GoogleSignInMiddleware";
import VKSignInMiddleware from "../middlewares/VKSignInMiddleware";
import SimpleSignInMiddleware from "../middlewares/SimpleSignInMiddleware";
import AuthorizationReducer from "../reducers/AuthorizationReducer";
import BeaconsMiddleware from "../middlewares/BeaconsMiddleware";

const rootReducer = combineReducers({
    beacons: BeaconsReducer,
    authorization: AuthorizationReducer
});

const logger = createLogger({
    duration: true,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, BeaconsMiddleware, GoogleSignInMiddleware, VKSignInMiddleware, SimpleSignInMiddleware, logger)
);

export { store };
