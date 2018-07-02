import React, { Component } from 'react';

import firebase from './firebase';

import Note from './Note';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {


  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.dispatch({ type: 'AUTHED_TRUE' });
      } else {
        this.props.dispatch({ type: 'AUTHED_FALSE' });
      }
    })
  }


  render() {
    return (
      <div className="App">

        <div className="navbar">
          <h2 className="center ">Guinea Note</h2>
        </div>

        <Router>
          <div>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Note} />
          </div>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authed: state.authed
})

export default connect(mapStateToProps)(App);