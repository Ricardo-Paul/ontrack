import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchNote, postNote, setEdit, updateNote } from '../redux/actions';
import RichTextEditor from 'react-rte'
import { CloseModalButton, DIV } from './commonStyle';

class Note extends Component {
    state = {
        value: RichTextEditor.createEmptyValue(),
        content: 'hell',
        title: 'title here',
        note_id: ''
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
    }

    setTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleNoteSubmit = () => {
        const { editing, notes, updateNote, dayId } = this.props;
        const { title, content, note_id } = this.state;

        if(editing){
            updateNote(note_id, title, content, dayId)
            let temp = notes.find( n => n.id === this.state.note_id)
            temp.content = content
            temp.title = title
            console.log(temp)
        }else{
            this.props.postNote(this.state.title, this.state.content, this.props.dayId)
        }
    }


	closeNote = () => {
		let note = document.querySelector(".note")
		note.style.transform = "scale(0)"
	}

    render() {
        const displayEditor = () => {
            return(
                <div className="editor">
                <input 
                  placeholder="Note title"
                  value={this.state.title}
                  onChange={this.setTitle}
                />
                    <RichTextEditor 
                    className="richText"
                    value={this.state.value}
                    placeholder="start typing note..."
                    onChange={this.onChange} />
                    <button onClick={this.handleNoteSubmit}> 
                        {this.props.editing? "Edit": "Save Note"}
                    </button>
                </div>
            )
        }

       const displayNotes = () => {
            const { notes } = this.props;
            if (notes == null || notes.length === 0){
                return <h6> Note placholder </h6>
            }
            return (
                <ul>
                   { notes.map(n => <li onClick={
                       () => {this.setState({
                           value: RichTextEditor.createValueFromString(n.content, 'html'),
                           title: n.title,
                           note_id: n.id,
                           content: n.content
                       }), this.props.setEdit()}
                   } key={n.id}> {n.title} </li>)}
                </ul>
            )
        }

        return (
            <div className="note">
                <CloseModalButton onClick={this.closeNote}>
                    x
                </CloseModalButton>
                {this.props.dayId} Note Taking
                Notes for this day
                {displayEditor()}
                {displayNotes()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        dayId: state.dayId,
        notes: state.notes,
        editing: state.editing
    }
}

const mapDispatchToProps = {
    fetchNote,
    postNote,
    setEdit,
    updateNote
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)