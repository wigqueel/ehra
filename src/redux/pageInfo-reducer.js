import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history'
import {fetchPagesData} from "./pages-reducer";

const PAGE_INFO_SET = 'PAGE_INFO_SET';
const PAGE_INFO_LOADING = 'PAGE_INFO_LOADING';
const PAGE_INFO_ERROR = 'PAGE_INFO_ERROR';

const PAGES_LIST_SET = 'PAGES_LIST_SET';
const PAGES_LIST_LOADING = 'PAGES_LIST_LOADING';
const PAGES_LIST_ERROR = 'PAGES_LIST_ERROR';

const LANGUAGES_LIST_SET = 'LANGUAGES_LIST_SET';
const LANGUAGES_LIST_LOADING = 'LANGUAGES_LIST_LOADING';
const LANGUAGES_LIST_ERROR = 'LANGUAGES_LIST_ERROR';

const UPDATE_PAGE_LOADING = 'UPDATE_PAGE_LOADING';
const DELETE_PAGE_LOADING = 'DELETE_PAGE_LOADING';

const EDITABLE_SET = 'EDITABLE_SET';

const initialState = {

    pageInfo: null,
    pageInfoLoading: false,
    pageInfoError: null,

    pagesList: [],
    pagesListLoading: false,
    pagesListError: null,

    languagesList: [],
    languagesListLoading: false,
    languagesListError: null,

    updatePageLoading: false,
    deletePageLoading: false,

    editable: false,
}

const pageInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_INFO_SET:
            return {
                ...state,
                pageInfo: action.payload
            }
        case PAGE_INFO_LOADING:
            return {
                ...state,
                pageInfoLoading: action.payload
            }
        case PAGE_INFO_ERROR:
            return {
                ...state,
                pageInfoError: action.payload
            }
        case PAGES_LIST_SET:
            return {
                ...state,
                pagesList: action.payload
            }
        case PAGES_LIST_LOADING:
            return {
                ...state,
                pagesListLoading: action.payload
            }
        case PAGES_LIST_ERROR:
            return {
                ...state,
                pagesListError: action.payload
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
        case UPDATE_PAGE_LOADING:
            return {
                ...state,
                updatePageLoading: action.payload
            }
        case DELETE_PAGE_LOADING:
            return {
                ...state,
                deletePageLoading: action.payload
            }
        case EDITABLE_SET:
            return {
                ...state,
                editable: action.payload
            }
        default:
            return state;
    }
}

export const pageInfoSet = data => ({
    type: PAGE_INFO_SET,
    payload: data
});

const pageInfoLoading = bool => ({
    type: PAGE_INFO_LOADING,
    payload: bool
});

const pageInfoError = data => ({
    type: PAGE_INFO_ERROR,
    payload: data
});

const pagesListSet = data => ({
    type: PAGES_LIST_SET,
    payload: data
});

const pagesListLoading = bool => ({
    type: PAGES_LIST_LOADING,
    payload: bool
});

const pagesListError = data => ({
    type: PAGES_LIST_ERROR,
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

const updatePageLoading = bool => ({
    type: UPDATE_PAGE_LOADING,
    payload: bool
});

const deletePageLoading = bool => ({
    type: DELETE_PAGE_LOADING,
    payload: bool
});

export const editableSet = data => ({
    type: EDITABLE_SET,
    payload: data
});

export const fetchPageInfo = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(pageInfoLoading(true));
            let pageInfoResponse = await api.get(`/pages/view/${id}`);
            dispatch(pageInfoSet(pageInfoResponse.data))
            dispatch(fetchLanguagesList(pageInfoResponse.data.language_id));
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(pageInfoLoading(false));
        }
    }
};

export const fetchPagesList = (language_id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(pagesListLoading(true));
            let pagesListResponse = await api.get(`/pages?flt_language_id=${language_id}`);
            dispatch(pagesListSet(pagesListResponse.data.items))
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(pagesListLoading(false));
        }
    }
};

export const fetchLanguagesList = (currentLangId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(languagesListLoading(true));
            let languagesListResponse = await api.get(`/languages`);
            dispatch(languagesListSet(languagesListResponse.data.items))
            dispatch(fetchPagesList(currentLangId || languagesListResponse.data.items[0].id))
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

export const updatePage = (id, values) => {
    return async (dispatch, getState) => {
        try {
            dispatch(updatePageLoading(true));
            await api.patch(`/pages/utilize/${id}`, {
                name: values.name,
                url: values.url,
                language_id: values.language.value,
                parent_id: values.parent.value,
            });
            history.push("/admiral-admin/pages")
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message.join(), 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(updatePageLoading(false));
        }
    }
};

export const createPage = (values) => {
    return async (dispatch, getState) => {
        try {
            dispatch(updatePageLoading(true));
            await api.post(`/pages/utilize`, {
                name: values.name,
                url: values.url,
                language_id: values.language.value,
                parent_id: values.parent.value,
            });
            history.push("/admiral-admin/pages")
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message.join(), 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(updatePageLoading(false));
        }
    }
};

export const duplicatePage = (values) => {
    return async (dispatch, getState) => {
        try {
            dispatch(updatePageLoading(true));
            await api.post(`/pages/utilize`, {
                name: values.name,
                url: values.url,
                language_id: values.language_id,
                parent_id: values.parent_id,
            });
            dispatch(fetchPagesData());
            history.push("/admiral-admin/pages")
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(updatePageLoading(false));
        }
    }
};

export const deletePage = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(deletePageLoading(true));
            await api.delete(`/pages/delete/${id}`);
            dispatch(fetchPagesData());
            history.push("/admiral-admin/pages");
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(deletePageLoading(false));
        }
    }
};


export default pageInfoReducer;