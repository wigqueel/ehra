import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history';

export const SET_ITEMS = `SET_ITEMS`;
export const SET_ITEM = 'SET_ITEM';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const CHANGE_SORT = 'CHANGE_SORT';
export const SET_FILTER_STRING = 'SET_FILTER_STRING';


function makeActionCreator(type, ...argNames) {
    return function(entity, ...args) {
      let action = {type: `${type}_${entity}`} 
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      })
      return action
    }
  }

export const setItems = makeActionCreator(SET_ITEMS,  'data')
export const setItem =  makeActionCreator(SET_ITEM, 'data')
export const setPageSize =  makeActionCreator(SET_PAGE_SIZE, 'pageSize')
export const setFilterString =  makeActionCreator(SET_FILTER_STRING, 'filterString')
export const setCurrentPage = makeActionCreator(SET_CURRENT_PAGE, 'currentPage')
export const changeSortActionCreator = makeActionCreator(CHANGE_SORT, 'oldSortField', 'oldSortType', 'sortField' )


export const updatePageSize = (entity,pageSize) => {
  return async (dispatch, getState) => {
      dispatch(setPageSize(entity, pageSize))
      dispatch(setCurrentPage(entity,1))
  }
};

export const changeSort = (entity, oldSortField, oldSortType, sortField) => {
  return (dispatch) => {
      dispatch(changeSortActionCreator(entity, oldSortField, oldSortType, sortField));
      dispatch(getItems(entity.toLowerCase()));
  }
};

export const getItems = (entity, currentPage, pageSize) => {
    
  return async (dispatch, getState) => {
      const sortField = getState().themes.sortField;
      const sortType = getState().themes.sortType;
      const filterString = getState().themes.filterString;

      if (!currentPage) {
          currentPage = getState().themes.currentPage;
      } else {
          dispatch(setCurrentPage(entity.toUpperCase(), currentPage));
      }

      if (!pageSize) {
          pageSize = getState().themes.pageSize;
      }

      try {
          let response = await api.get(`${entity}?per_page=${pageSize}&page_number=${currentPage}&sort_field=${sortField}&sort_type=${sortType}${filterString}`);
          dispatch(setItems(entity.toUpperCase(), response.data));        
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

export const getItemData = (entity, id) => {
  return async (dispatch) => {
      try {
          let response = await api.get(`${entity}/view/${id}`);
          dispatch(setItem(entity.toUpperCase(), response.data));
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

export const setActive = (entity,id) => {
  return async (dispatch) => {
      try {
          let response = await api.patch(`${entity}/set-active/${id}`);
          showNotification(response.data.message, 'success', 'shifted');
          dispatch(getItems(entity));
          dispatch(getItemData(entity, id));
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

export const createItem = (entity,{name}) => {
  return async (dispatch) => {
      try {
          let response = await api.post(`${entity}/utilize`, {name});

          dispatch(getItems(entity));
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

export const deleteItem = (entity, id) => {
  return async (dispatch) => {
      try {
          let response = await api.delete(`${entity}/delete/${id}`);
          showNotification(response.data.message, 'success', 'shifted');
          dispatch(getItems(entity));
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

export const updateItem = (entity,{name, id, ...themeParams}) => {
  return async (dispatch) => {
      try {
          let response = await api.patch(`${entity}/utilize/${id}`, {name, content: themeParams});

          dispatch(getItems(entity));
          dispatch(getItemData(entity,id));
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

export const applyFilter = (entity,values) => {
  return (dispatch) => {
      let filterString = '';

      if (values) {
          let itemKeys = Object.keys(values);
          let itemValues = Object.values(values);

          for (let i = 0; i < itemKeys.length; i++) {
              filterString += `&flt_${itemKeys[i]}=${itemValues[i]}`;
          }
      }

      dispatch(setFilterString(entity.toUpperCase(), filterString));
      dispatch(getItems(entity));
  }
};