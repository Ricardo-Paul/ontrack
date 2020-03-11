import React, { Component } from 'react'
import Productivity from '../components/Productivity'

import { setDays, setDate, addTask } from '../redux/actions'
import store from '../redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from '../pages/Login'
import Signup from '../pages/Signup'

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
import '../../assets/stylesheets/paginate'
import '../../assets/stylesheets/navbar'
import '../../assets/stylesheets/notes'
import '../../assets/stylesheets/queries'
import '../../assets/stylesheets/lessons'
import '../../assets/stylesheets/content'

export default class App extends Component {
    render() {
        return (
            <Provider store={store} >
              <Router>
                <div className="App" >
                  <Route exact path="/" component={Login} />
                  <Route path="/home" component={Productivity}/>
                  <Route path="/signup" component={Signup} />
                 </div>
              </Router>
            </Provider>
        )
    }
}

