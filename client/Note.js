import React from 'react';

import EditForm from './EditForm';
import NoteControlPanel from './NoteControlPanel';

function Notes({
    note, editMode, onDeleteClickHandler,
    onEditClickHandler, onEditFormUnmount, onSaveClickHandler
}) {
    return (
        <div className="note">
            {editMode ?
                <EditForm
                    note={note}
                    onClickHandler={onSaveClickHandler}
                    onEditFormUnmount={onEditFormUnmount}
                    />
                :
                <NoteControlPanel
                    note={note}
                    onDeleteClickHandler={onDeleteClickHandler}
                    onEditClickHandler={onEditClickHandler}
                    />
            }
        </div>
    );
}

export default Notes;
