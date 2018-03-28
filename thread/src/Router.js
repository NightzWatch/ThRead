import React, { Component } from 'react';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import { Icon } from 'native-base';

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="login"
                        title="Login"
                        component={}
                        initial
                    />
                </Scene>
            </Router>
        );
    }
}