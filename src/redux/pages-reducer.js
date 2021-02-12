import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history'
import {setCurrentPage, setItems as setPagesTableItems} from "./pages-table-reducer";

const PAGES_DATA_SET = 'PAGES_DATA_SET';
const PAGES_DATA_LOADING = 'PAGES_DATA_LOADING';
const PAGES_DATA_ERROR = 'PAGES_DATA_ERROR';

const LANGUAGES_LIST_SET = 'LANGUAGES_LIST_SET';
const LANGUAGES_LIST_LOADING = 'LANGUAGES_LIST_LOADING';
const LANGUAGES_LIST_ERROR = 'LANGUAGES_LIST_ERROR';

const SELECTED_LANGUAGE_SET = 'SELECTED_LANGUAGE_SET';

const PARENT_LOADING_ID = 'PARENT_LOADING_ID';
const ACTIVE_PAGE_ID = 'ACTIVE_PAGE_ID';

const initialState = {

    languagesList: [],
    languagesListLoading: false,
    languagesListError: null,

    selectedLanguage: null,

    pagesData: [],
    pagesDataLoading: false,
    pagesDataError: null,

    parentLoadingId: null,
    activePageId: null,
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
        case PARENT_LOADING_ID:
            return {
                ...state,
                parentLoadingId: action.payload
            }
        case ACTIVE_PAGE_ID:
            return {
                ...state,
                activePageId: action.payload
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

const parentLoadingId = data => ({
    type: PARENT_LOADING_ID,
    payload: data
});

export const setActivePageId = data => ({
    type: ACTIVE_PAGE_ID,
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

export const pagesDataUpdate = (items,item) => {
    return async (dispatch, getState) => {
        try {
            let prevParentId = item.parent_id;
            let parentId = "0";
            searchParentId(items);
            function searchParentId(arr) {
                arr.forEach(i => {
                    if (i.children) {
                        if (i.children.find(el => el.id+"" === item.id+"")) {
                            parentId = i.id;
                        } else {
                            searchParentId(i.children);
                        }
                    }
                });
            }
            await api.patch(`pages/utilize/${item.id}`, {parent_id: parentId});

            let newItemsList = [...items];
            addHasChildProp(newItemsList);
            function addHasChildProp(arr) {
                arr.forEach(i => {
                    if (i.children) {
                        if (i.id+"" === parentId+"") {
                            i.hasChild = true
                        }
                        if (i.id+"" === prevParentId+"") {
                           if (!i.children.length) {
                               i.hasChild = false
                           }
                        }
                        addHasChildProp(i.children);
                    }
                });
            }
            dispatch(pagesDataSet([...newItemsList]));

            dispatch(fetchPagesData(parentId));
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

export const fetchPagesData = (parentId= "0", currentPage, pageSize) => {
    return async (dispatch, getState) => {
        try {
            dispatch(parentLoadingId(parentId));
            if (!getState().pages?.selectedLanguage) return;
            dispatch(pagesDataLoading(true));

            const sortField = getState().pagesTable.sortField;
            const sortType = getState().pagesTable.sortType;
            const filterString = getState().pagesTable.filterString;

            if (!currentPage) {
                currentPage = getState().pagesTable.currentPage;
            } else {
                dispatch(setCurrentPage(currentPage));
            }

            if (!pageSize) {
                pageSize = getState().pagesTable.pageSize;
            }

            let response = await api.get(`pages?flt_language_id=${getState().pages?.selectedLanguage?.id}&flt_parent_id=${parentId}&per_page=${pageSize}&page_number=${currentPage}&sort_field=${sortField}&sort_type=${sortType}${filterString}`);
            let data = response.data.items;
            dispatch(setPagesTableItems(response.data));

            dispatch(setActivePageId(parentId));
            if (parentId === "0") {
                dispatch(pagesDataSet(data));
            } else {
                const newPagesData = getState().pages.pagesData;
                function formatData(arr) {
                    arr.forEach(i => {
                        if(i.id === parentId) {
                            i.children = data
                        } else {
                            if (i.children) {
                                formatData(i.children)
                            }
                        }
                    });
                }
                formatData(newPagesData);
                dispatch(pagesDataSet([...newPagesData]));
            }

        } catch (error) {
            if (parentId === "0") {
                dispatch(pagesDataSet([]));
            }
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
            dispatch(pagesDataLoading(false));
            setTimeout(function () {
                dispatch(parentLoadingId(null));
            },300)

        }
    }
};

export const hidePageChildren = (parentId) => {
    return async (dispatch, getState) => {
        try {
            const newPagesData = getState().pages.pagesData;
            function formatData(arr) {
                arr.forEach(i => {
                    if(i.id === parentId) {
                        i.children = undefined;
                    } else {
                        if (i.children) {
                            formatData(i.children)
                        }
                    }
                });
            }
            formatData(newPagesData);
            dispatch(pagesDataSet([...newPagesData]));

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