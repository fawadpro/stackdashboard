import {
    CREATE_ORGANIZATION,
    PARTIES_LOADING,
    GET_PARTIES,
    GET_PARTY_ROLE_TYPES,
} from '../constants/actionTypes'

const initialState = {
    parties: [],
    partyRoleTypes: null,
    loading: false,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_ORGANIZATION:
            return {...state, orgnization: action.payload}
        case PARTIES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_PARTIES:
            return {
                ...state,
                parties: action.payload,
                loading: false,
            }
        case GET_PARTY_ROLE_TYPES:
            return {
                ...state,
                partyRoleTypes: action.payload,
                loading: false,
            }
        default:
            return state
    }
}
