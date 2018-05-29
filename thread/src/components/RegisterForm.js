import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import FormItem from './RegistrationFormItem';
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
            <Button full style={{ marginTop: 25 }} onPress={this.onSubmitPress}>
                <Text>Register</Text>
            </Button>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    <Form>
                        <FormItem
                            label={'First Name'}
                            tooltip={'This is the message that we will show'}
                            value={this.props.first_name}
                            onChangeText={ this.onFirstNameChange }
                        />
                        <FormItem
                            label={'Last Name'}
                            tooltip={'This is the message that we will show'}
                            value={this.props.last_name}
                            onChangeText={ this.onLastNameChange }
                        />
                        <FormItem
                            label={'Phone Number'}
                            tooltip={'This is the message that we will show'}
                            value={this.props.phone_number}
                            onChangeText={ this.onPhoneChange }
                        />
                        <FormItem
                            label={'Email'}
                            tooltip={'This is the message that we will show'}
                            value={this.props.email}
                            onChangeText={ this.onEmailChange }
                        />
                        <FormItem
                            label={'Password'}
                            tooltip={'This is the message that we will show. This is the message that we will show. This is the message that we will show. This is the message that we will show.'}
                            value={this.props.password}
                            onChangeText={ this.onPasswordChange }
                            secure={true}
                        />
                        <FormItem
                            label={'And Password Again'}
                            tooltip={'This is the message that we will show'}
                            value={this.props.second_password}
                            onChangeText={ this.onSecondPasswordChange }
                            secure={true}
                        />
                    </Form>
                    <Text style={{ marginTop: 15, padding: 5 }}>
                        By pressing "Register" I agree that I have read:
                    </Text>
                    <Button transparent onPress={() => Actions.termsAndConditions()}>
                        <Text>Terms and conditions</Text>
                    </Button>
                    <Button transparent onPress={() => Actions.privacyPolicy()}>
                        <Text>Privacy Policy</Text>
                    </Button>
                    {this.renderRegisterButton()}
                </Content>
            </Container>
        );
    }
}

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
