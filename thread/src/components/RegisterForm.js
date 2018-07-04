import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LoadingButton } from './Common';
import * as actions from '../actions/index';

class RegisterForm extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>First Name</Label>
                            <Input
                                onChangeText={this.props.registerFirstNameChanged}
                                value={this.props.first_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Last Name</Label>
                            <Input
                                onChangeText={this.props.registerLastNameChanged}
                                value={this.props.last_name}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Phone Number</Label>
                            <Input
                                keyboardType="numeric"
                                onChangeText={this.props.registerPhoneChanged}
                                value={this.props.phone_number}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Email</Label>
                            <Input
                                onChangeText={this.props.registerEmailChanged}
                                value={this.props.email}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.props.registerPasswordChanged}
                                value={this.props.password}
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Re-enter Password</Label>
                            <Input
                                secureTextEntry
                                onChangeText={this.props.secondPasswordChanged}
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
                    <LoadingButton
                        loading={this.props.loading}
                        style={{ marginTop: 25 }}
                        onPress={this.props.register}
                        text="Register"
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ register }) => {
    const { first_name, last_name, email, password, second_password, phone_number, loading } = register;

    return { first_name, last_name, email, password, second_password, phone_number, loading };
};

export default connect(mapStateToProps, actions)(RegisterForm);
