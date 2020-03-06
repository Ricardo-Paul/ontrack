import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNote } from '../redux/actions';

class Note extends Component {
    render() {

        return (
            <div>
                {this.props.dayId} Note Taking
                <button onClick={() => this.props.fetchNote(this.props.dayId)} > fetch it </button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        dayId: state.dayId
    }
}

const mapActionsToProps = {
    fetchNote
}

export default connect(mapStateToProps, mapActionsToProps)(Note)