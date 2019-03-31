import {STATES_LOADING, GET_STATES} from '../constants/actionTypes'

const initialState = {
    states: null,
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case STATES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_STATES:
            return {
                ...state,
                states: action.payload,
                loading: false,
            }
        default:
            return state
    }
}
