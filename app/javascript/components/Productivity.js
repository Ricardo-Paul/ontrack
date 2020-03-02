import React, { Component } from 'react'
import axios from 'axios';
import Task from './Task';

import { connect } from 'react-redux';
import { setDays } from '../redux/actions';


// imports
import helpers from '../modules/utils';
const { extractDate } = helpers;


class Productivity extends Component {
    extractDate = helpers.extractDate;

    state = {
        date: '',
        dayId: '',

        tasks: []
    }

    fetchTask(day_id){
        axios.get(`/api/getTasks?day_id=${day_id}`)
            .then(res => {
                this.setState({
                    tasks: res.data
                })
            })
    }

    toggleTaskModal(s, o, d){
        let task = document.querySelector("#task")
        task.style.transform = s
    }

    componentDidMount(){
        axios.get('/api/days')
            .then(res => {
                // let dayNumber = extractDate(res.data[1].chosen_date);
                this.props.setDays(res.data)
               console.log("data",res.data[1], typeof(res.data))
               console.log("props", this.props.days)
                this.setState({
                    days: res.data
                    // date: dayNumber
                })
                console.log(this.state.days, typeof(this.state.days))
            })
    }

    render() {
        // console.log(this.props.days)
        const openTasks = (e) => {
            this.setState({
                dayId: e.target.id
            })
            this.fetchTask(e.target.id)
            this.toggleTaskModal("scale(1)", .5, "block")
        }

        const closeTask = () => {
            this.toggleTaskModal("scale(0)", 0, "none")
        }

        const toggleDone = (id) => {
            axios.get(`/api/toggleDone?id=${id}`)
            .then(res => {
            })

            let tasks = this.state.tasks;
            let mutatedTask = tasks.find(t => t.id == id)
            mutatedTask.done = !mutatedTask.done
            this.setState({
                tasks: tasks
            })
        }

        const submit = () => {
            const data = {
                "task":{
                    "title": "Add redux now",
                    "done": "false",
                    "day_id": `${this.state.dayId}`
                }
            }
            axios.post('/api/tasks', data)
             .then(res => {
                console.log(res.data)
             })
        }

        return (
            <div className="productivity">
                <div className="overlay"></div>

                <Task 
                    day_id={this.state.dayId} 
                    closeTask={closeTask} 
                    tasks={this.state.tasks} 
                    toggleDone={toggleDone}
                    submit={submit}
                />

                {this.props.days.map(day => {
                    return(
                        <div className="date-wrapper" key={day.id}>
                        <div className="date">
                            <span> March </span>
                            {this.extractDate(day.chosen_date)}
                        </div>
                        <div className="icons">
                            <span id={day.id} onClick={(e) => openTasks(e)} >T</span>
                            <span>N</span>
                            <span>L</span>
                        </div>
                    </div>
                    )
                })} 
                {this.props.days.length === 0 ? (<h5>No day</h5>) : null}
                date from store: {this.props.date} <br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        days: state.days,
        date: state.date
    }
}

const mapDispatchToProps = (dispatch) => ({
        setDays: (days) => dispatch(setDays(days))
})

export default connect(mapStateToProps, mapDispatchToProps)(Productivity);