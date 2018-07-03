import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {  View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  Logo  from './Logo';
import * as actions from '../actions/index';
import styled from 'styled-components/native';
import { CommonContainer } from './Common';
import { CommonField } from './Common';
import {LoadingButton} from './Common'



class LoginForm extends Component {

    onSubmitPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }



    render() {
        return (
            <CommonContainer>

              <Logo />
                <Content>

                        <Form style={{padding:5, marginLeft:-10}}>
                          <CommonField

                            style={{marginTop:10}}
                            label={'Email'}
                          />

                          <CommonField

                            style={{marginTop:10}}
                            label={'Password'}
                          />

                        </Form>

                        <LoadingButton
                                  loading={this.props.loading}
                                  style={styles.buttonStyle}
                                  onPress={this.onSubmitPress}
                                  text="Login"
                                  rounded
                                  full
                              />

                        <LoadingButton
                                  loading={this.props.loading}
                                  style={styles.buttonStyle}
                                  onPress={() => Actions.register() }
                                  text="Register"
                                  rounded
                                  full
                              />


                    <Button transparent full small style={{ marginTop: 15 }} onPress={() => Actions.resetPassword() }>
                        <Text>Forgot password?</Text>
                    </Button>
                </Content>
            </CommonContainer>

        );
    }
}

let styles = StyleSheet.create({


  buttonStyle: {
    marginTop: 15,

  },


});

const mapStateToProps = ({ auth }) => {
    const { email, password, loading } = auth;

    return { email, password, loading };
};

export default connect(mapStateToProps, {
    loginEmailChanged, loginPasswordChanged, loginUser
})(LoginForm);
