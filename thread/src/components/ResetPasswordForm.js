import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Label, Input, Button, Text, Spinner } from 'native-base';
import {
    firstEmailChanged,
    secondEmailChanged,
    resetPassword
} from '../actions/index';
import styled from 'styled-components';

const TextStyle = styled(Text)`
    font-size:13px;
    text-align:center;
    font-weight:700;
    color:white;


  `;


class ForgotPasswordForm extends Component {
    onFirstEmailChanged(text) {
        this.props.firstEmailChanged(text);
    }

    onSecondEmailChanged(text) {
        this.props.secondEmailChanged(text);
    }

    onSubmitPress() {
        const { first_email, second_email } = this.props;

        this.props.resetPassword({ first_email, second_email });
    }

    renderSubmitButton() {
        if (this.props.loading) {
            return (
                <Button full disabled style={{ marginTop: 25 }}>
                    <Spinner size="small" color="#fff" />
                    <Text>Resetting Password</Text>
                </Button>
            );
        }

        return (
            <Button rounded style={styles.buttonStyle} onPress={this.onSubmitPress.bind(this)}>
                <Text>Reset password</Text>
            </Button>
        );
    }

    render() {
        return(
            <Container style={{ backgroundColor:'#8bc34a' }}>
                <Content>
                    <Form style={{padding:20, marginLeft: -20}}>
                        <Item style={{marginTop:40}} stackedLabel>
                            <TextStyle>Email address</TextStyle>
                            <Input
                                style={{fontSize:13, color:'white'}}
                                onChangeText={this.onFirstEmailChanged.bind(this)}
                                value={this.props.first_email}
                            />
                        </Item>
                        <Item style={{marginTop:40}}  stackedLabel>
                            <TextStyle>Re-enter email address </TextStyle>
                            <Input
                                 style={{ fontSize:13, color:'white'}}
                                onChangeText={this.onSecondEmailChanged.bind(this)}
                                value={this.props.second_email}
                            />
                        </Item>
                            {this.renderSubmitButton()}
                    </Form>

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

export default connect(mapStateToProps, {
    firstEmailChanged, secondEmailChanged, resetPassword
})(ForgotPasswordForm);
