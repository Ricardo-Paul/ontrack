import React, { Component } from 'react'
import { connect } from 'react-redux'

class Content extends Component {

    returnNotes = () => {
        const { notes, lessons } = this.props;
        if (notes == null || notes.length === 0){
            return <h6> Note placholder </h6>
        }
        return (
            <p>{notes.length}</p>
        )
    }

    render() {
        const { notes, lessons } = this.props;
        console.log("notes from content", this.props.notes)
 
        return (
            <div className="content">
                {this.returnNotes()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes,
    lessons: state.lessons
})


export default connect(mapStateToProps)(Content)