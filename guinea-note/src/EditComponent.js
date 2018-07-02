import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';

class EditComponent extends Component {
    handleFinalEdit = (e) => {

        e.preventDefault()
        const title = this.getTitleInput.value
        const message = this.getMessageInput.value
        this.props.dispatch({ type: 'CLEAR_ERROR', id: this.props.note.id })

        this.props.dispatch({
            type: 'ADD_EDIT_POST',
            data: {
                id: this.props.note.id,
                title,
                message,
                editing: this.props.note.editing
            }
        })
        let updates = {}
        updates['users/' + this.props.note.key] = this.props.note;
        updates['users/' + this.props.note.key].title = title;
        updates['users/' + this.props.note.key].message = message;
        firebase.database().ref().update(updates)

    }
    render() {
        return (
            <form className="form" onSubmit={this.handleFinalEdit}>
                <h3 className="all_post_heading">Edit Note</h3>
                <input type="text" ref={(input) => this.getTitleInput = input} defaultValue={this.props.note.title} /> <br />
                <textarea ref={(input) => this.getMessageInput = input} defaultValue={this.props.note.message} cols="28" rows="5"></textarea><br />
                <button>Edit</button>
                {console.log(this.props.note.errorMessage)}
                {this.props.note.errorMessage ? <p style={{ color: '#ff7777' }}>{this.props.note.errorMessage}</p> : null}
            </form >
        );
    }
}




export default connect()(EditComponent);