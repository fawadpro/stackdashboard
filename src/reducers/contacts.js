import {
    ADD_CONTACT_LOADING,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAIL,
} from '../constants/actionTypes'
const initialState = {
    contact: null,
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                contact: action.payload,
                loading: false,
            }
        case ADD_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
