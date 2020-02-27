import React, { Component } from 'react'
import axios from 'axios'

export default class Task extends Component {
    componentDidMount(){
    }
    render() {
        return (
            <div id="task">
                {/* Day id here {this.props.id} */}
                <span className="closeTask" onClick={this.props.closeTask} > X </span>
                <input className="input" type="text" placeholder="Add a Task..." />
                <button className="add"> ADD </button>
                <ul>
                    <li>Review Bootstrap Grid <span>D</span> </li>
                    <li>Start with MongoDB <span>D</span>  </li>
                </ul>
            </div>
        )
    }
}

