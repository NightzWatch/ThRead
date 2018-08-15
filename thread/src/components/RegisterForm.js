import React, { Component } from 'react';
import { Form } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LoadingButton, CommonField, CommonContainer, CommonText, TransparentButton } from './Common';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class RegisterForm extends Component {
    onSubmitPress = () => {
        const { phone_number, first_name, last_name, email, password, second_password } = this.props;

        this.props.register({ phone_number, first_name, last_name, email, password, second_password });
    }

    render() {
        return (
            <CommonContainer paddedContent={true}>
                <Form>
                    <CommonField
                        onChangeText={this.props.registerFirstNameChanged}
                        value={this.props.first_name}
                        label={'First Name'}
                    />

                    <CommonField
                        onChangeText={this.props.registerLastNameChanged}
                        value={this.props.last_name}
                        label={'Last Name'}
                    />

                    <CommonField
                        onChangeText={this.props.registerPhoneChanged}
                        value={this.props.phone_number}
                        label={'Phone Number'}
                    />

                    <CommonField
                        onChangeText={this.props.registerEmailChanged}
                        value={this.props.email}
                        label={'Email'}
                    />

                    <CommonField
                        onChangeText={this.props.registerPasswordChanged}
                        value={this.props.password}
                        label={'Password'}
                        secureTextEntry
                    />

                    <CommonField
                        secureTextEntry
                        onChangeText={this.props.secondPasswordChanged}
                        value={this.props.second_password}
                        label={'Confirm Password'}
                    />
                </Form>

                <CommonText text={"By pressing Register I agree that I have read:"} />

                <TransparentButton onPress={() => Actions.termsAndConditions()} text="Terms and conditions" />

                <TransparentButton onPress={() => Actions.privacyPolicy()} text="Privacy Policy" />

                <LoadingButton
                    loading={this.props.loading}
                    onPress={this.onSubmitPress}
                    text="Register"
                    rounded
                    full
                />
            </CommonContainer>
        );
    }
}

const mapStateToProps = ({ register }) => {
    const { first_name, last_name, email, password, second_password, phone_number, loading } = register;

    return { first_name, last_name, email, password, second_password, phone_number, loading };
};

export default connect(mapStateToProps, actions)(RegisterForm);
