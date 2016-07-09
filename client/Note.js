import React from 'react';

import EditForm from './EditForm';

function Notes({
    note, editMode, onDeleteClickHandler,
    onEditClickHandler, onEditFormUnmount, onSaveClickHandler
}) {

    return (
        <div>
            {editMode ?
                <EditForm
                    note={note}
                    onClickHandler={onSaveClickHandler}
                    onEditFormUnmount={onEditFormUnmount}
                    />
                :
                <div>
                    <p>{ note.text }</p>
                    {!note.occupied ?
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
                    }
                </div>
            }
        </div>
    );
}

export default Notes;
