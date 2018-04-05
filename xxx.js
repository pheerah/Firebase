import React, { Component } from 'react';
import App from './App';
import Login from './Login';
import { StackNavigator } from 'react-navigation';
export default class xxx extends React.Component{
	render() {
		return <RootStack />;
	}
}

const RootStack = StackNavigator(
	{
		Login: {
			screen: Login,
		},
		App: {
			screen: App,
		},
	},
	{
		initialRouteName: 'Login',
	}
);
