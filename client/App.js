import React from 'react';

import io from 'socket.io-client';

import Note from './Note';

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {notes: []};
        this.socket = io();
        this.socket.on('state', (state) => this.setState({notes: state}));

        // bindings
        this._onAddClickHandler = this._onAddClickHandler.bind(this);
        this._onDeleteClickHandler = this._onDeleteClickHandler.bind(this);
        this._onEditClickHandler = this._onEditClickHandler.bind(this);
    }

    _onAddClickHandler () {
        const { text } = this.refs;
        this.socket.emit('add note', text.value);
        text.value = ""
    }

    _onEditClickHandler (noteId) {
        this.socket.emit('edit', noteId)
    }

    _onDeleteClickHandler (noteId) {
        this.socket.emit('delete', noteId)
    }

    render () {
        const { notes } = this.state;
        return (
            <div>
                {notes.map((note, idx) => (
                    <Note key={idx}
                        note={note}
                        onDeleteClickHandler={this._onDeleteClickHandler}
                        onEditClickHandler={this._onEditClickHandler}
                        />
                ))}
                <div className="form">
                    <h3>Добавление заметки</h3>
                    <textarea className="form__text" rows="5" cols="30" ref="text"></textarea>
                    <button className="form__button" onClick={this._onAddClickHandler}>
                        Добавить
                    </button>
                </div>
            </div>

        );
    }
}

export default App;
