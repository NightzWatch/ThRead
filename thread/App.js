import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base';
import Router from './src/Router';

class App extends React.Component {
  componentWillMount() {
		const config = {
			apiKey: "AIzaSyBOE0wGW9TRzP_InQz0cOnh-OR7SwyLM9w",
			authDomain: "reactnative-auth-66287.firebaseapp.com",
			databaseURL: "https://reactnative-auth-66287.firebaseio.com",
			projectId: "reactnative-auth-66287",
			storageBucket: "reactnative-auth-66287.appspot.com",
			messagingSenderId: "381362358898"
		};
		
		firebase.initializeApp(config);
	}
  
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
	
		return (

				<Root>
					<Router />
				</Root>
		);
	}
}
