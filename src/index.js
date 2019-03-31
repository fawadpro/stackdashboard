import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import {createLogger} from 'redux-logger'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import Routes from './components/routes/routes'

// const store = createStore(reducer /* preloadedState, */)
const middleware = [thunk]
const defaultState = {}

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
const enhancer = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
const store = createStore(reducer, defaultState, enhancer)

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker()
