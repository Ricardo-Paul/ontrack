import { createStore } from 'redux'
import { dayReducer } from './dayReducer'

const store = createStore(dayReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export to window
window.store = store;

export default store;