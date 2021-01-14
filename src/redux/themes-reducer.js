import {api} from '../api/api';
import { showNotification } from '../parts/Admin/utils/notifications/notifications';
// import {setDataLoading} from './app-reducer';

const SET_ITEMS = 'SET_ITEMS';
const SET_ITEM = 'SET_ITEM';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const CHANGE_SORT = 'CHANGE_SORT';
const SET_FILTER_STRING = 'SET_FILTER_STRING';

const initialState = {
    items: null,
    itemsLoading: true,
    totalCount: null,
    item: null,
    currentPage: 1,
    pageSize: 8,
    sortField: 'id',
    sortType: 'sort_desc',
    filterString: '',
}

const themesReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

const setItems = data => ({
    type: SET_ITEMS,
    payload: data
});

const setItem = data => ({
    type: SET_ITEM,
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



export const getItems = (currentPage, pageSize) => {
    return (dispatch, getState) => {
        
        const sortField = getState().themes.sortField;
        const sortType = getState().themes.sortType;
        const filterString = getState().themes.filterString;
        
        if (!currentPage) {
            currentPage = getState().themes.currentPage;
        } else {
            dispatch(setCurrentPage(currentPage));
        }

        if (!pageSize) {
            pageSize = getState().themes.pageSize;
        }

        async function getItemsAsyncFunction(){
                try {
                const response = await api.get(`themes?per_page=${pageSize}&page_number=${currentPage}&sort_field=${sortField}&sort_type=${sortType}${filterString}`);
                    dispatch(setItems(response.data));
                }
                catch(error) {
                    console.log(error)
                }
                finally {
                 // dispatch(itemsLoading(false));
                }
        }
    }
};

export const changeSort = (oldSortField, oldSortType, sortField) => {
    return (dispatch, getState) => {
        dispatch(changeSortActionCreator(oldSortField, oldSortType, sortField));
        dispatch(getItems());
    }
};



export const setActive = (id) => {
    return (dispatch, getState) => {
        async function setActiveAsyncFunction(){
            try{
                const response = await api.get(`themes/activate/${id}`);
                showNotification('Theme was successfully activated', 'success', 'shifted');
                dispatch(getItems());
            }
            catch(error) {
                console.log(error)
            }
            finally {
// dispatch(itemsLoading(false));
            }

        }
    }
};

export const deleteItem = (id) => {
    return (dispatch, getState) => {
        async function deleteItemAsyncFunction(){
            try{
                const response = await api.get(`themes/delete/${id}`);
                dispatch(getItems());
            }
            catch(error) {
                console.log(error)
            }
            finally {
// dispatch(itemsLoading(false));
            }

        }
    }
};

export const getItemData = (id) => {
    return (dispatch, getState) => {

        async function getItemDataAsyncFunction(){
            try{
                const response = await api.get(`themes/view/${id}`);
                dispatch(setItem(response.data));
            }
            catch(error) {
                console.log(error)
            }
            finally {
// dispatch(itemsLoading(false));
            }

        }
    }
};

export const createItem = ({name}) => {
    return (dispatch, getState) => {

        async function createItemAsyncFunction(){
            try{
                const response = await api.get(`themes/utilize`, {name});
                dispatch(getItems());
            }
            catch(error) {
                console.log(error)
            }
            finally {
// dispatch(itemsLoading(false));
            }

        }
    }
};

export const updateItem = ({name, id}) => {
    return (dispatch, getState) => {

        async function updateItemAsyncFunction(){
            try{
                const response = await api.get(`themes/utilize/${id}`, {name});
                dispatch(getItems());
            }
            catch(error) {
                console.log(error)
            }
            finally {
// dispatch(itemsLoading(false));
            }

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
        dispatch(getItems());
    }
};

export default themesReducer;