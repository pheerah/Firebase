import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import Todos from './Todos'

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymously()
      .then(() => {
        this.setState({
          isAuthenticated: true,
        });
      });
  }
  render() {
    // If the user has not authenticated
    if (!this.state.isAuthenticated) {
      return null;
    }
    return (
        <Todos/>
    );
  }
}
