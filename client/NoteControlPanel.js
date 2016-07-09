import React from 'react';

function NoteControlPanel({onDeleteClickHandler, onEditClickHandler, note}) {
    return (
        !note.occupied ?
            <div>
                <button onClick={() => onDeleteClickHandler(note._id)}>
                    Удалить
                </button>
                <button onClick={() => onEditClickHandler(note._id)}>
                    Редактировать
                </button>
            </div>
                :
            <p>
                Редактируется: {note.occupied}
            </p>
    );
}

export default NoteControlPanel;
