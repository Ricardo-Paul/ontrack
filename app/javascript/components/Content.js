import React, { Component } from 'react'
import { connect } from 'react-redux'

class Content extends Component {

    returnNotes = () => {
        const { notes, lessons } = this.props;
        if (notes == null || notes.length === 0){
            return <p></p>
        }
        return (
            <p>{notes.length}</p>
        )
    }

    render() {
        return (
            <div className="content">
                {this.returnNotes()}
                <p> This app is still under construction...</p> <br/>
                <p> I'm working hard to fix some issues, complete the core features and add more </p> <br/>
                <p>Thank you </p> <br/>
                <p>@Ricardo</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes,
    lessons: state.lessons
})


export default connect(mapStateToProps)(Content)