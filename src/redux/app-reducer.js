// import {api} from '../api/api';
// import { showNotification } from '../parts/Admin/utils/notifications/notifications';

const SET_DATA_LOADING = 'SET_DATA_LOADING';
const SET_BREADCRUMBS = 'SET_BREADCRUMBS';

const initialState = {
    dataLoading: false,
    breadcrumbs: [],
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_LOADING:
            return {
                ...state,
                dataLoading: action.payload
            }
        case SET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: action.payload
            }
        default:
            return state;
    }
}

export const setDataLoading = bool => ({
    type: SET_DATA_LOADING,
    payload: bool
});

export const setBreadcrumbs = breadcrumbs => ({
    type: SET_BREADCRUMBS,
    payload: breadcrumbs
});



export default AppReducer;