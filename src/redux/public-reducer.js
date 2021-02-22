import {api} from '../api/api';
import { showNotification } from '../parts/Admin/utils/notifications/notifications';

const SET_ACTIVE_THEME = 'SET_ACTIVE_THEME';
const SET_PAGE_DATA = 'SET_PAGE_DATA';

const initialState = {
    activeThemeId: null,
    activeThemeName: null,
    activeThemeContent: null,
    pageData: null,
}

const publicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_THEME:
            return {
                ...state,
                activeThemeId: action.id,
                activeThemeName: action.name,
                activeThemeContent: action.content,
            }
        case SET_PAGE_DATA:
            return {
                ...state,
                pageData: action.payload,
            }
        default:
            return state;
    }
}

const setActiveTheme = (id, name, content) => ({ 
    type: SET_ACTIVE_THEME, 
    id,
    name,
    content
});

const setPageData = (payload) => ({ 
    type: SET_PAGE_DATA, 
    payload
});

export const getActiveTheme = () => {
    return async (dispatch) => {

        try {
            let response = await api.get(`/themes/get-active`);
            
            if (response.data.statusCode === 1) {
                dispatch(setActiveTheme(response.data.id, response.data.name, response.data.content));
            } else {
                // showNotification(response.data.responseMessage, 'danger', 'shifted');
            }
        } catch (error) {
            // showNotification('Some error occured', 'danger', 'shifted');
            console.log(error)
        } finally {
            
        }

    }
};

export const getPageByUrl = (url) => {
    return async (dispatch) => {
        try {
            let response = await api.get(`/pages/view-by-url${url}`);
            dispatch(setPageData(response.data));
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {

        }

    }
};

export default publicReducer;