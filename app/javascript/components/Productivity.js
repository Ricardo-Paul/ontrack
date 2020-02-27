import React, { Component } from 'react'
import axios from 'axios';
import Task from './Task';

export default class Productivity extends Component {

    state = {
        days: [],
        date: '',
        dayId: ''
    }

    extractDate(date){
        let dayNumber = date.split("-")[2]
        console.log(dayNumber)
        return dayNumber
    }

    toggleTaskModal(s, o, d){
        let task = document.querySelector("#task")
        let overlayStyle = document.querySelector(".overlay").style

        // overlay = 
        task.style.transform = s
        overlayStyle.opacity = o
        overlayStyle.display = d
    }


    componentDidMount(){
        axios.get('/api/days')
            .then(res => {
                console.log(res.data)
                let dayNumber = this.extractDate(res.data[1].chosen_date);
                this.setState({
                    days: res.data,
                    date: dayNumber
                })
            })
    }

  

    render() {
        const openTasks = (e) => {
            this.setState({
                dayId: e.target.id
            })
            this.toggleTaskModal("scale(1)", .5, "block")
        }

        const closeTask = () => {
            this.toggleTaskModal("scale(0)", 0, "none")
        }

        return (
            <div className="productivity">
                <div className="overlay"></div>
                <Task id={this.state.dayId} closeTask={closeTask} />
                {this.state.days.map(day => {
                    return(
                        <div className="date-wrapper">
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
            </div>
        )
    }
}
