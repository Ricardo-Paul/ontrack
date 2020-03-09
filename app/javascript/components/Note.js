import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchNote, postNote } from '../redux/actions';
import RichTextEditor from 'react-rte'

// JoditEditor
// import JoditEditor from "jodit-react"
class Note extends Component {
 
    state = {
        value: RichTextEditor.createEmptyValue(),
        content: 'hell',
        title: 'title here'
    }

    onChange = (value) => {
        let temp = document.createElement("DIV")
        temp.innerHTML = value.toString("html")
        let content = temp.innerText || temp.innerHTML || ""

        console.log(content)
        this.setState({
            value,
            content: content
        })

        // if(this.props.onChange){
        //     this.props.onChange(value.toString('html'))
        // }
    }

    setTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {

        const { notes } = this.props;
        const { value } = this.state;


        const displayEditor = () => {
            return(
                <div className="editor">
                <input 
                  placeholder="Note title"
                  value={this.state.title}
                  onChange={this.setTitle}
                />
                    <RichTextEditor 
                    value={this.state.value}
                    placeholder="start typing note..."
                    onChange={this.onChange} />
                    {this.state.title}
                </div>
            )
        }

        return (
            <div className="col-xl-6 col-lg-6 mx-4 note">
                <div className="close-note"> x </div>
                {this.props.dayId} Note Taking

                Notes for this day
                
                {displayEditor()}
                <button onClick={() => this.props.postNote(this.state.title, this.state.content, this.props.dayId,)}> Save Note </button>
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
    fetchNote,
    postNote
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)