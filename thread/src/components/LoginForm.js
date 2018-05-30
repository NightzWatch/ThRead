import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {  View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  Logo  from './Logo';
import { loginEmailChanged, loginPasswordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.loginEmailChanged(text);
    }

    onPasswordChange(text) {
        this.props.loginPasswordChanged(text);
    }

    onSubmitPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    logo(){
      return(
        <Logo />
      );
    }


    renderSignInButton() {
        if (this.props.loading) {
            return (
                <Button rounded warning style={{ marginTop: 25 }}>
                    <Spinner size="small" color="#fff" />
                </Button>
            );
        }

        return (
            <Button rounded style={styles.buttonStyle} onPress={this.onSubmitPress.bind(this)}>
                <Text>Login</Text>
            </Button>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#8bc34a' }}>

          {this.logo()}
                <Content style={styles.viewStyle}>

                        <Form>
                              <Text style={styles.TextStyle}> Email </Text>
                                <Item style={styles.inputStyle}>
                                    <Content>
                                      <Item>
                                        <Input style={{color:'#424242'}}
                                        onChangeText={this.onEmailChange.bind(this)}
                                        value={this.props.email}
                                          />
                                      </Item>
                                    </Content>
                                </Item>

                          <Text style={styles.TextStyle}> Password </Text>
                            <Item style={styles.inputStyle}>
                                <Content>
                                  <Item>
                                    <Input style={{color:'#424242'}}
                                    secureTextEntry
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    value={this.props.password}
                                      />
                                  </Item>
                              </Content>
                            </Item>
                        </Form>


                    {this.renderSignInButton()}

                    <Button rounded warning style={styles.buttonStyle} onPress={() => Actions.register() }>
                        <Text>Register</Text>
                    </Button>
                    <Button transparent full small style={{ marginTop: 15 }} onPress={() => Actions.resetPassword() }>
                        <Text>Forgot password?</Text>
                    </Button>
                </Content>
            </Container>

        );
    }
}

let styles = StyleSheet.create({

  TextStyle: {
      color: '#fff',
      fontSize: 13,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: 20,
      fontWeight: 'bold'
  },

  inputStyle:{
    width: 340
  },

  buttonStyle: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    marginLeft: 20
  },

  viewStyle: {
    flex: 1,
    marginTop: 20
  }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, loading } = auth;

    return { email, password, loading };
};

export default connect(mapStateToProps, {
    loginEmailChanged, loginPasswordChanged, loginUser
})(LoginForm);
