import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import { LoadingButton } from './Common';
import * as actions from '../actions/index';

class ForgotPasswordForm extends Component {

    onSubmitPress = () => {
        const { first_email, second_email } = this.props;

        this.props.resetPassword({ first_email, second_email });
    }

    render() {
        return(
            <Container>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email address</Label>
                            <Input
                                onChangeText={this.props.firstEmailChanged}
                                value={this.props.first_email}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Re-enter email address</Label>
                            <Input
                                onChangeText={this.props.secondEmailChanged}
                                value={this.props.second_email}
                            />
                        </Item>
                    </Form>
                    <LoadingButton
                        loading={this.props.loading}
                        style={{ marginTop: 25 }}
                        onPress={this.onSubmitPress}
                        text="Reset password"
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ resetPassword }) => {
    const { first_email, second_email, loading } = resetPassword;

    return { first_email, second_email, loading };
};

export default connect(mapStateToProps, actions)(ForgotPasswordForm);
