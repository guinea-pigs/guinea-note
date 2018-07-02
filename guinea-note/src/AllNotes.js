import React, { Component } from 'react';

import { connect } from 'react-redux';

import EditComponent from './EditComponent';

import firebase from './firebase';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AllNotes extends Component {
    handleDelete = (note) => {
        this.props.dispatch({ type: 'DELETE', id: note.id })
        const ref = firebase.database().ref('users/' + note.key)
            ref.remove();
    }

    render() {
        console.log(this.props.notes)
        return (
            <div className="all_posts_container">
                <h2 className="all_post_heading">All Notes</h2>
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.props.notes.map((note) => (
                        <div key={note.id} className="post">
                            {note.editing ? <EditComponent key={note.id} note={note} /> :
                                (<div>
                                    <h3 className="all_post_heading">{note.title}</h3>
                                    <p className="message">{note.message}</p>

                                    <div className="control-buttons">
                                        {firebase.auth().currentUser.uid === note.uid ? <button className="delete" onClick={() => this.handleDelete(note)}>Delete Note</button> : null}
                                        {firebase.auth().currentUser.uid === note.uid ? <button className="edit" onClick={() => this.props.dispatch({ type: 'EDIT', id: note.id })}>Edit Note</button> : null}
                                    </div>
                                </div>
                                )
                            }

                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AllNotes);