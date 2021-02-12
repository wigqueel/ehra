import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history'
import {fetchPagesData} from "./pages-reducer";

const SET_ITEMS = 'SET_ITEMS';
const SET_ITEM = 'SET_ITEM';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const CHANGE_SORT = 'CHANGE_SORT';
const SET_FILTER_STRING = 'SET_FILTER_STRING';

const ENTITY = 'pages';

const initialState = {
    items: null,
    itemsLoading: true,
    totalCount: null,
    item: null,
    currentPage: 1,
    pageSize: '8',
    sortField: 'id',
    sortType: 'sort_desc',
    filterString: '',
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.totalCount
            }
        case SET_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case CHANGE_SORT:
            let newSortType = '';

            if (action.oldSortField === action.sortField) {
                if (action.oldSortType === 'sort_asc') {
                    newSortType = 'sort_desc';
                } else {
                    newSortType = 'sort_asc';
                }
            } else {
                newSortType = 'sort_desc';
            }

            return {
                ...state,
                sortField: action.sortField,
                sortType: newSortType,
            }
        case SET_FILTER_STRING:
            return {
                ...state,
                filterString: action.payload
            }
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload
            }
        default:
            return state;
    }
}

export const setItems = data => ({
    type: SET_ITEMS,
    payload: data
});

const setItem = data => ({
    type: SET_ITEM,
    payload: data
});

const setPageSize = data => ({
    type: SET_PAGE_SIZE,
    payload: data
});

const setFilterString = (filterString) => ({
    type: SET_FILTER_STRING,
    payload: filterString
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
});

export const changeSortActionCreator = (oldSortField, oldSortType, sortField) => ({
    type: CHANGE_SORT,
    oldSortField,
    oldSortType,
    sortField
});

export const updatePageSize = (pageSize) => {
    return async (dispatch, getState) => {
        dispatch(setPageSize(pageSize))
        dispatch(setCurrentPage(1))
    }
};

// export const getItems = (currentPage, pageSize) => {
//     return async (dispatch, getState) => {
//
//         const sortField = getState().pagesTable.sortField;
//         const sortType = getState().pagesTable.sortType;
//         const filterString = getState().pagesTable.filterString;
//
//         if (!currentPage) {
//             currentPage = getState().pagesTable.currentPage;
//         } else {
//             dispatch(setCurrentPage(currentPage));
//         }
//
//         if (!pageSize) {
//             pageSize = getState().pagesTable.pageSize;
//         }
//
//         try {
//             let response = await api.get(`${ENTITY}?per_page=${pageSize}&page_number=${currentPage}&sort_field=${sortField}&sort_type=${sortType}${filterString}`);
//             dispatch(setItems(response.data));
//         } catch (error) {
//             if (error.response?.data?.message) {
//                 showNotification(error.response.data.message, 'danger', 'shifted');
//             } else {
//                 showNotification('Some error occurred', 'danger', 'shifted');
//             }
//             console.log(error)
//         } finally {
//
//         }
//     }
// };

export const changeSort = (oldSortField, oldSortType, sortField) => {
    return (dispatch, getState) => {
        dispatch(changeSortActionCreator(oldSortField, oldSortType, sortField));
        // dispatch(getItems());
        dispatch(fetchPagesData(getState().pages.activePageId));
    }
};

export const setActive = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await api.patch(`${ENTITY}/activate/${id}`);
            showNotification(response.data.message, 'success', 'shifted');
            // dispatch(getItems());
            dispatch(fetchPagesData(getState().pages.activePageId));
            history.push('/admiral-admin/pages');
        } catch (error) {
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
        } finally {

        }

    }
};

export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        try {
            let response = await api.delete(`${ENTITY}/delete/${id}`);
            showNotification(response.data.message, 'success', 'shifted');
            // dispatch(getItems());
            dispatch(fetchPagesData(getState().pages.activePageId));
            history.push('/admiral-admin/pages');
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

export const getItemData = (id) => {
    return async (dispatch) => {
        try {
            let response = await api.get(`${ENTITY}/view/${id}`);
            dispatch(setItem(response.data));
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

export const createItem = ({name}) => {
    return async (dispatch, getState) => {
        try {
            let response = await api.post(`${ENTITY}/utilize`, {name});

            // dispatch(getItems());
            dispatch(fetchPagesData(getState().pages.activePageId));
            showNotification(response.data.message, 'success', 'shifted');
            history.push('/admiral-admin/pages');
        } catch (error) {
            if (Array.isArray(error.response?.data?.message)) {
                let message = '';
                error.response.data.message.map(m => {
                    message += `${m} `;
                });
                showNotification(message, 'danger', 'shifted');
            } else if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {

        }
    }
};

export const updateItem = ({name, id}) => {
    return async (dispatch, getState) => {
        try {
            let response = await api.patch(`${ENTITY}/utilize/${id}`, {name});

            // dispatch(getItems());
            dispatch(fetchPagesData(getState().pages.activePageId));
            showNotification(response.data.message, 'success', 'shifted');
            history.push('/admiral-admin/pages');
        } catch (error) {
            if (Array.isArray(error.response?.data?.message)) {
                let message = '';
                error.response.data.message.map(m => {
                    message += `${m} `;
                });
                showNotification(message, 'danger', 'shifted');
            } else if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'danger', 'shifted');
            } else {
                showNotification('Some error occurred', 'danger', 'shifted');
            }
            console.log(error)
        } finally {
        }
    }
};

export const applyFilter = (values) => {
    return (dispatch, getState) => {
        let filterString = '';

        if (values) {
            let itemKeys = Object.keys(values);
            let itemValues = Object.values(values);

            for (let i = 0; i < itemKeys.length; i++) {
                filterString += `&flt_${itemKeys[i]}=${itemValues[i]}`;
            }
        }

        dispatch(setFilterString(filterString));
        // dispatch(getItems());
        dispatch(fetchPagesData(getState().pages.activePageId));
    }
};

export default pagesReducer;