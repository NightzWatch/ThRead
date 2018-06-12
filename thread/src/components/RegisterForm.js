import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner, Icon } from 'native-base';
import {StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    register,
    registerEmailChanged,
    registerFirstNameChanged,
    registerLastNameChanged,
    registerPasswordChanged,
    secondPasswordChanged,
    registerPhoneChanged
} from '../actions/index';
import styled from "styled-components";

const TextStyle = styled(Text)`
   font-size:13px;
   text-align:center;
   font-weight:700;
   color:white;
   margin-top:10px;
 `;

const TermsTextStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:white;
`;

const TermsButtonStyle = styled(Text)`
  font-size:14px;
  text-align:center;
  color:blue;
  text-decoration:underline;
  margin-top:10px;
`;

class RegisterForm extends Component {
    onSubmitPress = () => {
        const { phone_number, first_name, last_name, email, password, second_password } = this.props;

        this.props.register({ phone_number, first_name, last_name, email, password, second_password });
    }

    onEmailChange = (text) => {
        this.props.registerEmailChanged(text);
    }

    onFirstNameChange = (text) =>  {
        this.props.registerFirstNameChanged(text);
    }

    onLastNameChange = (text) => {
        this.props.registerLastNameChanged(text);
    }

    onPasswordChange = (text) => {
        this.props.registerPasswordChanged(text);
    }

    onSecondPasswordChange = (text) => {
        this.props.secondPasswordChanged(text);
    }

    onPhoneChange = (text) => {
        this.props.registerPhoneChanged(text);
    }

    renderRegisterButton() {
        if (this.props.loading) {
            return (
                <Button full disabled style={{ marginTop: 25 }}>
                    <Spinner size="small" color="#fff" />
                    <Text>Registering</Text>
                </Button>
            );
        }

        return (
            <Button rounded style={styles.buttonStyle} onPress={this.onSubmitPress}>
                <Text>Register</Text>
            </Button>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#8bc34a' }}>
                <Content>
                    <Form style={{padding:20, marginLeft: -20}}>
                        <Item stackedLabel>

                            <TextStyle>First Name</TextStyle>
                            <Input
                                placeholder=''
                                style={{fontSize:13}}
                                onChangeText={this.onFirstNameChange}
                                value={this.props.first_name}
                            />

                        </Item>
                        <Item style={{marginTop:20}} stackedLabel>
                          <TextStyle>Last Name</TextStyle>
                            <Input
                                style={{fontSize:13}}
                                onChangeText={this.onLastNameChange}
                                value={this.props.last_name}
                            />
                        </Item>
                        <Item style={{marginTop:20}} stackedLabel>
                          <TextStyle>Phone Number</TextStyle>
                          <Input
                                style={{fontSize:13}}
                                keyboardType="numeric"
                                onChangeText={this.onPhoneChange}
                                value={this.props.phone_number}
                            />
                        </Item>
                        <Item style={{marginTop:20}} stackedLabel>
                          <TextStyle>Email</TextStyle>
                          <Input
                                style={{fontSize:13}}
                                onChangeText={this.onEmailChange}
                                value={this.props.email}
                            />
                        </Item>
                        <Item style={{marginTop:20}} stackedLabel>
                            <TextStyle>Password</TextStyle>
                            <Input
                                style={{fontSize:13}}
                                secureTextEntry
                                onChangeText={this.onPasswordChange}
                                value={this.props.password}
                            />
                        </Item>
                        <Item style={{marginTop:20}} stackedLabel>
                            <TextStyle>Confirm Password</TextStyle>
                            <Input
                                style={{fontSize:13}}
                                secureTextEntry
                                onChangeText={this.onSecondPasswordChange.bind(this)}
                                value={this.props.second_password}
                            />
                        </Item>
                    </Form>
                    <TermsTextStyle>By pressing "Register" I agree that I have read:</TermsTextStyle>

                        <TermsButtonStyle onPress={() => Actions.termsAndConditions()}>Terms and conditions </TermsButtonStyle>

                        <TermsButtonStyle onPress={() => Actions.privacyPolicy()}>Privacy Policy  </TermsButtonStyle>

                      {this.renderRegisterButton()}
                </Content>
            </Container>
        );
    }
}


let styles = StyleSheet.create({

    buttonStyle: {
       marginTop: 25,
       alignItems: 'center',
       justifyContent: 'center',
       marginLeft: 15,
       width: 340
    }
})


const mapStateToProps = ({ register }) => {
    const { first_name, last_name, email, password, second_password, phone_number, loading } = register;

    return { first_name, last_name, email, password, second_password, phone_number, loading };
};

export default connect(mapStateToProps, {
    register,
    registerEmailChanged,
    registerFirstNameChanged,
    registerLastNameChanged,
    registerPasswordChanged,
    secondPasswordChanged,
    registerPhoneChanged
})(RegisterForm);
