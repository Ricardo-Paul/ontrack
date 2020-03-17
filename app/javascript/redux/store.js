import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'
import { dayReducer } from './dayReducer'

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composedEnhancers = compose(applyMiddleware(thunk))

const store = createStore(dayReducer, composedEnhancers)

// export to window
window.store = store;

export default store;