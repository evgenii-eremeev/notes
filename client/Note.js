import React from 'react';

function Notes({
    note, onDeleteClickHandler, onEditClickHandler
}) {
    let editMode = false;
    return (
        <div>
            <p>{ note.text }</p>
            <button onClick={() => onEditClickHandler(note._id)}>
                Редактировать
            </button>
            <button onClick={() => onDeleteClickHandler(note._id)}>
                Удалить
            </button>
            {note.occupied ?
                <span>
                    Редактируется: {note.occupied}
                </span> : ""
            }
            {editMode ?
            }
        </div>
    );
}

export default Notes;
