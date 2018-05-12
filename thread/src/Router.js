import React, { Component } from 'react';
import { Router, Scene, Stack, Modal, Tabs } from 'react-native-router-flux';
import { Icon } from 'native-base';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Chat from './components//Messenger/Chat';
import ThreadList from './components/Threads';
import CreateThreadButton from './components/CreateThreadButton';
import CreateTreadForm from './components/CreateTreadForm';
import Contacts from './components/Contacts';
import ContactTabs from './components/ContactTabs';
import Profile from './components/Profile';
import AddContactButton from './components/AddContactButton';
import AddContactForm from './components/AddContactForm';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';

class RouterComponent extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" {...sceneConfig}>
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
                        key="privacyPolicy"
                        title="Privacy Policy"
                        component={PrivacyPolicy}
                    />
                    <Scene
                        key="termsAndConditions"
                        title="Terms and Conditions"
                        component={TermsAndConditions}
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
                                    component={ContactTabs}
                                    renderRightButton={() => <AddContactButton />}
                                    icon={() => <Icon name="people" />}
                                />
                                <Scene
                                    key="threads"
                                    title="ThRead"
                                    component={ThreadList}
                                    renderRightButton={() => <CreateThreadButton />}
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
                            <Scene
                                key="addContact"
                                title="Send Request"
                                component={AddContactForm}
                            />
                            <Scene 
                                key="chat"
                                title="Chat"
                                component={Chat}
                            />
                        </Modal>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;

const sceneConfig = {
    cardStyle: {
        backgroundColor: 'white'
    }
};
