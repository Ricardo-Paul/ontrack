import React, { Component } from 'react'
import Productivity from '../components/Productivity'

// stylesheets
import '../../assets/stylesheets/app'
import '../../assets/stylesheets/productivity'
import '../../assets/stylesheets/tasks'
import '../../assets/stylesheets/application'


export default class App extends Component {
    render() {
        return (
            <div className="App" >
                <Productivity />
            </div>
        )
    }
}
