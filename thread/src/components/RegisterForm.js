import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner, Icon } from 'native-base';
import {StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LoadingButton, CommonField, CommonContainer } from './Common';
import * as actions from '../actions/index';
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
  margin-top:20px;
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



    render() {
        return (
            <CommonContainer>
                <Content>
                    <Form style={{padding:5, marginLeft:-10}}>

                        <CommonField
                          onChangeText={this.onFirstNameChange}
                          value={this.props.first_name}
                          style={{marginTop:10}}
                          label={'First Name'}
                        />

                        <CommonField
                          onChangeText={this.onLastNameChange}
                          value={this.props.last_name}
                          style={{marginTop:20}}
                          label={'Last Name'}
                        />

                        <CommonField
                          onChangeText={this.props.registerPhoneChanged}
                          value={this.props.phone_number}
                          style={{marginTop:20}}
                          label={'Phone Number'}
                        />

                        <CommonField
                          onChangeText={this.onEmailChange}
                          value={this.props.email}
                          style={{marginTop:20}}
                          label={'Email'}
                        />

                        <CommonField
                          onChangeText={this.props.registerPasswordChanged}
                          value={this.props.password}
                          style={{marginTop:20}}
                          label={'Password'}
                            secureTextEntry
                        />

                        <CommonField
                          secureTextEntry
                          onChangeText={this.props.secondPasswordChanged}
                          value={this.props.second_password}
                          style={{marginTop:20}}
                          label={'Confirm Password'}
                        />
                    </Form>
                    <TermsTextStyle>By pressing "Register" I agree that I have read:</TermsTextStyle>

                        <TermsButtonStyle onPress={() => Actions.termsAndConditions()}>Terms and conditions </TermsButtonStyle>

                        <TermsButtonStyle onPress={() => Actions.privacyPolicy()}>Privacy Policy  </TermsButtonStyle>

                        <LoadingButton
                            loading={this.props.loading}
                            style={styles.buttonStyle}
                            onPress={this.onSubmitPress}
                            text="Register"
                            rounded
                            full
                        />
                </Content>
            </CommonContainer>
        );
    }
}


let styles = StyleSheet.create({

    buttonStyle: {
       marginTop: 15
    }
})


const mapStateToProps = ({ register }) => {
    const { first_name, last_name, email, password, second_password, phone_number, loading } = register;

    return { first_name, last_name, email, password, second_password, phone_number, loading };
};

export default connect(mapStateToProps, actions)(RegisterForm);
