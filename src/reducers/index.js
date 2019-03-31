import {combineReducers} from 'redux'
import settingsReducer from './settings'
import organizationReducer from './organizations'
import countriesReducer from './countries'
import statesReducer from './states'
import contactsReducer from './contacts'
import notificationsReducer from './notifications'
import searchDataReducer from './searchData'

const rootReducer = combineReducers({
    settings: settingsReducer,
    organizations: organizationReducer,
    countries: countriesReducer,
    states: statesReducer,
    contacts: contactsReducer,
    notifications: notificationsReducer,
    searchData: searchDataReducer,
})

export default rootReducer
