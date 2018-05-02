import React, { Component } from 'react';
import { Router, Scene, Stack, Modal, Tabs } from 'react-native-router-flux';
import { Icon } from 'native-base';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Chat from './components/Chat';
import ThreadList from './components/Threads';
import AddThreadButton from './components/AddThreadButton';
import CreateTreadForm from './components/CreateTreadForm';
import Contacts from './components/Contacts';
import Profile from './components/Profile';

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="login"
                        title="Login"
                        component={LoginForm}
                        initial
                    />
                    <Scene
                        key="register"
                        title="Register"
                        component={RegisterForm}
                    />
                    <Scene
                        key="resetPassword"
                        title="Reset Password"
                        component={ResetPasswordForm}
                    />
                    <Scene 
                        key="chat"
                        title="Chat"
                        component={Chat}
                    />
                    <Scene
                        key="main"
                        hideNavBar 
                        panHandlers={null}
                    >
                         <Modal>
                            <Tabs key="tabbar">
                                <Scene
                                    key="contacts"
                                    title="Contacts"
                                    component={Contacts}
                                    icon={() => <Icon name="people" />}
                                />
                                <Scene
                                    key="threads"
                                    title="ThRead"
                                    component={ThreadList}
                                    renderRightButton={() => <AddThreadButton />}
                                    icon={() => <Icon name="logo-octocat" />}
                                    initial
                                />
                                <Scene
                                    key="profile"
                                    title="Profile"
                                    component={Profile}
                                    icon={() => <Icon name="person" />}
                                />
                            </Tabs>
                            <Scene
                                key="createThread"
                                title="Create"
                                component={CreateTreadForm}
                            />
                        </Modal>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
