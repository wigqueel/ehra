import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AppReducer from "./app-reducer";
import AuthReducer from "./auth-reducer";
import publicReducer from "./public-reducer";
import themesReducer from "./themes-reducer";
import languagesReducer from "./languages-reducer";

let reducers = combineReducers({
    themes: themesReducer,
    languages: languagesReducer,
    app: AppReducer,
    auth: AuthReducer,
    public: publicReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store; 