import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchLessons, postLesson } from '../redux/actions'
import { CloseModalButton } from './commonStyle'

class Lesson extends Component {

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

	render(){
		return(
			<div className="lesson">
				<CloseModalButton onClick={this.closeLesson}>
					x
				</CloseModalButton>
				<h4> Takeaways from the day </h4>
				<h5> date here {this.props.dayId} </h5>
					<div className="form-group">
						<label> What have you learned so far ? </label>
						<input value={this.state.description} onChange={this.handleChange} className="form-control" />
					</div>
				<button 
				 onClick={() => this.props.postLesson(this.state.description, this.props.dayId)}
				> I learned this </button>
				{this.state.description}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dayId: state.dayId,
		lessons: state.lessons
	}
}

const mapDispatchToProps = {
	fetchLessons,
	postLesson
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)