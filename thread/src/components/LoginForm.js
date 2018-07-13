import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {  View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import styled from 'styled-components';
import Logo from './Logo';
import {LoadingButton, CommonContainer, CommonField, CommonPassword} from './Common';

const TermsButtonStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:white;

  margin-top:40px;
`;


class LoginForm extends Component {

  onEmailChange(text) {
     this.props.loginEmailChanged(text);
     }

     onPasswordChange(text) {
         this.props.loginPasswordChanged(text);
     }

   onSubmitPress = () => {
       const { email, password } = this.props;

       this.props.loginUser({ email, password });
   }

    render() {
        return (

            <CommonContainer>
              <Content>
                <Logo />
                  <Form>
                      <CommonField
                          onChangeText={this.onEmailChange.bind(this)}
                          value={this.props.email}
                          style={{marginTop: 30, marginLeft: -10}}
                          label="Username"
                          />
                        <CommonPassword
                          onChangeText={this.onPasswordChange.bind(this)}
                          value={this.props.password}
                          style={{marginTop: 30, marginLeft: -10}}
                          label="Password"
                        />
                    </Form>
                    <LoadingButton
                      loading={this.props.loading}
                      style={styles.buttonStyle}
                      onPress={this.onSubmitPress.bind(this)}
                      text="Login"
                    />
                    <LoadingButton
                      loading={this.props.loading}
                      style={styles.registerButton}
                      onPress={() => Actions.register() }
                      text="Register"
                    />
                    <TermsButtonStyle onPress={() => Actions.resetPassword() }>Forgot password? Click here!</TermsButtonStyle>

                </Content>
            </CommonContainer>
        );
    }
}

let styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 35,
  },
  registerButton: {
      marginTop: 35,
      backgroundColor:'#4eaded'
  }
});


const mapStateToProps = ({ auth }) => {
    const { email, password, loading } = auth;

    return { email, password, loading };
};

export default connect(mapStateToProps, actions)(LoginForm);
