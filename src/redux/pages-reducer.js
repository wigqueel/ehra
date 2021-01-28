import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history'

const PAGES_DATA_SET = 'PAGES_DATA_SET';
const PAGES_DATA_LOADING = 'PAGES_DATA_LOADING';
const PAGES_DATA_ERROR = 'PAGES_DATA_ERROR';

const LANGUAGES_LIST_SET = 'LANGUAGES_LIST_SET';
const LANGUAGES_LIST_LOADING = 'LANGUAGES_LIST_LOADING';
const LANGUAGES_LIST_ERROR = 'LANGUAGES_LIST_ERROR';

const SELECTED_LANGUAGE_SET = 'SELECTED_LANGUAGE_SET';

const initialState = {

    languagesList: [],
    languagesListLoading: false,
    languagesListError: null,

    selectedLanguage: null,

    pagesData: {},
    pagesDataLoading: false,
    pagesDataError: null,
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGES_DATA_SET:
            return {
                ...state,
                pagesData: action.payload
            }
        case PAGES_DATA_LOADING:
            return {
                ...state,
                pagesDataLoading: action.payload
            }
        case PAGES_DATA_ERROR:
            return {
                ...state,
                pagesDataError: action.payload
            }
        case LANGUAGES_LIST_SET:
            return {
                ...state,
                languagesList: action.payload
            }
        case LANGUAGES_LIST_LOADING:
            return {
                ...state,
                languagesListLoading: action.payload
            }
        case LANGUAGES_LIST_ERROR:
            return {
                ...state,
                languagesListError: action.payload
            }
        case SELECTED_LANGUAGE_SET:
            return {
                ...state,
                selectedLanguage: action.payload
            }
        default:
            return state;
    }
}

const pagesDataSet = data => ({
    type: PAGES_DATA_SET,
    payload: data
});

const pagesDataLoading = bool => ({
    type: PAGES_DATA_LOADING,
    payload: bool
});

const pagesDataError = data => ({
    type: PAGES_DATA_ERROR,
    payload: data
});

const languagesListSet = data => ({
    type: LANGUAGES_LIST_SET,
    payload: data
});

const languagesListLoading = bool => ({
    type: LANGUAGES_LIST_LOADING,
    payload: bool
});

const languagesListError = data => ({
    type: LANGUAGES_LIST_ERROR,
    payload: data
});

export const selectedLanguageSet = data => ({
    type: SELECTED_LANGUAGE_SET,
    payload: data
});

export const fetchLanguages = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(languagesListLoading(true));
            let response = await api.get(`languages`);
            dispatch(languagesListSet(response.data.items));
            dispatch(selectedLanguageSet(response.data.items[0]));
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(languagesListLoading(false));
        }
    }
};

export const fetchPagesData = (parentId= null) => {
    return async (dispatch, getState) => {
        try {
            if (!getState().pages?.selectedLanguage) return;
            dispatch(pagesDataLoading(true));
            let response = await api.get(`pages?flt_language_id=${getState().pages?.selectedLanguage?.id}&flt_parent_id=${parentId || 0}`);

            let data = response.data.items;

            let pagesData = getState().pages.pagesData;

            let result = {};
            let childrenIdArr = [];
            for (let item of data) {
                result[item.id] = item;
                item.haveChildren = true;
                childrenIdArr.push(item.id);
            }

            if (parentId) {
                pagesData[parentId].childrenIdArr = childrenIdArr;
            }

            dispatch(pagesDataSet({...pagesData, ...result}));

        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(pagesDataLoading(false));
        }
    }
};

export const removePageChildren = (parentId) => {
    return async (dispatch, getState) => {
        try {
            let pagesData = getState().pages.pagesData;

            pagesData[parentId].childrenIdArr.forEach(el => {
                delete pagesData[el];
            })
            pagesData[parentId].childrenIdArr = undefined;

            dispatch(pagesDataSet({...pagesData}));

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
export default pagesReducer;