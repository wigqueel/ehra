// const SET_ITEMS = `SET_ITEMS_${ENTITY}`;
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEM = 'SET_ITEM';
export const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const CHANGE_SORT = 'CHANGE_SORT';
export const SET_FILTER_STRING = 'SET_FILTER_STRING';


function makeActionCreator(type, ...argNames) {
   
    return function(...args) {
      let action = { type }
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      })
      
      return action
    }
  }

export const setItems =  makeActionCreator(SET_ITEMS, 'data')
export const setItem =  makeActionCreator(SET_ITEM, 'data')
export const setPageSize =  makeActionCreator(SET_PAGE_SIZE, 'pageSize')
export const setFilterString =  makeActionCreator(SET_FILTER_STRING, 'filterString')
export const setCurrentPage = makeActionCreator(SET_CURRENT_PAGE, 'currentPage')
export const changeSortActionCreator = makeActionCreator(CHANGE_SORT, 'oldSortField', 'oldSortType', 'sortField' )





