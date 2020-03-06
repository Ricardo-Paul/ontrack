import React, { Component } from 'react'
import axios from 'axios';

import Task from './Task';
import Note from './Note';
import Date from './Date';
import Paginate from './Paginate';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faListAlt, faBookReader } from '@fortawesome/free-solid-svg-icons'

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
        dayPerPage: 4,
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

    authorizeUser(){
        const authorization = {
            headers:{
                'Authorization': localStorage.getItem("token")
            }
        }
        return {
            authorization
        }
    }


    componentDidMount(){
        this.props.setLoading()
        const { authorization } = this.authorizeUser();
        axios.get('/api/days', authorization)
            .then(res => {
                this.setState({
                    totalDays: res.data
                })
                let lastIndex = this.props.pageNumber * this.state.dayPerPage;
                let firstIndex = lastIndex - this.state.dayPerPage;
                let paginatedDays = res.data.reverse().slice(firstIndex, lastIndex)             
                setTimeout(() => {
                    this.props.setDays(paginatedDays)
                }, 900)

                console.log(res.data)
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
            const { authorization } = this.authorizeUser();
            axios.get('/api/days', authorization)
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

                <Note />

                <div className="date-container col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <h3 className="date-header" > Days of Activity {this.props.pageNumber} </h3>
                {this.props.days.length === 0 && (<p> Please add a new day record </p>) }
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
                                <FontAwesomeIcon className="icon-task" icon={faListAlt} />
                            </span>
                            <span id={day.id} onClick={() => this.props.setDayId(day.id)} >
                                <FontAwesomeIcon className="icon" icon={faStickyNote} />
                            </span>
                            <span>
                                <FontAwesomeIcon className="icon" icon={faBookReader} />
                            </span>
                        </div>
                    </div>
                    )
                })
                }

                {!this.props.loading &&
                    <Paginate 
                    totalDays={this.state.totalDays.length}
                    dayPerPage={this.state.dayPerPage}
                    setPageNumber={setPageNumber}
                    />
                }

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