import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Button, Text, Toast, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LoadingButton, CommonContainer, CommonField } from '../Common';

class AddContactForm extends Component {
    state = {
        phone_number: '',
        requesting: false
    }

    showToast = (text) => {
        Toast.show({
            text,
            position: 'bottom',
            buttonText: ''
        });
    }

    onPhoneNumberChange = (text) => {
        this.setState({
            phone_number: text
        });
    }

    requestContact = () => {
        if (!this.state.phone_number) {
            return this.showToast('Phone number cannot be empty');
        }

        this.setState({ requesting: true });

        axios.post('https://us-central1-reactnative-auth-66287.cloudfunctions.net/firestoreSendRequest', {
            userId: this.props.user.uid,
            phoneNumber: this.state.phone_number
        })
        .then(response => {
            Actions.pop();
            this.showToast('Request sent!');
        })
        .catch(error => {
            this.showToast('Error has occurred');
            this.setState({ requesting: false });
        });
    }

    render() {
        return (
            <CommonContainer paddedContent={true}>
                <Form>
                <CommonField
                        onChangeText={this.onPhoneNumberChange}
                        value={this.state.phone_number}
                        style={{marginTop:20}}
                        label={'Phone Number'}
                    />
                </Form>
                <LoadingButton
                    loading={this.state.requesting}
                    onPress={this.requestContact}
                    text="Send"
                />
            </CommonContainer>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;

    return { user };
};

export default connect(mapStateToProps, {})(AddContactForm);
