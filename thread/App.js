import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Root, StyleProvider } from 'native-base';
import Router from './src/Router';
import firebase from 'firebase';
import reducers from './src/reducers';
import getTheme from './native-base-theme/components';
import ThReadStyles from './native-base-theme/variables/ThRead';

/**
 * Firebase quirk for firestore
 */
require('firebase/firestore');

class App extends Component {

	constructor() {
		super();

		//Fix for android
		const originalSend = XMLHttpRequest.prototype.send;
			XMLHttpRequest.prototype.send = function(body) {
				if (body === '') {
					originalSend.call(this);
				} else {
					originalSend.call(this, body);
				}
			};

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
			<Provider store={store}>
				<StyleProvider style={getTheme(ThReadStyles)}>
					<Root>
						<Router />
					</Root>
				</StyleProvider>
			</Provider>
		);
	}

}

export default App;
