import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import { LoadingButton, CommonField, CommonContainer } from './Common';
import { Container, Content, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import * as actions from '../actions/index';


class ForgotPasswordForm extends Component {

    onSubmitPress = () => {
        const { first_email, second_email } = this.props;

        this.props.resetPassword({ first_email, second_email });
    }


    render() {
        return(
            <CommonContainer>
                <Content>
                    <Form style={{padding:20, marginLeft: -20}}>
                        <CommonField
                          onChangeText={this.props.firstEmailChanged}
                          value={this.props.first_email}
                          style={{marginTop:30}}
                          label={'Email Address'}
                        />

                        <CommonField
                          onChangeText={this.props.secondEmailChanged}
                          value={this.props.second_email}
                          style={{marginTop:30}}
                          label={'Re-enter Email Address'}
                        />
                    </Form>
                    <LoadingButton
                        loading={this.props.loading}
                        style={styles.buttonStyle}
                        onPress={this.onSubmitPress}
                        text="Reset password"
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
        marginTop: 25
     }

 })

const mapStateToProps = ({ resetPassword }) => {
    const { first_email, second_email, loading } = resetPassword;

    return { first_email, second_email, loading };
};

export default connect(mapStateToProps, actions)(ForgotPasswordForm);
