import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AppReducer from "./app-reducer";
import AuthReducer from "./auth-reducer";
import themesReducer from "./themes-reducer";

let reducers = combineReducers({
    themes: themesReducer,
    app: AppReducer,
    auth: AuthReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store; 