import React, { Component } from 'react'
import axios from 'axios';
import Task from './Task';
import Date from './Date';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faListAlt, faStick } from '@fortawesome/free-solid-svg-icons'

// Spinner
import { Spinner } from './Spinner';


import { connect } from 'react-redux';
import { setDays, setTasks, setDayId, setLoading } from '../redux/actions';


// imports
import helpers from '../modules/utils';
const { extractDate, extractMonth } = helpers;


class Productivity extends Component {
    extractDate = helpers.extractDate;
    extractMonth = helpers.extractMonth;
    state = {
        dayId: ''
    }

    fetchTask(day_id){
        axios.get(`/api/getTasks?day_id=${day_id}`)
            .then(res => {
                this.props.setTasks(res.data)
            })
    }

    toggleTaskModal(s, o, d){
        let task = document.querySelector("#task")
        task.style.transform = s
    }

    componentDidMount(){
        this.props.setLoading()
        axios.get('/api/days')
            .then(res => {
                let days = res.data.reverse().slice(-5)
                setTimeout(() => {
                    this.props.setDays(days)
                }, 900)
            })
    }

    render() {
        const {setTasks, setDayId} = this.props;

        const openTasks = (e) => {
            setDayId(e.target.id)
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

            let tasks = this.props.tasks;
            let mutatedTask = tasks.find(t => t.id == id)
            mutatedTask.done = !mutatedTask.done
            setTasks(tasks)
            this.setState({
                tasks: tasks
            })
        }

        return (
            <div className="productivity">
                <div className="overlay"></div>
                <Task 
                    day_id={this.props.dayId} 
                    closeTask={closeTask} 
                    // tasks={this.props.tasks} 
                    toggleDone={toggleDone}
                />

                <div className="date-container col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                { this.props.loading ? (<span> <Spinner /> Loading... </span>) :
                    this.props.days.map(day => {
                    return(
                        <div className="date-wrapper" key={day.id}>
                        <div className="date">
                            <span> {this.extractMonth(day.chosen_date)} </span>
                            {this.extractDate(day.chosen_date)}
                        </div>
                        <div className="icons">
                            <span className="taskIcon" id={day.id} onClick={(e) => openTasks(e)} >
                                T
                            </span>
                            <span>N</span>
                            <span>L</span>
                        </div>
                    </div>
                    )
                })
                }
                {/* {this.props.days.length === 0 ? (<p>Loading...</p>) : null} */}
                </div>
                <Date />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        days: state.days,
        tasks: state.tasks,
        dayId: state.dayId,

        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch) => ({
        setDays: (days) => dispatch(setDays(days)),
        setTasks: (tasks) => dispatch(setTasks(tasks)),
        setDayId: (id) => dispatch(setDayId(id)),
        setLoading: () => dispatch(setLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Productivity);