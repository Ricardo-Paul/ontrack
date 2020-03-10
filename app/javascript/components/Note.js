import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchNote, postNote } from '../redux/actions';
import RichTextEditor from 'react-rte'
import { CloseModalButton, DIV } from './commonStyle';


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
    }

    setTitle = (e) => {
        this.setState({
            title: e.target.value
        })
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
                    <button onClick={() => this.props.postNote(this.state.title, this.state.content, this.props.dayId,)}> 
                        Save Note 
                    </button>
                </div>
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