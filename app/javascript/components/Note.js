import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNote } from '../redux/actions';

class Note extends Component {
    render() {
        const { notes } = this.props;
        const returnNotes = () => {
            return(
                <div>
                    Rich Text
                </div>
            )
        }

        return (
            <div>
                {this.props.dayId} Note Taking
                {returnNotes()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        dayId: state.dayId,
        notes: state.notes
    }
}

const mapDispatchToProps = {
    fetchNote
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)