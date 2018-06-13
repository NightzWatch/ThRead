import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
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
            <Button full style={styles.buttonStyle} onPress={this.onSubmitPress}>
                <Text>Register</Text>
            </Button>
        );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input
                                onChangeText={this.onFirstNameChange}
                                value={this.props.first_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Last Name</Label>
                            <Input
                                onChangeText={this.onLastNameChange}
                                value={this.props.last_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Phone Number</Label>
                            <Input
                                keyboardType="numeric"
                                onChangeText={this.onPhoneChange}
                                value={this.props.phone_number}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Email</Label>
                            <Input
                                onChangeText={this.onEmailChange}
                                value={this.props.email}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.onPasswordChange}
                                value={this.props.password}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Re-enter Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.onSecondPasswordChange.bind(this)}
                                value={this.props.second_password}
                            />
                        </Item>
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

let styles = StyleSheet.create({

     buttonStyle: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
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
