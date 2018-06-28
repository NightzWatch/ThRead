import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Footer, FooterTab, Button, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import { LoadingButton, ContentSpinner } from './Common';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        
        if (props.autoLogIn) {
            this.onSubmitPress();
        }
    }
    
    onSubmitPress = () => {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    render() {
        if (this.props.autoLogIn) {
            return (
                <Container>
                    <ContentSpinner />
                </Container>
            );
        }

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

const mapStateToProps = ({ auth }) => {
    const { email, password, loading, autoLogIn } = auth;

    return { email, password, loading, autoLogIn };
};

export default connect(mapStateToProps, actions)(LoginForm);
