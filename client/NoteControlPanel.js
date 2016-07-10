import React from 'react';

function NoteControlPanel({onDeleteClickHandler, onEditClickHandler, note}) {
    return (
        <div>
            <p className="note__text" onClick={() => onEditClickHandler(note._id)}>
                { note.text }
            </p>
            {!note.occupied ?
                <div className="button-container">
                    <button onClick={() => onDeleteClickHandler(note._id)}>
                        Delete
                    </button>
                    <button onClick={() => onEditClickHandler(note._id)}>
                        Edit
                    </button>
                </div>
                    :
                <p className="edit-message">
                    Редактирует: {note.occupied}
                </p>
            }
        </div>

    );
}

export default NoteControlPanel;
