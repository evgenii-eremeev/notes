import React from 'react';

class EditForm extends React.Component {

    constructor (props) {
        super(props);
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onButtonClick () {
        const { onClickHandler, note } = this.props;
        const { text } = this.refs;
        onClickHandler({
            noteText: text.value,
            noteId: note ? note._id : null
        });
        text.value = "";
    }

    componentWillUnmount () {
        this.props.onEditFormUnmount(this.props.note._id);
    }

    render () {
        const { onClickHandler, role, note } = this.props;
        return (
            <div className="form">
                <textarea className="form__text"
                    ref="text"
                    defaultValue={note ? note.text : ""}>
                </textarea>
                <div className="button-container">
                    <button className="form__button" onClick={this._onButtonClick}>
                        {role === 'add-note' ? 'Add' : 'Save'}
                    </button>
                </div>
            </div>
        );
    }

}

export default EditForm;
