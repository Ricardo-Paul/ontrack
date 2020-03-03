import React, { Component } from 'react'
import Productivity from '../components/Productivity'

import { setDays, setDate, addTask } from '../redux/actions'
import store from '../redux/store'
import { Provider } from 'react-redux'

window.store = store
window.setDays = setDays
window.setDate = setDate
window.addTask = addTask
// stylesheets
import '../../assets/stylesheets/app'
import '../../assets/stylesheets/productivity'
import '../../assets/stylesheets/tasks'
import '../../assets/stylesheets/application'
import '../../assets/stylesheets/date'



export default class App extends Component {
    render() {
        return (
            <Provider store={store} >
              <div className="App" >
                <Productivity />
              </div>
            </Provider>
        )
    }
}

