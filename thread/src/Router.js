import React from 'react';
import { Router, Scene, Stack, Modal, Tabs } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

import { CommonButton } from './components/Common';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Chat from './components//Messenger/Chat';
import ThreadList from './components/Threads/List';
import CreateTreadForm from './components/CreateTreadForm';
import ContactTabs from './components/Contacts/Tabs';
import AddContactForm from './components/Contacts/AddContactForm';
import Profile from './components/Profile';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Info from './components/Messenger/Info';
import AddMembersForm from './components/Messenger/AddMembersForm';
import FooterTabs from './components/FooterTabs';

const RouterComponent = () => (
  <Router>
    <Scene key="root" {...sceneConfig}>
      <Scene key="login" title="Login" component={LoginForm} initial />
      <Scene key="register" title="Register" component={RegisterForm} />
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
      <Scene key="main" hideNavBar panHandlers={null}>
        <Modal>
          <Tabs key="tabbar" tabBarComponent={FooterTabs}>
            <Scene
              key="contacts"
              title="Contacts"
              component={ContactTabs}
              renderRightButton={() => (
                <CommonButton
                  onPress={() => Actions.addContact()}
                  name={'add'}
                />
              )}
            />
            <Scene
              key="threads"
              title="ThRead"
              component={ThreadList}
              renderRightButton={() => (
                <CommonButton
                  onPress={() => Actions.createThread()}
                  name={'add'}
                />
              )}
              initial
            />
            <Scene key="profile" title="Profile" component={Profile} />
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
          <Scene key="dmThread" hideNavBar>
            <Scene key="chat" component={Chat} hideNavBar={false} />
          </Scene>
          <Scene key="thread" hideNavBar>
            <Scene key="chat" component={Chat} hideNavBar={false} />
            <Scene
              key="info"
              title="Info"
              component={Info}
              hideNavBar={false}
            />
            <Scene
              key="addMembersForm"
              title="Add Members"
              component={AddMembersForm}
              hideNavBar={false}
            />
          </Scene>
        </Modal>
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;

const sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  }
};
