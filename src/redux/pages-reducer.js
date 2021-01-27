import {api} from '../api/api';
import {showNotification} from '../parts/Admin/utils/notifications/notifications';
import history from '../history'

const PAGES_DATA_SET = 'PAGES_DATA_SET';

const initialState = {
    pagesData: {
        1: {
            id: 1,
            name: "UA",
            haveChildren: true,
        },
        2: {
            id: 2,
            name: "EN",
            haveChildren: true,
        }
    }
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGES_DATA_SET:
            return {
                ...state,
                pagesData: action.payload
            }
        default:
            return state;
    }
}

const pagesDataSet = data => ({
    type: PAGES_DATA_SET,
    payload: data
});

export const fetchPagesData = (parentId) => {
    return async (dispatch, getState) => {
        try {
            // let response = await api.get(``);
            // dispatch(pagesDataSet(response.data));

            let pagesData = getState().pages.pagesData;

            let data = [
                {
                    id: 3,
                    name: "Головна сторінка",
                    haveChildren: true,
                    parent_id: 1
                },
                {
                    id: 4,
                    name: "Про нас",
                    haveChildren: false,
                    parent_id: 1
                },
            ];

            let result = {};
            let childrenIdArr = [];
            for (let item of data) {
                result[item.id] = item;
                childrenIdArr.push(item.id);
            }

            pagesData[parentId].childrenIdArr = childrenIdArr;
            dispatch(pagesDataSet({...pagesData, ...result}));

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