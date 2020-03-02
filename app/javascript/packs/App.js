import React, { Component } from 'react'
import Productivity from '../components/Productivity'

import { setDays, setDate } from '../redux/actions'
import store from '../redux/store'
import { Provider } from 'react-redux'

window.store = store
window.setDays = setDays
window.setDate = setDate

// stylesheets
import '../../assets/stylesheets/app'
import '../../assets/stylesheets/productivity'
import '../../assets/stylesheets/tasks'
import '../../assets/stylesheets/application'


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

