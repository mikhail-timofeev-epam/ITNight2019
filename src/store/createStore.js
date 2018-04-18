import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import BeaconsReducer from "../reducers/BeaconsReducer";
import rootNavigation from "../reducers/rootNavigatorReducer";
import AuthorizationReducer from "../reducers/AuthorizationReducer";
import BeaconsMiddleware from "../middlewares/BeaconsMiddleware";
import { RootNavMiddleware } from "../middlewares/navigationMiddleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
    key: "root",
    storage,
    whitelist: "authorization",
};

const rootReducer = combineReducers({
    beacons: BeaconsReducer,
    authorization: AuthorizationReducer,
    rootNavigation,
});

const logger = createLogger({
    duration: true,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware, RootNavMiddleware, BeaconsMiddleware, logger)
);

const persistor = persistStore(store);

export { store, persistor };
