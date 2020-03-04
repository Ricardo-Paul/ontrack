import React, { Component } from 'react'
import axios from 'axios';
import Task from './Task';
import Date from './Date';
import Paginate from './Paginate';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faListAlt, faStick } from '@fortawesome/free-solid-svg-icons'

// Spinner
import { Spinner } from './Spinner';

import { connect } from 'react-redux';
import { setDays, setTasks, setDayId, setLoading, setPageNumber } from '../redux/actions';


// imports
import helpers from '../modules/utils';
const { extractDate, extractMonth } = helpers;


class Productivity extends Component {
    extractDate = helpers.extractDate;
    extractMonth = helpers.extractMonth;
    state = {
        dayId: '',
        pageNumber: 1,
        dayPerPage: 2,
        totalDays: ''
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
                this.setState({
                    totalDays: res.data
                })
                // let days = res.data.reverse().slice(-5) 
                let lastIndex = this.props.pageNumber * this.state.dayPerPage;
                let firstIndex = lastIndex - this.state.dayPerPage;
                let paginatedDays = res.data.reverse().slice(firstIndex, lastIndex)             
                setTimeout(() => {
                    this.props.setDays(paginatedDays)
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

        const extractPaginatedDays = (data) => {
            let lastIndex = this.props.pageNumber * this.state.dayPerPage;
            let firstIndex = lastIndex - this.state.dayPerPage;
            let paginatedDays = data.reverse().slice(firstIndex, lastIndex)

            return {
                data,
                paginatedDays
            }
        }

        const setPageNumber = (page) => {
            this.props.setPageNumber(page)
            axios.get('/api/days')
                .then(res => {
                    const { paginatedDays } = extractPaginatedDays(res.data);
                    setTimeout(() => {
                        this.props.setDays(paginatedDays)
                    }, 100)
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
                <h3 className="date-header" > Days of Activity </h3>
                { this.props.loading ? (<span className="spinner-wrapper" > <Spinner /> Loading... </span>) :
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
                <Paginate 
                    totalDays={this.state.totalDays.length}
                    dayPerPage={this.state.dayPerPage}
                    setPageNumber={setPageNumber}
                    />
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

        loading: state.loading,
        pageNumber: state.pageNumber
    }
}

const mapDispatchToProps = (dispatch) => ({
        setDays: (days) => dispatch(setDays(days)),
        setTasks: (tasks) => dispatch(setTasks(tasks)),
        setDayId: (id) => dispatch(setDayId(id)),
        setLoading: () => dispatch(setLoading()),
        setPageNumber: (pageNumber) => dispatch(setPageNumber(pageNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(Productivity);