import React, { Component } from 'react';
import AllNotes from './AllNotes.js'

import { connect } from 'react-redux';

import firebase from './firebase';
import { Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization';


import generateId from './utils';
class Note extends Component {

    componentDidMount() {
        const ref = firebase.database().ref('users/');

        this.props.dispatch({ type: 'LOADING_TRUE' });
        ref.on('value', snapshot => {
            if (snapshot.val() === null) {
                this.props.dispatch({ type: 'LOADING_FALSE' });
                return;
            }
            [...Object.values(snapshot.val())].map((note) => {
                this.props.dispatch({ type: 'ADD_NOTE', data: note })
                this.props.dispatch({ type: 'LOADING_FALSE' })
            })
        })

    }




    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.titleInput.value;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
        //validations
        const message = this.messageInput.value;
        //generate id
        const id = generateId();
        const newNote = {
            id,
            title,
            message,
            editing: false,
            errorMessage: ''
        }
        const noteRef1 = firebase.database().ref('users/')
        const noteKey = noteRef1.push()
        const noteRef = firebase.database().ref('users/' + noteKey.key)
        const uid = firebase.auth().currentUser.uid
        noteRef.set({
            id: id,
            title: title,
            message: message,
            editing: false,
            uid: uid,
            key: noteKey.key,
            errorMessage: ''
        })

        if (this.props.notes.editing) {
            this.props.dispatch({
                type: 'ADD_EDIT_POST',
                data: newNote
            })
        }
        this.props.dispatch({
            type: 'ADDING_NOTE'

        })
        this.titleInput.value = '';
        this.messageInput.value = '';


    }

    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            <Redirect to="/" />
        }).catch(() => {
            console.log('Error happened')
        })
        localStorage.removeItem('uid');
    }
    render() {
        return (
            <div className="post-grid">
                <div className="post-container">
                    <div className="logout-container">
                        <h2 className="righter"></h2>
                        <button className="logout" onClick={this.handleLogout}>Logout</button>
                    </div>
                    <div className="first-stuff">
                        <h2 className="post_heading">Note Content</h2>

                    </div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input required type="text" ref={(input) => this.titleInput = input} placeholder="Title"
                        /><br /><br />
                        <textarea required ref={(input) => this.messageInput = input} placeholder="Add text here" cols="28" rows="5"></textarea><br />
                        <button>Post Note</button>

                    </form>
                    {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
                </div>
                <AllNotes notes={this.props.notes} />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    notes: state.notes,
    errors: state.errors

})
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(connect(mapStateToProps)(Note));