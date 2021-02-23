const ENTITY = 'languages';
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

const languagesReducer = (state = initialState, action) => {
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


export default languagesReducer;