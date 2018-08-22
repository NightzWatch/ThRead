import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingButton, CommonField, CommonContainer } from './Common';
import { Form } from 'native-base';
import * as actions from '../actions/index';

class ForgotPasswordForm extends Component {

    onSubmitPress = () => {
        const { first_email, second_email } = this.props;

        this.props.resetPassword({ first_email, second_email });
    }

    render() {
        return(
            <CommonContainer paddedContent={true}>
                <Form>
                    <CommonField
                        onChangeText={this.props.firstEmailChanged}
                        value={this.props.first_email}
                        label={'Email Address'}
                    />

                    <CommonField
                        onChangeText={this.props.secondEmailChanged}
                        value={this.props.second_email}
                        label={'Re-enter Email Address'}
                    />
                </Form>
                <LoadingButton
                    loading={this.props.loading}
                    style={{ marginTop: 25 }}
                    onPress={this.onSubmitPress}
                    text="Reset password"
                    rounded
                    full
                />
            </CommonContainer>
        );
    }
}

const mapStateToProps = ({ resetPassword }) => {
    const { first_email, second_email, loading } = resetPassword;

    return { first_email, second_email, loading };
};

export default connect(mapStateToProps, actions)(ForgotPasswordForm);
