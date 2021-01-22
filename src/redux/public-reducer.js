import {api} from '../api/api';
import { showNotification } from '../parts/Admin/utils/notifications/notifications';

const SET_ACTIVE_THEME = 'SET_ACTIVE_THEME';

const initialState = {
    activeThemeId: null,
    activeThemeName: null,
    activeThemeContent: null,
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

export default publicReducer;