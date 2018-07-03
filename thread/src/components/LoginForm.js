import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {  View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import  Logo  from './Logo';
import { loginEmailChanged, loginPasswordChanged, loginUser } from '../actions';
import styled from "styled-components";



const StyledView = styled.View`
  background-color: #8bc34a;
  padding:5px;
  height:100%;
`;

const InputWrapper = styled.View`

  width: 100%;
  height: 250px;
  padding-top:50px;
`;

const InputStyle = styled(Input)`
  width:340px;
  color: #424242;
  padding:10px;
  background-color:white;
  margin-bottom:20px;
  text-align:center;

`;

const TextStyle = styled(Text)`

  font-size:15px;
  text-align:center;
  font-weight:700;
  margin-bottom:10px;
  color:white;
  margin-left:-15px;
`;

const buttonWrapper = styled.View`
  padding: 10px;
  width: 100%;
  height: 250px;
`;

const ForgotStyle = styled(Text)`
    font-size:15px;
    text-align:center;
    font-weight:700;
    color:white;
    text-decoration:underline;
    text-decoration-color: #fff;
    margin-top:30px;
`;



class LoginForm extends Component {

    onSubmitPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={this.props.loginEmailChanged}
                                value={this.props.email}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.props.loginPasswordChanged}
                                value={this.props.password}
                            />
                        </Item>
                    </Form>
                    <LoadingButton
                        loading={this.props.loading}
                        style={{ marginTop: 25 }}
                        onPress={this.onSubmitPress}
                        text="Login"
                    />
                    <Button bordered full style={{ marginTop: 15 }} onPress={() => Actions.register() }>
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

      marginTop: 20,
      fontWeight: 'bold'
  },

  inputStyle:{
    width: 340,
    marginBottom: 30,

  },

  buttonStyle: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 340
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

export default connect(mapStateToProps, actions)(LoginForm);
