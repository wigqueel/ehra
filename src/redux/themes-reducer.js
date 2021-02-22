import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history';
import {setItems, setItem, setCurrentPage, changeSortActionCreator, setFilterString, setPageSize } from "./actions";

const ENTITY = 'themes';
const ENTITY_UPPER_CASE = ENTITY.toUpperCase();

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

const themesReducer = (state = initialState, action) => {
    switch (action.type) {
        case `SET_ITEMS_${ENTITY_UPPER_CASE}`:
            return {
                ...state,
                items: action.data.items,
                totalCount: action.data.totalCount
            }
        case `SET_ITEM_${ENTITY_UPPER_CASE}`:
            return {
                ...state,
                item: action.data
            }
        case `SET_CURRENT_PAGE_${ENTITY_UPPER_CASE}`:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case `CHANGE_SORT_${ENTITY_UPPER_CASE}`:
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
        case `SET_FILTER_STRING_${ENTITY_UPPER_CASE}`:
            return {
                ...state,
                filterString: action.filterString
            }
        case `SET_PAGE_SIZE_${ENTITY_UPPER_CASE}`:
            return {
                ...state,
                pageSize: action.pageSize
            }
        default:
            return state;
    }
}


export const getItems = (currentPage, pageSize) => {
    
    return async (dispatch, getState) => {
        const sortField = getState().themes.sortField;
        const sortType = getState().themes.sortType;
        const filterString = getState().themes.filterString;

        if (!currentPage) {
            currentPage = getState().themes.currentPage;
        } else {
            dispatch(setCurrentPage(ENTITY_UPPER_CASE, currentPage));
        }

        if (!pageSize) {
            pageSize = getState().themes.pageSize;
        }

        try {
            let response = await api.get(`${ENTITY}?per_page=${pageSize}&page_number=${currentPage}&sort_field=${sortField}&sort_type=${sortType}${filterString}`);
            dispatch(setItems(ENTITY_UPPER_CASE, response.data));        
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

export const changeSort = (oldSortField, oldSortType, sortField) => {
    return (dispatch) => {
        dispatch(changeSortActionCreator(ENTITY_UPPER_CASE, oldSortField, oldSortType, sortField));
        dispatch(getItems());
    }
  };

  export const updatePageSize = (pageSize) => {
    return async (dispatch, getState) => {
        dispatch(setPageSize(ENTITY_UPPER_CASE, pageSize))
        dispatch(setCurrentPage(ENTITY_UPPER_CASE,1))
    }
  };

export const setActive = (id) => {
    return async (dispatch) => {
        try {
            let response = await api.patch(`${ENTITY}/set-active/${id}`);
            showNotification(response.data.message, 'success', 'shifted');
            dispatch(getItems());
            dispatch(getItemData(id));
            history.push('/admiral-admin/themes');
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
    return async (dispatch) => {
        try {
            let response = await api.delete(`${ENTITY}/delete/${id}`);
            showNotification(response.data.message, 'success', 'shifted');
            dispatch(getItems());
            history.push('/admiral-admin/themes');
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
            dispatch(setItem(ENTITY_UPPER_CASE, response.data));
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
    return async (dispatch) => {
        try {
            let response = await api.post(`${ENTITY}/utilize`, {name});

            dispatch(getItems());
            showNotification(response.data.message, 'success', 'shifted');
            history.push('/admiral-admin/themes');
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

export const updateItem = ({name, id, ...themeParams}) => {
    return async (dispatch) => {
        try {
            let response = await api.patch(`${ENTITY}/utilize/${id}`, {name, content: themeParams});

            dispatch(getItems());
            dispatch(getItemData(id));
            showNotification(response.data.message, 'success', 'shifted');
            history.push('/admiral-admin/themes');
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
    return (dispatch) => {
        let filterString = '';

        if (values) {
            let itemKeys = Object.keys(values);
            let itemValues = Object.values(values);

            for (let i = 0; i < itemKeys.length; i++) {
                filterString += `&flt_${itemKeys[i]}=${itemValues[i]}`;
            }
        }

        dispatch(setFilterString(ENTITY_UPPER_CASE, filterString));
        dispatch(getItems());
    }
};

export default themesReducer;