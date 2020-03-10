import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { CloseModalButton } from './commonStyle';


// redux
import {addTask, setDayId } from '../redux/actions';
class Task extends Component {

    state = {
        title: ''
    }

    closeTask = () => {
		let task = document.querySelector("#task")
		task.style.transform = "scale(0)"
    }
    
    returnTasks(){
        if(this.props.tasks == 0){
            return (<p className="task-empty" >Please add a new task </p>)
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
        const submit = (e) => {
            e.preventDefault()
            const { dayId, addTask } = this.props;

            const data = {
                "task":{
                    "title": this.state.title,
                    "done": "false",
                    "day_id": dayId
                }
            }
            axios.post('/api/tasks', data)
             .then(res => {
                addTask(res.data.task)
             })

             this.setState({
                 title: ""
             })
        }

        const handleTitleChange = (e) => {
            this.setState({
                title: e.target.value
            })
        }

        return (
            <div className="col-md-6 col-xs-10" id="task">
                Day id here {this.props.dayId}
                <CloseModalButton onClick={this.closeTask} >
                    x
                </CloseModalButton>
                <div className="form-input">
                    <form onSubmit={submit}>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Add a Task..."
                        onChange={handleTitleChange}
                        value={this.state.title}
                        />
                    <button 
                        className="add" 
                        >
                        ADD 
                    </button>
                    </form>
                </div>
                {this.returnTasks()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        dayId: state.dayId,
        tasks: state.tasks
})

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => dispatch(addTask(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)

// TODO Day.find_by(chosen_date: "2020-03-03")