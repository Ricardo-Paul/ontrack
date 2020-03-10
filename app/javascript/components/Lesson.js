import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchLessons } from '../redux/actions'
import { CloseModalButton } from './commonStyle'

class Lesson extends Component {

	closeLesson = () => {
		let lesson = document.querySelector(".lesson")
		lesson.style.transform = "scale(0)"
	}

	render(){
		return(
			<div className="lesson">
				<CloseModalButton onClick={this.closeLesson}>
					x
				</CloseModalButton>
				<h2> Lessons </h2>
				<h4> Show lessons here </h4>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dayId: state.dayId
	}
}

const mapDispatchToProps = {
	fetchLessons
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson)