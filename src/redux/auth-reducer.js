import {api} from '../api/api';
import { showNotification } from '../parts/Admin/utils/notifications/notifications';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_LOGIN_FORM_LOADING = 'SET_LOGIN_FORM_LOADING';

const initialState = {
    id: null,
    username: null,
    email: null,
    phone: null,
    fio: null,
    isAuth: false,
    loginFormLoading: false,
}

const AutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_LOGIN_FORM_LOADING:
            return {
                ...state,
                loginFormLoading: action.val
            }
        default:
            return state;
    }
}

export const setUserData = (id, email, username, fio, phone, isAuth) => ({ type: SET_USER_DATA, payload: {id, email, username, fio, phone, isAuth} });
export const setLoginFormLoading = (val) => ({ type: SET_LOGIN_FORM_LOADING, val });

export const getUserData = () => {
    return (dispatch, getState) => {
        api.get(`auth/me`)
            .then((response) => {
                if (response.data.statusCode === 66) {
                    showNotification(response.data.responseMessage, 'danger', true);
                } else {
                    console.log(response);
                    dispatch(setUserData(response.data.id, response.data.email, response.data.username, response.data.fio, response.data.phone, true));
                }
            })
            .catch((error) => {
                // console.log(error)
            })
            .finally(() => {
                // dispatch(itemsLoading(false));
                
            })
    }
};

export const login = ({username, password}) => {
    return (dispatch, getState) => {
        
        dispatch(setLoginFormLoading(true));

        api.post(`auth/login`, {username, password})
            .then((response) => {
                if (response.data.statusCode === 0) {
                    showNotification(response.data.responseMessage, 'danger');
                    dispatch(setLoginFormLoading(false));
                } else {
                    dispatch(setLoginFormLoading(false));
                    dispatch(getUserData());
                    showNotification(response.data.responseMessage, 'success');
                }
            })
            .catch((error) => {
                // console.log(error)
            })
            .finally(() => {
                // dispatch(itemsLoading(false));
                
            })
    }
};

export const logout = () => {
    return (dispatch, getState) => {

        api.get(`auth/logout`)
            .then((response) => {
                console.log(response);
                if (response.data.statusCode === 0) {
                    showNotification(response.data.responseMessage, 'danger');
                } else {
                    dispatch(setUserData(null, null, null, null, null, false));
                    showNotification(response.data.responseMessage, 'success');
                }
            })
            .catch((error) => {
                // console.log(error)
            })
            .finally(() => {
                // dispatch(itemsLoading(false));
            })
    }
};

export default AutReducer;