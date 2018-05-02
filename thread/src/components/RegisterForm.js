import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import {
    register,
    registerEmailChanged,
    registerFirstNameChanged,
    registerLastNameChanged,
    registerPasswordChanged,
    secondPasswordChanged
} from '../actions/index';

class RegisterForm extends Component {
    onSubmitPress() {
        const { first_name, last_name, email, password, second_password } = this.props;

        this.props.register({ first_name, last_name, email, password, second_password });
    }

    onEmailChange(text) {
        this.props.registerEmailChanged(text);
    }

    onFirstNameChange(text) {
        this.props.registerFirstNameChanged(text);
    }

    onLastNameChange(text) {
        this.props.registerLastNameChanged(text);
    }

    onPasswordChange(text) {
        this.props.registerPasswordChanged(text);
    }

    onSecondPasswordChange(text) {
        this.props.secondPasswordChanged(text);
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
            <Button full style={{ marginTop: 25 }} onPress={this.onSubmitPress.bind(this)}>
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
                                onChangeText={this.onFirstNameChange.bind(this)}
                                value={this.props.first_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Last Name</Label>
                            <Input
                                onChangeText={this.onLastNameChange.bind(this)}
                                value={this.props.last_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Email</Label>
                            <Input
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.onPasswordChange.bind(this)}
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
                    {this.renderRegisterButton()}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ register }) => {
    const { first_name, last_name, email, password, second_password, loading } = register;

    return { first_name, last_name, email, password, second_password, loading };
};

export default connect(mapStateToProps, {
    register,
    registerEmailChanged,
    registerFirstNameChanged,
    registerLastNameChanged,
    registerPasswordChanged,
    secondPasswordChanged
})(RegisterForm);
