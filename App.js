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
    // firebase.auth().signInAnonymously()
    //   .then(() => {
    //     this.setState({
    //       isAuthenticated: true,
    //     });
    //   });
    const email = 'aaa@xxx.com';
    const password = '123456';
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.setState({
        isAuthenticated: true,
        });
      console.log(result, email, password);});
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
