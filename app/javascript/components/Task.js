import React, { Component } from 'react'
import axios from 'axios'

export default class Task extends Component {

    returnTasks(){
        if(this.props.tasks == 0){
            return (<h5> No Task Yet </h5>)
        }
        return (
            <ul>
                {this.props.tasks.map( task => {
                   return (<li key={task.id} >{task.title} <span> <input readOnly onClick={() => this.props.toggleDone(task.id)} type="checkbox" checked={task.done} /> </span> </li>)
                })}
            </ul>
        )
    }

    render() {
        return (
            <div id="task">
                Day id here {this.props.day_id}
                <span className="closeTask" onClick={this.props.closeTask} > X </span>
                <div className="form-input">
                    <input className="input" type="text" placeholder="Add a Task..." />
                    <button className="add"> ADD </button>
                </div>
                {this.returnTasks()}
            </div>
        )
    }
}
