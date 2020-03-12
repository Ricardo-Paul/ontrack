import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { CloseModalButton } from './commonStyle';


// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

// redux
import {addTask, setDayId, updateTask, setEdit } from '../redux/actions';
class Task extends Component {

    state = {
        title: '',
        task_id: ''
    }

    closeTask = () => {
		let task = document.querySelector("#task")
		task.style.transform = "scale(0)"
    }

    editTask = (id) => {
        const { setEdit, tasks, editing } = this.props;
        setEdit();

        let addButton = document.querySelector(".add")
        addButton.classList.add("gbackGround")

        let temp = tasks.find( t => t.id === id)
        const { title} = temp;
        this.setState({
            title: title,
            task_id: id
        })
    }
    
    returnTasks(){
        if(this.props.tasks == 0){
            return (<p className="task-empty" >Please add a new task </p>)
        }
        return (
            <ul>
                {this.props.tasks.map( task => {
                   return (<li key={task.id}>
                       <span>
                         {task.title}
                       </span>
                      
                      <div className="right-buttons">
                      <span>
                            <input readOnly onClick={() => this.props.toggleDone(task.id)} type="checkbox" checked={task.done} />
                        </span> 
                      
                        <span className="edit" onClick={() => this.editTask(task.id)} >
                           <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                      </div>
                        </li>)
                })}
            </ul>
        )
    }

    render() {
        const submit = (e) => {
            e.preventDefault()
            const { dayId, addTask, editing, updateTask } = this.props;

            if (editing){
                const { task_id, title } = this.state;
                updateTask(task_id, title, dayId)
                this.setState({
                    title: ''
                })
            } else {
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

            let addButton = document.querySelector(".add")
            addButton.classList.remove("gbackGround")
        }

        const handleTitleChange = (e) => {
            this.setState({
                title: e.target.value
            })
        }

        const getDateString = (id) => {
            const { days } = this.props;
            let day = days.find( d => d.id == id)
            let date = new Date(day.chosen_date).toUTCString()
            let dateString = date.split(" ").slice(0, 4).join(" ")

            return dateString
        }

        return (
            <div className="col-md-6 col-xs-10" id="task">

                <div className="task-header">
                    {this.props.day_id && 
                    <p>
                        Tasks assigned on
                        <span> {getDateString(this.props.day_id)} </span>
                    </p>
                    }
                </div>
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
                        {this.props.editing ? "EDIT" : "ADD"}
                    </button>
                    </form>
                </div>
                <hr />
                {this.returnTasks()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        dayId: state.dayId,
        tasks: state.tasks,
        editing: state.editing,
        days: state.days

})

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => dispatch(addTask(task)),
        updateTask: (task_id, title,dayId ) => dispatch(updateTask(task_id, title, dayId)),
        setEdit: () => dispatch(setEdit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)

// TODO Day.find_by(chosen_date: "2020-03-03")