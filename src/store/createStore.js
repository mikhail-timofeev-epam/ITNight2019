import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk';
import BeaconsReducer from "../reducers/BeaconsReducer";
import BeaconsMiddleware from '../middlewares/BeaconsMiddleware';

const rootReducer = combineReducers({
    beacons: BeaconsReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, BeaconsMiddleware)
);

export { store };
