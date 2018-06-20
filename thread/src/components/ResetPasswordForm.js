import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import { LoadingButton, CommonField } from './Common';
import { Container, Content, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import styled from 'styled-components';
import * as actions from '../actions/index';


const TextStyle = styled(Text)`
    font-size:13px;
    text-align:center;
    font-weight:700;
    color:white;


  `;

class ForgotPasswordForm extends Component {

    onSubmitPress = () => {
        const { first_email, second_email } = this.props;

        this.props.resetPassword({ first_email, second_email });
    }


    render() {
        return(
            <Container style={{backgroundColor:'#8bc34a'}}>
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
                          label={'Re-enter email Address'}
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

const mapStateToProps = ({ resetPassword }) => {
    const { first_email, second_email, loading } = resetPassword;

    return { first_email, second_email, loading };
};

export default connect(mapStateToProps, actions)(ForgotPasswordForm);
