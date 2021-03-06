import React, { Component } from 'react';
import { Form, Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import Logo from './Logo';
import { LoadingButton, ContentSpinner, CommonContainer, CommonField, TransparentButton } from './Common';

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
            <CommonContainer paddedContent={true}>
                <Logo />
                <Form>
                    <CommonField
                        onChangeText={this.props.loginEmailChanged}
                        value={this.props.email}
                        label="Username"
                        />
                    <CommonField
                        onChangeText={this.props.loginPasswordChanged}
                        value={this.props.password}
                        secureTextEntry={true}
                        label="Password"
                    />
                </Form>
                <LoadingButton
                    loading={this.props.loading}
                    onPress={this.onSubmitPress.bind(this)}
                    text="Login"
                />
                <LoadingButton
                    loading={this.props.loading}
                    onPress={() => Actions.register() }
                    text="Register"
                />

                <TransparentButton onPress={() => Actions.resetPassword() } text="Forgot Password?" />
            </CommonContainer>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, loading, autoLogIn } = auth;

    return { email, password, loading, autoLogIn };
};

export default connect(mapStateToProps, actions)(LoginForm);
