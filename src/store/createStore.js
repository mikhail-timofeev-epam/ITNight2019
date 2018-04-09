import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import BeaconsReducer from "../reducers/BeaconsReducer";
import rootNavigation from "../reducers/rootNavigatorReducer";
import AuthorizationReducer from "../reducers/AuthorizationReducer";
import BeaconsMiddleware from "../middlewares/BeaconsMiddleware";
import { RootNavMiddleware } from "../middlewares/navigationMiddleware";

const rootReducer = combineReducers({
    beacons: BeaconsReducer,
    authorization: AuthorizationReducer,
    rootNavigation,
});

const logger = createLogger({
    duration: true,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, RootNavMiddleware, BeaconsMiddleware, logger)
);

export { store };
