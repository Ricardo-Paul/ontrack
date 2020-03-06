import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'
import { dayReducer } from './dayReducer'

// const middlewares = [thunk]

const composedEnhancers = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const store = createStore(dayReducer, composedEnhancers)

// export to window
window.store = store;

export default store;