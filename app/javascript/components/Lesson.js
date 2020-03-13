import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchLessons, postLesson } from '../redux/actions'
import { CloseModalButton } from './commonStyle'

// helpers import
import helpers from '../modules/utils';

class Lesson extends Component {
	isEmpty = helpers.fieldIsEmpty;

	state = {
		description: ""
	}

	closeLesson = () => {
		let lesson = document.querySelector(".lesson")
		lesson.style.transform = "scale(0)"
	}

	handleChange = ({target: {value}}) => {
		this.setState({
			description: value
		})
	}

	displayLessons = () => {
		const { lessons } = this.props;
		return (
			<ul className="lesson-list">
			   {lessons.map( l => (
				   <li key={l.id}> {l.description} </li>
			   ))}
			</ul>
		)
	}

	handleLessonSubmit = (e) => {
		e.preventDefault();
		const { description } = this.state;
		this.props.postLesson(description, this.props.dayId)
		if (this.isEmpty(description)){
			return alert('Please provide a content')
		}
		this.setState({
			description: ''
		})
	}

	getDateString = (id) => {
		const { days } = this.props;
		let day = days.find( d => d.id == id)
		let date = new Date(day.chosen_date).toUTCString()
		let dateString = date.split(" ").slice(0, 4).join(" ")
		return dateString
	}

	render(){
		return(
			<div className="lesson">
				<CloseModalButton onClick={this.closeLesson}>
					x
				</CloseModalButton>
				<div className="lesson-header">
					<p> Takeaways from the day 
					{this.props.dayId && (
						<span>
							{this.getDateString(this.props.dayId)} 
						</span>
					)}
					</p>
				</div>

				<form onSubmit={this.handleLessonSubmit}>
					<label> What have you learned so far ? </label>
					<input className="lesson-input" value={this.state.description} onChange={this.handleChange}/>

					<input className="lesson-submit" type="submit" />
				</form>
				<hr />
				{this.displayLessons()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dayId: state.dayId,
		lessons: state.lessons,
		days: state.days
	}
}

const mapDispatchToProps = {
	fetchLessons,
	postLesson
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)