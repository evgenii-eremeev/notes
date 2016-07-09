import React from 'react';

import io from 'socket.io-client';

import Note from './Note';
import EditForm from './EditForm';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            notes: [],
            currEditedNote: null
        };
        this.socket = io();
        this.socket.on('state', (state) => this.setState({notes: state}));

        // bindings
        this._onAddClickHandler = this._onAddClickHandler.bind(this);
        this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
        this._onEditClickHandler = this._onEditClickHandler.bind(this);
        this._onSaveClickHandler = this._onSaveClickHandler.bind(this);
        this._onEditFormUnmount = this._onEditFormUnmount.bind(this);
    }

    _onAddClickHandler ({noteText}) {
        this.socket.emit('add note', {noteText});
    }

    _onEditClickHandler (noteId) {
        this.socket.emit('edit note', noteId);
        this.setState({currEditedNote: noteId});
    }

    _onDeleteClickHandler (noteId) {
        this.socket.emit('delete note', noteId)
    }

    _onSaveClickHandler ({noteId, noteText}) {
        this.socket.emit('save note', {noteId, noteText});
        this.setState({currEditedNote: ""});
    }

    _onEditFormUnmount (noteId) {
        this.socket.emit('free note', noteId);
    }

    render () {
        const { notes, currEditedNote } = this.state;
        return (
            <div>
                {notes.map((note, idx) => (
                    <Note key={idx}
                        note={note}
                        editMode={currEditedNote === note._id}
                        onDeleteClickHandler={this._onDeleteClickHandler}
                        onEditClickHandler={this._onEditClickHandler}
                        onSaveClickHandler={this._onSaveClickHandler}
                        onEditFormUnmount={this._onEditFormUnmount}
                        />
                ))}
                <EditForm role='add-note' onClickHandler={this._onAddClickHandler} />
            </div>

        );
    }
}

export default App;
