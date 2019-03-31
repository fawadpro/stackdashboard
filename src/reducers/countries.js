import {COUNTRIES_LOADING, GET_COUNTRIES} from '../constants/actionTypes'

const initialState = {
    countries: null,
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case COUNTRIES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                loading: false,
            }
        default:
            return state
    }
}
