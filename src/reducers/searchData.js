import {
    SEARCH_DATA,
    SEARCH_LOADING
} from '../constants/actionTypes'

const initialState = {
    searchData: [],
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_DATA:
            return {...state, searchData: action.payload,loading:false}
        case SEARCH_LOADING:
            return {
                ...state,
                loading: true,
            }

        default:
            return state
    }
}
