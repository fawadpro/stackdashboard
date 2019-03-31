import axios from 'axios'
import {
    GET_PARTIES,
    ADD_CONTACT_SUCCESS,
    FORM_NOTIFICATION,
    ADD_CONTACT_LOADING,
    ADD_CONTACT_FAIL,
    GET_STATES,
    CREATE_ORGANIZATION,
    GET_PARTY_ROLE_TYPES,
    GET_COUNTRIES,
    PARTIES_LOADING,
    STATES_LOADING,
    COUNTRIES_LOADING,
    PARTY_ROLE_TYPE_LOADING,
    SEARCH_DATA,
} from '../constants/actionTypes'
import {TENANT_API_HOST} from '../constants/defaultValues'
import {
    formSuccessHeader,
    formSuccessContent,
    formErrorContent,
    formErrorHeader,
} from '../util/intlText'

// Get Parties
export const getParties = filterParams => async dispatch => {
    let filter = JSON.stringify(filterParams)
    dispatch(setPartiesLoading())
    axios
        .get(`${TENANT_API_HOST}/parties`, {
            params: {filter},
        })
        .then(res => {
            dispatch({
                type: GET_PARTIES,
                payload: res.data,
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PARTIES,
                payload: [],
            })
        )
}
// Search data
export const searchData = filterParams => async dispatch => {
    let filter = JSON.stringify(filterParams)
    dispatch(setPartiesLoading())
    axios
        .get(`${TENANT_API_HOST}/parties`, {
            params: {filter},
        })
        .then(res => {
            dispatch({
                type: SEARCH_DATA,
                payload: res.data,
            })
        })
        .catch(err =>
            dispatch({
                type: SEARCH_DATA,
                payload: [],
            })
        )
}

// Get STATES
export const getStates = () => async (dispatch, getState) => {
    dispatch(statesLoading())
    axios
        .get(`${TENANT_API_HOST}/states`)
        .then(res => {
            dispatch({
                type: GET_STATES,
                payload: res.data,
            })
        })
        .catch(err =>
            dispatch({
                type: GET_STATES,
                payload: [],
            })
        )
}
//Get Party Role
export const getPartyRoleTypes = () => async (dispatch, getState) => {
    dispatch(partyRoleTypeLoading())
    axios
        .get(`${TENANT_API_HOST}/party-role-types`)
        .then(res => {
            dispatch({
                type: GET_PARTY_ROLE_TYPES,
                payload: res.data,
            })
        })
        .catch(err =>
            dispatch({
                type: GET_PARTY_ROLE_TYPES,
                payload: [],
            })
        )
}
//Get countries
export const getCountries = () => async (dispatch, getState) => {
    dispatch(countriesLoading())
    axios
        .get(`${TENANT_API_HOST}/countries`)
        .then(res => {
            dispatch({
                type: GET_COUNTRIES,
                payload: res.data,
            })
        })
        .catch(err =>
            dispatch({
                type: GET_COUNTRIES,
                payload: [],
            })
        )
}
// Add Contact
export const addContact = data => async dispatch => {
    dispatch(addContactLoading())
    axios
        .post(`${TENANT_API_HOST}/parties`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            dispatch({
                type: ADD_CONTACT_SUCCESS,
                payload: res.data,
            })
            dispatch({
                type: FORM_NOTIFICATION,
                payload: {
                    status: 'success',
                    header: formSuccessHeader,
                    content: [formSuccessContent],
                },
            })
        })
        .catch(err => {
            dispatch({
                type: FORM_NOTIFICATION,
                payload: {
                    status: 'error',
                    header: formErrorHeader,
                    content: [formErrorContent],
                },
            })
            dispatch(addContactFail())
        })
}
// Create Organization
export const createOrganization = data => {
    return {
        type: CREATE_ORGANIZATION,
        payload: data,
    }
}
// Parties Loading
export const setPartiesLoading = () => {
    return {
        type: PARTIES_LOADING,
    }
}
// Add Contact Loading
export const addContactLoading = () => {
    return {
        type: ADD_CONTACT_LOADING,
    }
}
// Get Countries Loading
export const countriesLoading = () => {
    return {
        type: COUNTRIES_LOADING,
    }
}
// Get States Loading
export const statesLoading = () => {
    return {
        type: STATES_LOADING,
    }
}
// Get States Loading
export const partyRoleTypeLoading = () => {
    return {
        type: PARTY_ROLE_TYPE_LOADING,
    }
}
// Add Contact Fail
export const addContactFail = () => {
    return {
        type: ADD_CONTACT_FAIL,
    }
}
