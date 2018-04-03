import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from "redux-logger";
import BeaconsReducer from "../reducers/BeaconsReducer";
import BeaconsMiddleware from '../middlewares/BeaconsMiddleware';

const rootReducer = combineReducers({
    beacons: BeaconsReducer,
});

const logger = createLogger({
    duration: true,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, BeaconsMiddleware)
);

export { store };
