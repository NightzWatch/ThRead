import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Icon } from 'native-base';
import Chat from './components/Chat';

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene 
                        key="chat"
                        title="Chat"
                        component={Chat}                        
                    />
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
